function evalRPN(tokens) {
  const stack = [];

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    if (token === '+' || token === '-' || token === '*' || token === '/') {
      const b = stack.pop();
      const a = stack.pop();
      let res = 0;

      if (token === '+') res = a + b;
      else if (token === '-') res = a - b;
      else if (token === '*') res = a * b;
      else if (token === '/') res = Math.trunc(a / b);

      note("Operator " + token + ": evaluate " + a + " " + token + " " + b + " = " + res);
      stack.push(res);
    } else {
      const num = Number(token);
      note("Operand: push " + num + " to stack");
      stack.push(num);
    }
  }

  const finalVal = stack.pop();
  note("Final evaluation result: " + finalVal);
  return finalVal;
}
