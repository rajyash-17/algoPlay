import { ProblemMeta, ProblemInput, RendererConfig } from '@/engine/types';

import { meta as twoSumMeta } from './two-sum/meta';
import { inputs as twoSumInputs } from './two-sum/inputs';
import { rendererConfig as twoSumRenderer } from './two-sum/renderer';

import { meta as twoSumIIMeta } from './two-sum-ii/meta';
import { inputs as twoSumIIInputs } from './two-sum-ii/inputs';
import { rendererConfig as twoSumIIRenderer } from './two-sum-ii/renderer';

import { meta as validPalindromeMeta } from './valid-palindrome/meta';
import { inputs as validPalindromeInputs } from './valid-palindrome/inputs';
import { rendererConfig as validPalindromeRenderer } from './valid-palindrome/renderer';

import { meta as stockMeta } from './best-time-to-buy-and-sell-stock/meta';
import { inputs as stockInputs } from './best-time-to-buy-and-sell-stock/inputs';
import { rendererConfig as stockRenderer } from './best-time-to-buy-and-sell-stock/renderer';

import { meta as searchInsertMeta } from './search-insert-position/meta';
import { inputs as searchInsertInputs } from './search-insert-position/inputs';
import { rendererConfig as searchInsertRenderer } from './search-insert-position/renderer';

import { meta as validParenthesesMeta } from './valid-parentheses/meta';
import { inputs as validParenthesesInputs } from './valid-parentheses/inputs';
import { rendererConfig as validParenthesesRenderer } from './valid-parentheses/renderer';

import { meta as simplifyPathMeta } from './simplify-path/meta';
import { inputs as simplifyPathInputs } from './simplify-path/inputs';
import { rendererConfig as simplifyPathRenderer } from './simplify-path/renderer';

import { meta as minStackMeta } from './min-stack/meta';
import { inputs as minStackInputs } from './min-stack/inputs';
import { rendererConfig as minStackRenderer } from './min-stack/renderer';

import { meta as evalRPNMeta } from './evaluate-reverse-polish-notation/meta';
import { inputs as evalRPNInputs } from './evaluate-reverse-polish-notation/inputs';
import { rendererConfig as evalRPNRenderer } from './evaluate-reverse-polish-notation/renderer';

import { meta as basicCalculatorMeta } from './basic-calculator/meta';
import { inputs as basicCalculatorInputs } from './basic-calculator/inputs';
import { rendererConfig as basicCalculatorRenderer } from './basic-calculator/renderer';

export interface ProblemDefinition {
  meta: ProblemMeta;
  solutionCode: string;
  inputs: ProblemInput[];
  rendererConfig: RendererConfig;
}

const twoSumCode = `function twoSum(nums, target) {
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    note("Checking if complement " + complement + " (" + target + " - " + nums[i] + ") is in map");

    if (map.has(complement)) {
      note("Found complement in map! Pair indices: [" + map.get(complement) + ", " + i + "]");
      return [map.get(complement), i];
    }

    map.set(nums[i], i);
  }

  return [];
}`;

const twoSumIICode = `function twoSumII(numbers, target) {
  let left = 0;
  let right = numbers.length - 1;

  while (left < right) {
    const sum = numbers[left] + numbers[right];
    note("Sum = numbers[" + left + "] + numbers[" + right + "] = " + sum + " (target = " + target + ")");

    if (sum === target) {
      note("Found target sum! 1-indexed positions: [" + (left + 1) + ", " + (right + 1) + "]");
      return [left + 1, right + 1];
    } else if (sum < target) {
      note(sum + " < " + target + ": moving left pointer right to increase sum");
      left++;
    } else {
      note(sum + " > " + target + ": moving right pointer left to decrease sum");
      right--;
    }
  }

  return [];
}`;

const validPalindromeCode = `function isPalindrome(s) {
  const clean = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  const chars = clean.split('');
  let left = 0;
  let right = chars.length - 1;

  while (left < right) {
    note("Comparing chars[" + left + "] ('" + chars[left] + "') and chars[" + right + "] ('" + chars[right] + "')");

    if (chars[left] !== chars[right]) {
      note("Mismatch found! '" + chars[left] + "' !== '" + chars[right] + "'. Not a palindrome.");
      return false;
    }

    left++;
    right--;
  }

  note("All characters match symmetrically. It is a valid palindrome!");
  return true;
}`;

const stockCode = `function maxProfit(prices) {
  let minPrice = prices[0];
  let maxProfitSoFar = 0;
  let buyDay = 0;

  for (let day = 1; day < prices.length; day++) {
    const currentPrice = prices[day];
    note("Day " + day + ": price is " + currentPrice + " (lowest buy price so far = " + minPrice + ")");

    if (currentPrice < minPrice) {
      minPrice = currentPrice;
      buyDay = day;
      note("New lower buy price found: " + minPrice + " at day " + day);
    } else {
      const profit = currentPrice - minPrice;
      if (profit > maxProfitSoFar) {
        maxProfitSoFar = profit;
        note("New maximum profit: " + maxProfitSoFar + " (buy on day " + buyDay + " -> sell on day " + day + ")");
      }
    }
  }

  note("Completed search. Best overall profit: " + maxProfitSoFar);
  return maxProfitSoFar;
}`;

const searchInsertCode = `function searchInsert(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    note("Examining middle index " + mid + " (value = " + nums[mid] + ") for target " + target);

    if (nums[mid] === target) {
      note("Target " + target + " found at index " + mid + "!");
      return mid;
    } else if (nums[mid] < target) {
      note(nums[mid] + " < " + target + ": searching right half (left = " + (mid + 1) + ")");
      left = mid + 1;
    } else {
      note(nums[mid] + " > " + target + ": searching left half (right = " + (mid - 1) + ")");
      right = mid - 1;
    }
  }

  note("Target not present. Proper insertion point is index " + left);
  return left;
}`;

const validParenthesesCode = `function isValid(s) {
  const stack = [];
  const pairs = { ')': '(', '}': '{', ']': '[' };

  for (let i = 0; i < s.length; i++) {
    const char = s[i];

    if (char === '(' || char === '{' || char === '[') {
      note("Opening bracket '" + char + "': push onto stack");
      stack.push(char);
    } else {
      note("Closing bracket '" + char + "': verify against stack top");
      if (stack.length === 0 || stack[stack.length - 1] !== pairs[char]) {
        note("Mismatch! Stack top does not match '" + char + "'");
        return false;
      }
      stack.pop();
    }
  }

  note("Scan complete. Stack is " + (stack.length === 0 ? "empty (valid)" : "not empty (invalid)"));
  return stack.length === 0;
}`;

const simplifyPathCode = `function simplifyPath(path) {
  const stack = [];
  const parts = path.split('/');

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];

    if (part === '' || part === '.') {
      continue;
    }

    if (part === '..') {
      if (stack.length > 0) {
        note("Encountered '..': popping '" + stack[stack.length - 1] + "' directory");
        stack.pop();
      }
    } else {
      note("Valid directory '" + part + "': push onto stack");
      stack.push(part);
    }
  }

  const canonical = '/' + stack.join('/');
  note("Built canonical path: " + canonical);
  return canonical;
}`;

const minStackCode = `function simulateMinStack(operations, values) {
  const stack = [];
  const minStack = [];
  const result = [];

  for (let i = 0; i < operations.length; i++) {
    const op = operations[i];
    const val = values[i];

    if (op === 'push') {
      const minVal = minStack.length === 0 ? val : Math.min(val, minStack[minStack.length - 1]);
      note("Push " + val + " (minimum so far: " + minVal + ")");
      stack.push(val);
      minStack.push(minVal);
      result.push(null);
    } else if (op === 'pop') {
      note("Pop value " + stack[stack.length - 1] + " from stack");
      stack.pop();
      minStack.pop();
      result.push(null);
    } else if (op === 'top') {
      const topVal = stack[stack.length - 1];
      note("Top element is " + topVal);
      result.push(topVal);
    } else if (op === 'getMin') {
      const minVal = minStack[minStack.length - 1];
      note("Retrieved current minimum: " + minVal);
      result.push(minVal);
    }
  }

  return result;
}`;

const evalRPNCode = `function evalRPN(tokens) {
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
}`;

const basicCalculatorCode = `function calculate(s) {
  const stack = [];
  let currentNumber = 0;
  let result = 0;
  let sign = 1;

  for (let i = 0; i < s.length; i++) {
    const char = s[i];

    if (char >= '0' && char <= '9') {
      currentNumber = currentNumber * 10 + Number(char);
    } else if (char === '+') {
      result += sign * currentNumber;
      currentNumber = 0;
      sign = 1;
    } else if (char === '-') {
      result += sign * currentNumber;
      currentNumber = 0;
      sign = -1;
    } else if (char === '(') {
      note("Opening '(': save running result " + result + " and sign " + sign + " to stack");
      stack.push(result);
      stack.push(sign);
      result = 0;
      sign = 1;
    } else if (char === ')') {
      result += sign * currentNumber;
      currentNumber = 0;
      const prevSign = stack.pop();
      const prevResult = stack.pop();
      result = prevResult + prevSign * result;
      note("Closing ')': resolve sub-expression to " + result);
    }
  }

  result += sign * currentNumber;
  note("Calculation complete. Final value: " + result);
  return result;
}`;

export const PROBLEMS: ProblemDefinition[] = [
  // Array Category
  {
    meta: twoSumMeta,
    solutionCode: twoSumCode,
    inputs: twoSumInputs,
    rendererConfig: twoSumRenderer,
  },
  {
    meta: twoSumIIMeta,
    solutionCode: twoSumIICode,
    inputs: twoSumIIInputs,
    rendererConfig: twoSumIIRenderer,
  },
  {
    meta: validPalindromeMeta,
    solutionCode: validPalindromeCode,
    inputs: validPalindromeInputs,
    rendererConfig: validPalindromeRenderer,
  },
  {
    meta: stockMeta,
    solutionCode: stockCode,
    inputs: stockInputs,
    rendererConfig: stockRenderer,
  },
  {
    meta: searchInsertMeta,
    solutionCode: searchInsertCode,
    inputs: searchInsertInputs,
    rendererConfig: searchInsertRenderer,
  },

  // Stack Category (Batch 1)
  {
    meta: validParenthesesMeta,
    solutionCode: validParenthesesCode,
    inputs: validParenthesesInputs,
    rendererConfig: validParenthesesRenderer,
  },
  {
    meta: simplifyPathMeta,
    solutionCode: simplifyPathCode,
    inputs: simplifyPathInputs,
    rendererConfig: simplifyPathRenderer,
  },
  {
    meta: minStackMeta,
    solutionCode: minStackCode,
    inputs: minStackInputs,
    rendererConfig: minStackRenderer,
  },
  {
    meta: evalRPNMeta,
    solutionCode: evalRPNCode,
    inputs: evalRPNInputs,
    rendererConfig: evalRPNRenderer,
  },
  {
    meta: basicCalculatorMeta,
    solutionCode: basicCalculatorCode,
    inputs: basicCalculatorInputs,
    rendererConfig: basicCalculatorRenderer,
  },
];

export function getAllProblems(): ProblemDefinition[] {
  return PROBLEMS;
}

export function getProblemBySlug(slug: string): ProblemDefinition | undefined {
  return PROBLEMS.find((p) => p.meta.slug === slug);
}
