import * as parser from '@babel/parser';
import _traverse from '@babel/traverse';
import _generator from '@babel/generator';
import * as t from '@babel/types';

// Handle Babel ESM / CJS interop
const traverse = (typeof _traverse === 'function' ? _traverse : (_traverse as { default: typeof _traverse }).default) as typeof _traverse;
const generate = (typeof _generator === 'function' ? _generator : (_generator as { default: typeof _generator }).default) as typeof _generator;

interface InjectedNode {
  _injected?: boolean;
}

export interface InstrumentOptions {
  wrapParams?: boolean;
}

/**
 * Instruments JavaScript code with AlgoPlay tracer hooks:
 * - Injects `__line(line)` before every executable statement
 * - Injects `__assign(name, value)` after variable declarations, assignments, and updates
 * - Wraps array literals and function parameters with `__wrapArray(arr, name)`
 * - Preserves line numbers and semantics
 */
export function instrumentCode(sourceCode: string, options: InstrumentOptions = { wrapParams: true }): string {
  const ast = parser.parse(sourceCode, {
    sourceType: 'module',
    plugins: [],
  });

  // Pass 1: Ensure all control statements (if, for, while, do-while) have BlockStatement bodies
  traverse(ast, {
    IfStatement(path) {
      if (!t.isBlockStatement(path.node.consequent)) {
        path.node.consequent = t.blockStatement([path.node.consequent]);
      }
      if (path.node.alternate && !t.isBlockStatement(path.node.alternate) && !t.isIfStatement(path.node.alternate)) {
        path.node.alternate = t.blockStatement([path.node.alternate]);
      }
    },
    ForStatement(path) {
      if (!t.isBlockStatement(path.node.body)) {
        path.node.body = t.blockStatement([path.node.body]);
      }
    },
    ForInStatement(path) {
      if (!t.isBlockStatement(path.node.body)) {
        path.node.body = t.blockStatement([path.node.body]);
      }
    },
    ForOfStatement(path) {
      if (!t.isBlockStatement(path.node.body)) {
        path.node.body = t.blockStatement([path.node.body]);
      }
    },
    WhileStatement(path) {
      if (!t.isBlockStatement(path.node.body)) {
        path.node.body = t.blockStatement([path.node.body]);
      }
    },
    DoWhileStatement(path) {
      if (!t.isBlockStatement(path.node.body)) {
        path.node.body = t.blockStatement([path.node.body]);
      }
    },
  });

  // Pass 2: Wrap function parameters at entry and wrap ArrayExpressions
  traverse(ast, {
    Function(path) {
      if (!options.wrapParams) return;
      if ((path.node as unknown as InjectedNode)._injected) return;
      (path.node as unknown as InjectedNode)._injected = true;

      if (!t.isBlockStatement(path.node.body)) {
        // Arrow function with concise body: () => expr -> () => { return expr; }
        const returnStmt = t.returnStatement(path.node.body as t.Expression);
        path.node.body = t.blockStatement([returnStmt]);
      }

      const blockBody = path.node.body as t.BlockStatement;
      const paramWrappingStmts: t.Statement[] = [];

      // Extract function name
      let funcName = 'fn';
      if ('id' in path.node && path.node.id && t.isIdentifier(path.node.id)) {
        funcName = path.node.id.name;
      } else if (path.parent && t.isVariableDeclarator(path.parent) && t.isIdentifier(path.parent.id)) {
        funcName = path.parent.id.name;
      }

      const paramProps: t.ObjectProperty[] = [];

      for (const param of path.node.params) {
        if (t.isIdentifier(param)) {
          const paramName = param.name;
          paramProps.push(t.objectProperty(t.identifier(paramName), t.identifier(paramName)));

          // param = __wrapArray(param, 'param');
          const wrapCall = t.expressionStatement(
            t.assignmentExpression(
              '=',
              t.identifier(paramName),
              t.callExpression(t.identifier('__wrapArray'), [
                t.identifier(paramName),
                t.stringLiteral(paramName),
              ])
            )
          );
          (wrapCall as unknown as InjectedNode)._injected = true;
          paramWrappingStmts.push(wrapCall);

          // Track parameter initial value in currentVars
          const assignCall = t.expressionStatement(
            t.callExpression(t.identifier('__assign'), [
              t.stringLiteral(paramName),
              t.identifier(paramName),
            ])
          );
          (assignCall as unknown as InjectedNode)._injected = true;
          paramWrappingStmts.push(assignCall);
        }
      }

      const enterCall = t.expressionStatement(
        t.callExpression(t.identifier('__enter'), [
          t.stringLiteral(funcName),
          t.objectExpression(paramProps),
        ])
      );
      (enterCall as unknown as InjectedNode)._injected = true;

      const exitCall = t.expressionStatement(
        t.callExpression(t.identifier('__exit'), [t.stringLiteral(funcName)])
      );
      (exitCall as unknown as InjectedNode)._injected = true;

      const tryFinally = t.tryStatement(
        t.blockStatement([...blockBody.body]),
        null,
        t.blockStatement([exitCall])
      );
      (tryFinally as unknown as InjectedNode)._injected = true;

      blockBody.body = [enterCall, ...paramWrappingStmts, tryFinally];
    },
    ArrayExpression(path) {
      const parent = path.parent;
      // Do not wrap if already wrapped or argument to __wrapArray
      if (
        t.isCallExpression(parent) &&
        t.isIdentifier(parent.callee) &&
        parent.callee.name === '__wrapArray'
      ) {
        return;
      }
      if ((path.node as unknown as InjectedNode)._injected) {
        return;
      }

      // Determine friendly variable name if array literal is being assigned: const arr = [1, 2]
      let varName = 'array';
      if (t.isVariableDeclarator(parent) && t.isIdentifier(parent.id)) {
        varName = parent.id.name;
      } else if (t.isAssignmentExpression(parent) && t.isIdentifier(parent.left)) {
        varName = parent.left.name;
      }

      const wrapped = t.callExpression(t.identifier('__wrapArray'), [
        path.node,
        t.stringLiteral(varName),
      ]);
      (wrapped as unknown as InjectedNode)._injected = true;
      path.replaceWith(wrapped);
      path.skip();
    },
    // Track update expressions: i++ or ++i
    UpdateExpression(path) {
      if ((path.node as unknown as InjectedNode)._injected) return;
      if (t.isIdentifier(path.node.argument)) {
        const idName = path.node.argument.name;
        // Transform `i++` -> `(i++, __assign("i", i), i)`
        // Or for sequence: (path.node, __assign(idName, id), id)
        const assignCall = t.callExpression(t.identifier('__assign'), [
          t.stringLiteral(idName),
          t.identifier(idName),
        ]);
        (assignCall as unknown as InjectedNode)._injected = true;

        const seq = t.sequenceExpression([path.node, assignCall]);
        (seq as unknown as InjectedNode)._injected = true;
        path.replaceWith(seq);
        path.skip();
      }
    },
    // Track direct assignments: a = b
    AssignmentExpression(path) {
      if ((path.node as unknown as InjectedNode)._injected) return;
      if (t.isIdentifier(path.node.left)) {
        const idName = path.node.left.name;
        // Don't intercept internal parameter wrapping: id = __wrapArray(...)
        if (
          t.isCallExpression(path.node.right) &&
          t.isIdentifier(path.node.right.callee) &&
          path.node.right.callee.name === '__wrapArray'
        ) {
          return;
        }

        const assignCall = t.callExpression(t.identifier('__assign'), [
          t.stringLiteral(idName),
          t.identifier(idName),
        ]);
        (assignCall as unknown as InjectedNode)._injected = true;

        const seq = t.sequenceExpression([path.node, assignCall]);
        (seq as unknown as InjectedNode)._injected = true;
        path.replaceWith(seq);
        path.skip();
      }
    },
  });

  // Pass 3: Inject __line(n) and __assign for VariableDeclarations in statement lists
  traverse(ast, {
    BlockStatement(path) {
      const newBody: t.Statement[] = [];

      for (const stmt of path.node.body) {
        if ((stmt as unknown as InjectedNode)._injected) {
          newBody.push(stmt);
          continue;
        }

        const line = stmt.loc ? stmt.loc.start.line : 1;
        const lineCall = t.expressionStatement(
          t.callExpression(t.identifier('__line'), [t.numericLiteral(line)])
        );
        (lineCall as unknown as InjectedNode)._injected = true;
        newBody.push(lineCall);
        newBody.push(stmt);

        // If it's a VariableDeclaration, also inject __assign(id, id) for each declarator
        if (t.isVariableDeclaration(stmt)) {
          for (const decl of stmt.declarations) {
            if (t.isIdentifier(decl.id)) {
              const varName = decl.id.name;
              const assignCall = t.expressionStatement(
                t.callExpression(t.identifier('__assign'), [
                  t.stringLiteral(varName),
                  t.identifier(varName),
                ])
              );
              (assignCall as unknown as InjectedNode)._injected = true;
              newBody.push(assignCall);
            }
          }
        }
      }

      path.node.body = newBody;
    },
    Program(path) {
      const newBody: t.Statement[] = [];

      for (const stmt of path.node.body) {
        if ((stmt as unknown as InjectedNode)._injected) {
          newBody.push(stmt);
          continue;
        }

        // Don't inject line hook before top-level function declarations
        if (t.isFunctionDeclaration(stmt)) {
          newBody.push(stmt);
          continue;
        }

        const line = stmt.loc ? stmt.loc.start.line : 1;
        const lineCall = t.expressionStatement(
          t.callExpression(t.identifier('__line'), [t.numericLiteral(line)])
        );
        (lineCall as unknown as InjectedNode)._injected = true;
        newBody.push(lineCall);
        newBody.push(stmt);

        if (t.isVariableDeclaration(stmt)) {
          for (const decl of stmt.declarations) {
            if (t.isIdentifier(decl.id)) {
              const varName = decl.id.name;
              const assignCall = t.expressionStatement(
                t.callExpression(t.identifier('__assign'), [
                  t.stringLiteral(varName),
                  t.identifier(varName),
                ])
              );
              (assignCall as unknown as InjectedNode)._injected = true;
              newBody.push(assignCall);
            }
          }
        }
      }

      path.node.body = newBody;
    },
  });

  const output = generate(ast, { retainLines: false });
  return output.code;
}
