import { ProblemMeta, ProblemInput, RendererConfig } from '@/engine/types';

// Array Category
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

// Stack Category (Batch 1)
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

// Linked List Category (Batch 2)
import { meta as llCycleMeta } from './linked-list-cycle/meta';
import { inputs as llCycleInputs } from './linked-list-cycle/inputs';
import { rendererConfig as llCycleRenderer } from './linked-list-cycle/renderer';

import { meta as addTwoNumbersMeta } from './add-two-numbers/meta';
import { inputs as addTwoNumbersInputs } from './add-two-numbers/inputs';
import { rendererConfig as addTwoNumbersRenderer } from './add-two-numbers/renderer';

import { meta as mergeTwoListsMeta } from './merge-two-sorted-lists/meta';
import { inputs as mergeTwoListsInputs } from './merge-two-sorted-lists/inputs';
import { rendererConfig as mergeTwoListsRenderer } from './merge-two-sorted-lists/renderer';

import { meta as copyRandomListMeta } from './copy-list-with-random-pointer/meta';
import { inputs as copyRandomListInputs } from './copy-list-with-random-pointer/inputs';
import { rendererConfig as copyRandomListRenderer } from './copy-list-with-random-pointer/renderer';

import { meta as reverseBetweenMeta } from './reverse-linked-list-ii/meta';
import { inputs as reverseBetweenInputs } from './reverse-linked-list-ii/inputs';
import { rendererConfig as reverseBetweenRenderer } from './reverse-linked-list-ii/renderer';

import { meta as reverseKGroupMeta } from './reverse-nodes-in-k-group/meta';
import { inputs as reverseKGroupInputs } from './reverse-nodes-in-k-group/inputs';
import { rendererConfig as reverseKGroupRenderer } from './reverse-nodes-in-k-group/renderer';

import { meta as removeNthMeta } from './remove-nth-node-from-end-of-list/meta';
import { inputs as removeNthInputs } from './remove-nth-node-from-end-of-list/inputs';
import { rendererConfig as removeNthRenderer } from './remove-nth-node-from-end-of-list/renderer';

import { meta as deleteDuplicatesMeta } from './remove-duplicates-from-sorted-list-ii/meta';
import { inputs as deleteDuplicatesInputs } from './remove-duplicates-from-sorted-list-ii/inputs';
import { rendererConfig as deleteDuplicatesRenderer } from './remove-duplicates-from-sorted-list-ii/renderer';

import { meta as rotateListMeta } from './rotate-list/meta';
import { inputs as rotateListInputs } from './rotate-list/inputs';
import { rendererConfig as rotateListRenderer } from './rotate-list/renderer';

import { meta as partitionListMeta } from './partition-list/meta';
import { inputs as partitionListInputs } from './partition-list/inputs';
import { rendererConfig as partitionListRenderer } from './partition-list/renderer';

import { meta as lruCacheMeta } from './lru-cache/meta';
import { inputs as lruCacheInputs } from './lru-cache/inputs';
import { rendererConfig as lruCacheRenderer } from './lru-cache/renderer';

// Binary Tree General & Traversal (Batch 3)
import { meta as maxDepthMeta } from './maximum-depth-of-binary-tree/meta';
import { inputs as maxDepthInputs } from './maximum-depth-of-binary-tree/inputs';
import { rendererConfig as maxDepthRenderer } from './maximum-depth-of-binary-tree/renderer';

import { meta as sameTreeMeta } from './same-tree/meta';
import { inputs as sameTreeInputs } from './same-tree/inputs';
import { rendererConfig as sameTreeRenderer } from './same-tree/renderer';

import { meta as invertTreeMeta } from './invert-binary-tree/meta';
import { inputs as invertTreeInputs } from './invert-binary-tree/inputs';
import { rendererConfig as invertTreeRenderer } from './invert-binary-tree/renderer';

import { meta as symmetricTreeMeta } from './symmetric-tree/meta';
import { inputs as symmetricTreeInputs } from './symmetric-tree/inputs';
import { rendererConfig as symmetricTreeRenderer } from './symmetric-tree/renderer';

import { meta as buildTreePreInMeta } from './construct-binary-tree-from-preorder-and-inorder-traversal/meta';
import { inputs as buildTreePreInInputs } from './construct-binary-tree-from-preorder-and-inorder-traversal/inputs';
import { rendererConfig as buildTreePreInRenderer } from './construct-binary-tree-from-preorder-and-inorder-traversal/renderer';

import { meta as buildTreeInPostMeta } from './construct-binary-tree-from-inorder-and-postorder-traversal/meta';
import { inputs as buildTreeInPostInputs } from './construct-binary-tree-from-inorder-and-postorder-traversal/inputs';
import { rendererConfig as buildTreeInPostRenderer } from './construct-binary-tree-from-inorder-and-postorder-traversal/renderer';

import { meta as connectNextMeta } from './populating-next-right-pointers-in-each-node-ii/meta';
import { inputs as connectNextInputs } from './populating-next-right-pointers-in-each-node-ii/inputs';
import { rendererConfig as connectNextRenderer } from './populating-next-right-pointers-in-each-node-ii/renderer';

import { meta as flattenTreeMeta } from './flatten-binary-tree-to-linked-list/meta';
import { inputs as flattenTreeInputs } from './flatten-binary-tree-to-linked-list/inputs';
import { rendererConfig as flattenTreeRenderer } from './flatten-binary-tree-to-linked-list/renderer';

import { meta as hasPathSumMeta } from './path-sum/meta';
import { inputs as hasPathSumInputs } from './path-sum/inputs';
import { rendererConfig as hasPathSumRenderer } from './path-sum/renderer';

import { meta as sumNumbersMeta } from './sum-root-to-leaf-numbers/meta';
import { inputs as sumNumbersInputs } from './sum-root-to-leaf-numbers/inputs';
import { rendererConfig as sumNumbersRenderer } from './sum-root-to-leaf-numbers/renderer';

import { meta as maxPathSumMeta } from './binary-tree-maximum-path-sum/meta';
import { inputs as maxPathSumInputs } from './binary-tree-maximum-path-sum/inputs';
import { rendererConfig as maxPathSumRenderer } from './binary-tree-maximum-path-sum/renderer';

import { meta as bstIteratorMeta } from './binary-search-tree-iterator/meta';
import { inputs as bstIteratorInputs } from './binary-search-tree-iterator/inputs';
import { rendererConfig as bstIteratorRenderer } from './binary-search-tree-iterator/renderer';

import { meta as countNodesMeta } from './count-complete-tree-nodes/meta';
import { inputs as countNodesInputs } from './count-complete-tree-nodes/inputs';
import { rendererConfig as countNodesRenderer } from './count-complete-tree-nodes/renderer';

import { meta as lowestCommonAncestorMeta } from './lowest-common-ancestor-of-a-binary-tree/meta';
import { inputs as lowestCommonAncestorInputs } from './lowest-common-ancestor-of-a-binary-tree/inputs';
import { rendererConfig as lowestCommonAncestorRenderer } from './lowest-common-ancestor-of-a-binary-tree/renderer';

// Binary Tree BFS
import { meta as rightSideViewMeta } from './binary-tree-right-side-view/meta';
import { inputs as rightSideViewInputs } from './binary-tree-right-side-view/inputs';
import { rendererConfig as rightSideViewRenderer } from './binary-tree-right-side-view/renderer';

import { meta as averageOfLevelsMeta } from './average-of-levels-in-binary-tree/meta';
import { inputs as averageOfLevelsInputs } from './average-of-levels-in-binary-tree/inputs';
import { rendererConfig as averageOfLevelsRenderer } from './average-of-levels-in-binary-tree/renderer';

import { meta as levelOrderMeta } from './binary-tree-level-order-traversal/meta';
import { inputs as levelOrderInputs } from './binary-tree-level-order-traversal/inputs';
import { rendererConfig as levelOrderRenderer } from './binary-tree-level-order-traversal/renderer';

import { meta as zigzagLevelOrderMeta } from './binary-tree-zigzag-level-order-traversal/meta';
import { inputs as zigzagLevelOrderInputs } from './binary-tree-zigzag-level-order-traversal/inputs';
import { rendererConfig as zigzagLevelOrderRenderer } from './binary-tree-zigzag-level-order-traversal/renderer';

// Binary Search Tree
import { meta as minDiffBstMeta } from './minimum-absolute-difference-in-bst/meta';
import { inputs as minDiffBstInputs } from './minimum-absolute-difference-in-bst/inputs';
import { rendererConfig as minDiffBstRenderer } from './minimum-absolute-difference-in-bst/renderer';

import { meta as kthSmallestBstMeta } from './kth-smallest-element-in-a-bst/meta';
import { inputs as kthSmallestBstInputs } from './kth-smallest-element-in-a-bst/inputs';
import { rendererConfig as kthSmallestBstRenderer } from './kth-smallest-element-in-a-bst/renderer';

import { meta as isValidBstMeta } from './validate-binary-search-tree/meta';
import { inputs as isValidBstInputs } from './validate-binary-search-tree/inputs';
import { rendererConfig as isValidBstRenderer } from './validate-binary-search-tree/renderer';

// Backtracking Category (Assignment Focus)
import { meta as nQueensMeta } from './n-queens/meta';
import { inputs as nQueensInputs } from './n-queens/inputs';
import { rendererConfig as nQueensRenderer } from './n-queens/renderer';

import { meta as nQueensIIMeta } from './n-queens-ii/meta';
import { inputs as nQueensIIInputs } from './n-queens-ii/inputs';
import { rendererConfig as nQueensIIRenderer } from './n-queens-ii/renderer';

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

const llCycleCode = `function hasCycle(head) {
  let slow = head;
  let fast = head;

  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
    note("Advance: slow moves 1 step, fast moves 2 steps");

    if (slow === fast) {
      note("Pointers met! Cycle confirmed in linked list.");
      return true;
    }
  }

  note("Fast pointer reached NULL. No cycle exists.");
  return false;
}`;

const addTwoNumbersCode = `function addTwoNumbers(l1, l2) {
  const dummyHead = { val: 0, next: null };
  let curr = dummyHead;
  let p = l1;
  let q = l2;
  let carry = 0;

  while (p !== null || q !== null || carry !== 0) {
    const x = p !== null ? p.val : 0;
    const y = q !== null ? q.val : 0;
    const sum = carry + x + y;
    carry = Math.floor(sum / 10);
    const digit = sum % 10;

    note("Add " + x + " + " + y + " + carry " + (sum - x - y) + " = " + sum + "; append digit " + digit);
    curr.next = { val: digit, next: null };
    curr = curr.next;

    if (p !== null) p = p.next;
    if (q !== null) q = q.next;
  }

  note("Addition complete. Result head is dummyHead.next");
  return dummyHead.next;
}`;

const mergeTwoListsCode = `function mergeTwoLists(list1, list2) {
  const dummyHead = { val: -1, next: null };
  let curr = dummyHead;

  while (list1 !== null && list2 !== null) {
    if (list1.val <= list2.val) {
      note("Compare: " + list1.val + " <= " + list2.val + "; link list1 node (" + list1.val + ")");
      curr.next = list1;
      list1 = list1.next;
    } else {
      note("Compare: " + list2.val + " < " + list1.val + "; link list2 node (" + list2.val + ")");
      curr.next = list2;
      list2 = list2.next;
    }
    curr = curr.next;
  }

  if (list1 !== null) {
    note("Append remaining nodes from list1");
    curr.next = list1;
  } else if (list2 !== null) {
    note("Append remaining nodes from list2");
    curr.next = list2;
  }

  note("Merge complete. Returning merged head");
  return dummyHead.next;
}`;

const copyRandomListCode = `function copyRandomList(head) {
  if (head === null) return null;

  const map = new Map();

  let curr = head;
  while (curr !== null) {
    note("Pass 1: clone node with val " + curr.val);
    map.set(curr, { val: curr.val, next: null, random: null });
    curr = curr.next;
  }

  curr = head;
  while (curr !== null) {
    const copyNode = map.get(curr);
    copyNode.next = curr.next !== null ? map.get(curr.next) : null;
    copyNode.random = curr.random !== null ? map.get(curr.random) : null;
    note("Pass 2: link copy node (" + curr.val + ") next and random pointers");
    curr = curr.next;
  }

  note("Cloning complete. Returning head of deep copy");
  return map.get(head);
}`;

const reverseBetweenCode = `function reverseBetween(head, left, right) {
  if (head === null || left === right) return head;

  const dummyHead = { val: 0, next: head };
  let prev = dummyHead;

  for (let i = 1; i < left; i++) {
    prev = prev.next;
  }

  let curr = prev.next;
  note("Positioned prev at index " + (left - 1) + "; beginning sublist reversal");

  for (let i = 0; i < right - left; i++) {
    const temp = curr.next;
    curr.next = temp.next;
    temp.next = prev.next;
    prev.next = temp;
    note("Move node with val " + temp.val + " to front of reversed sublist");
  }

  note("Sublist reversal finished. Returning dummyHead.next");
  return dummyHead.next;
}`;

const reverseKGroupCode = `function reverseKGroup(head, k) {
  if (head === null || k === 1) return head;

  const dummyHead = { val: 0, next: head };
  let groupPrev = dummyHead;

  while (true) {
    let kth = groupPrev;
    for (let i = 0; i < k && kth !== null; i++) {
      kth = kth.next;
    }
    if (kth === null) break;

    const groupNext = kth.next;
    let prev = groupNext;
    let curr = groupPrev.next;

    note("Reversing k = " + k + " nodes starting from val " + curr.val);
    while (curr !== groupNext) {
      const temp = curr.next;
      curr.next = prev;
      prev = curr;
      curr = temp;
    }

    const tempTail = groupPrev.next;
    groupPrev.next = kth;
    groupPrev = tempTail;
  }

  note("Completed k-group reversals. Returning dummyHead.next");
  return dummyHead.next;
}`;

const removeNthFromEndCode = `function removeNthFromEnd(head, n) {
  const dummyHead = { val: 0, next: head };
  let fast = dummyHead;
  let slow = dummyHead;

  for (let i = 0; i <= n; i++) {
    fast = fast.next;
  }
  note("Advanced fast pointer by " + (n + 1) + " steps to create the n-gap");

  while (fast !== null) {
    slow = slow.next;
    fast = fast.next;
  }

  note("Fast reached end; slow is at node prior to removal (node " + slow.val + ")");
  slow.next = slow.next.next;

  note("Bypassed nth node. Returning dummyHead.next");
  return dummyHead.next;
}`;

const deleteDuplicatesCode = `function deleteDuplicates(head) {
  const sentinel = { val: 0, next: head };
  let pred = sentinel;

  while (head !== null) {
    if (head.next !== null && head.val === head.next.val) {
      note("Detected duplicate sequence with val " + head.val);
      while (head.next !== null && head.val === head.next.val) {
        head = head.next;
      }
      pred.next = head.next;
    } else {
      pred = pred.next;
    }
    head = head.next;
  }

  note("Duplicate removal complete. Returning sentinel.next");
  return sentinel.next;
}`;

const rotateListCode = `function rotateRight(head, k) {
  if (head === null || head.next === null || k === 0) return head;

  let length = 1;
  let oldTail = head;
  while (oldTail.next !== null) {
    oldTail = oldTail.next;
    length++;
  }

  const effectiveK = k % length;
  note("Calculated length = " + length + ", effective rotation k = " + effectiveK);
  if (effectiveK === 0) return head;

  oldTail.next = head;

  let newTail = head;
  for (let i = 0; i < length - effectiveK - 1; i++) {
    newTail = newTail.next;
  }

  const newHead = newTail.next;
  newTail.next = null;

  note("Broke circle at new tail (val " + newTail.val + "); new head is val " + newHead.val);
  return newHead;
}`;

const partitionCode = `function partition(head, x) {
  const beforeHead = { val: 0, next: null };
  const afterHead = { val: 0, next: null };
  let before = beforeHead;
  let after = afterHead;

  let curr = head;
  while (curr !== null) {
    if (curr.val < x) {
      note("Node " + curr.val + " < " + x + ": append to 'before' partition");
      before.next = curr;
      before = before.next;
    } else {
      note("Node " + curr.val + " >= " + x + ": append to 'after' partition");
      after.next = curr;
      after = after.next;
    }
    curr = curr.next;
  }

  after.next = null;
  before.next = afterHead.next;
  note("Linked before partition to after partition. Returning beforeHead.next");

  return beforeHead.next;
}`;

const lruCacheCode = `function simulateLRUCache(capacity, operations, argsList) {
  const head = { val: 'HEAD', next: null };
  const tail = { val: 'TAIL', next: null };
  head.next = tail;

  const map = new Map();
  const result = [];

  function removeNode(node) {
    let prevNode = head;
    while (prevNode.next !== null && prevNode.next !== node) {
      prevNode = prevNode.next;
    }
    if (prevNode.next === node) {
      prevNode.next = node.next;
    }
  }

  function addToFront(node) {
    node.next = head.next;
    head.next = node;
  }

  for (let i = 0; i < operations.length; i++) {
    const op = operations[i];
    const args = argsList[i];

    if (op === 'put') {
      const key = args[0];
      const val = args[1];

      if (map.has(key)) {
        const existingNode = map.get(key);
        existingNode.val = key + ':' + val;
        removeNode(existingNode);
        addToFront(existingNode);
        note("Update key " + key + " to " + val + " and move to MRU (front)");
      } else {
        if (map.size >= capacity) {
          let prevNode = head;
          while (prevNode.next !== null && prevNode.next.next !== null) {
            prevNode = prevNode.next;
          }
          const lruNode = prevNode;
          note("Evict LRU node: " + lruNode.val);
          removeNode(lruNode);
          for (const [k, v] of map.entries()) {
            if (v === lruNode) {
              map.delete(k);
              break;
            }
          }
        }

        const newNode = { val: key + ':' + val, next: null };
        addToFront(newNode);
        map.set(key, newNode);
        note("Inserted key " + key + " with val " + val + " at MRU (front)");
      }
      result.push(null);
    } else if (op === 'get') {
      const key = args[0];
      if (map.has(key)) {
        const node = map.get(key);
        removeNode(node);
        addToFront(node);
        const parts = String(node.val).split(':');
        const numVal = Number(parts[1]);
        note("Cache hit for key " + key + ": returned " + numVal + "; moved to MRU");
        result.push(numVal);
      } else {
        note("Cache miss for key " + key + ": returned -1");
        result.push(-1);
      }
    }
  }

  return result;
}`;

// Binary Tree General & Traversal Solutions (Batch 3)
const maxDepthCode = `function maxDepth(root) {
  if (root === null) return 0;

  const leftDepth = maxDepth(root.left);
  const rightDepth = maxDepth(root.right);
  const depth = 1 + Math.max(leftDepth, rightDepth);

  note("At node " + root.val + ": left depth = " + leftDepth + ", right depth = " + rightDepth + ", max depth = " + depth);
  return depth;
}`;

const sameTreeCode = `function isSameTree(p, q) {
  if (p === null && q === null) return true;
  if (p === null || q === null) {
    note("Structure mismatch: one node is null and the other is not");
    return false;
  }

  if (p.val !== q.val) {
    note("Value mismatch: p.val (" + p.val + ") !== q.val (" + q.val + ")");
    return false;
  }

  note("Values match at (" + p.val + "); checking subtrees");
  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}`;

const invertTreeCode = `function invertTree(root) {
  if (root === null) return null;

  note("At node " + root.val + ": swapping left and right subtrees");
  const temp = root.left;
  root.left = root.right;
  root.right = temp;

  invertTree(root.left);
  invertTree(root.right);

  return root;
}`;

const symmetricTreeCode = `function isSymmetric(root) {
  if (root === null) return true;

  function isMirror(t1, t2) {
    if (t1 === null && t2 === null) return true;
    if (t1 === null || t2 === null) {
      note("One subtree is null while other is not; not symmetric");
      return false;
    }
    if (t1.val !== t2.val) {
      note("Value mismatch: t1.val (" + t1.val + ") !== t2.val (" + t2.val + ")");
      return false;
    }

    note("Values match (" + t1.val + "); checking outer pair and inner pair");
    return isMirror(t1.left, t2.right) && isMirror(t1.right, t2.left);
  }

  note("Checking if left and right subtrees of root are mirrors");
  return isMirror(root.left, root.right);
}`;

const buildTreePreInCode = `function buildTree(preorder, inorder) {
  const inorderIndexMap = new Map();
  for (let i = 0; i < inorder.length; i++) {
    inorderIndexMap.set(inorder[i], i);
  }

  let preIdx = 0;

  function helper(left, right) {
    if (left > right) return null;

    const rootVal = preorder[preIdx];
    preIdx++;
    const root = { val: rootVal, left: null, right: null };
    const mid = inorderIndexMap.get(rootVal);

    note("Creating node " + rootVal + " with inorder range [" + left + ", " + right + "]");
    root.left = helper(left, mid - 1);
    root.right = helper(mid + 1, right);

    return root;
  }

  return helper(0, inorder.length - 1);
}`;

const buildTreeInPostCode = `function buildTree(inorder, postorder) {
  const inorderIndexMap = new Map();
  for (let i = 0; i < inorder.length; i++) {
    inorderIndexMap.set(inorder[i], i);
  }

  let postIdx = postorder.length - 1;

  function helper(left, right) {
    if (left > right) return null;

    const rootVal = postorder[postIdx];
    postIdx--;
    const root = { val: rootVal, left: null, right: null };
    const mid = inorderIndexMap.get(rootVal);

    note("Creating node " + rootVal + " from postorder; right subtree recurses first");
    root.right = helper(mid + 1, right);
    root.left = helper(left, mid - 1);

    return root;
  }

  return helper(0, inorder.length - 1);
}`;

const connectNextCode = `function connect(root) {
  if (root === null) return null;

  let head = root;

  while (head !== null) {
    const dummyHead = { val: 0, next: null };
    let tail = dummyHead;
    let curr = head;

    while (curr !== null) {
      if (curr.left !== null) {
        tail.next = curr.left;
        tail = tail.next;
        note("Connect next right pointer to left child " + curr.left.val);
      }
      if (curr.right !== null) {
        tail.next = curr.right;
        tail = tail.next;
        note("Connect next right pointer to right child " + curr.right.val);
      }
      curr = curr.next || null;
    }

    head = dummyHead.next;
  }

  return root;
}`;

const flattenTreeCode = `function flatten(root) {
  let curr = root;

  while (curr !== null) {
    if (curr.left !== null) {
      let runner = curr.left;
      while (runner.right !== null) {
        runner = runner.right;
      }

      note("Connect right subtree of " + curr.val + " to rightmost node " + runner.val + " of left subtree");
      runner.right = curr.right;
      curr.right = curr.left;
      curr.left = null;
    }

    curr = curr.right;
  }

  return root;
}`;

const hasPathSumCode = `function hasPathSum(root, targetSum) {
  if (root === null) return false;

  const remaining = targetSum - root.val;
  note("At node " + root.val + ": remaining sum needed = " + remaining);

  if (root.left === null && root.right === null) {
    const isMatch = remaining === 0;
    note("Leaf reached. Sum matches: " + isMatch);
    return isMatch;
  }

  return hasPathSum(root.left, remaining) || hasPathSum(root.right, remaining);
}`;

const sumNumbersCode = `function sumNumbers(root) {
  function dfs(node, currentSum) {
    if (node === null) return 0;

    currentSum = currentSum * 10 + node.val;
    note("At node " + node.val + ": accumulated path number = " + currentSum);

    if (node.left === null && node.right === null) {
      note("Reached leaf node " + node.val + ", contributing " + currentSum + " to total sum");
      return currentSum;
    }

    return dfs(node.left, currentSum) + dfs(node.right, currentSum);
  }

  return dfs(root, 0);
}`;

const maxPathSumCode = `function maxPathSum(root) {
  let maxSum = -Infinity;

  function maxGain(node) {
    if (node === null) return 0;

    const leftGain = Math.max(maxGain(node.left), 0);
    const rightGain = Math.max(maxGain(node.right), 0);
    const currentPrice = node.val + leftGain + rightGain;

    if (currentPrice > maxSum) {
      maxSum = currentPrice;
      note("New maximum path sum found: " + maxSum + " through node " + node.val);
    } else {
      note("At node " + node.val + ": local path sum = " + currentPrice + ", best overall = " + maxSum);
    }

    return node.val + Math.max(leftGain, rightGain);
  }

  maxGain(root);
  return maxSum;
}`;

const bstIteratorCode = `function bstIterator(root) {
  const stack = [];
  const result = [];

  let curr = root;
  while (curr !== null) {
    stack.push(curr);
    note("Pushing left ancestor node " + curr.val + " to iterator stack");
    curr = curr.left;
  }

  while (stack.length > 0) {
    const node = stack.pop();
    result.push(node.val);
    note("Iterator next(): yields " + node.val);

    let nextNode = node.right;
    while (nextNode !== null) {
      stack.push(nextNode);
      note("Pushing node " + nextNode.val + " from right branch to stack");
      nextNode = nextNode.left;
    }
  }

  return result;
}`;

const countNodesCode = `function countNodes(root) {
  if (root === null) return 0;

  let leftHeight = 0;
  let currLeft = root;
  while (currLeft !== null) {
    leftHeight++;
    currLeft = currLeft.left;
  }

  let rightHeight = 0;
  let currRight = root;
  while (currRight !== null) {
    rightHeight++;
    currRight = currRight.right;
  }

  if (leftHeight === rightHeight) {
    const fullCount = (1 << leftHeight) - 1;
    note("Subtree at " + root.val + " is full (height " + leftHeight + "). Nodes = " + fullCount);
    return fullCount;
  }

  note("Subtree at " + root.val + " is not full; counting 1 + left + right");
  return 1 + countNodes(root.left) + countNodes(root.right);
}`;

const lowestCommonAncestorCode = `function lowestCommonAncestor(root, pVal, qVal) {
  function findLCA(node) {
    if (node === null) return null;
    if (node.val === pVal || node.val === qVal) {
      note("Matched search target node (" + node.val + ")");
      return node;
    }

    const left = findLCA(node.left);
    const right = findLCA(node.right);

    if (left !== null && right !== null) {
      note("Node " + node.val + " is the LCA because targets are split across left and right branches");
      return node;
    }

    return left !== null ? left : right;
  }

  const result = findLCA(root);
  return result !== null ? result.val : null;
}`;

const rightSideViewCode = `function rightSideView(root) {
  if (root === null) return [];

  const queue = [root];
  const result = [];

  while (queue.length > 0) {
    const levelSize = queue.length;

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();

      if (i === levelSize - 1) {
        result.push(node.val);
        note("Rightmost node of current level is " + node.val + "; added to result");
      }

      if (node.left !== null) queue.push(node.left);
      if (node.right !== null) queue.push(node.right);
    }
  }

  return result;
}`;

const averageOfLevelsCode = `function averageOfLevels(root) {
  if (root === null) return [];

  const queue = [root];
  const averages = [];

  while (queue.length > 0) {
    const levelSize = queue.length;
    let levelSum = 0;

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      levelSum += node.val;

      if (node.left !== null) queue.push(node.left);
      if (node.right !== null) queue.push(node.right);
    }

    const avg = levelSum / levelSize;
    averages.push(avg);
    note("Level completed: sum = " + levelSum + ", size = " + levelSize + ", average = " + avg);
  }

  return averages;
}`;

const levelOrderCode = `function levelOrder(root) {
  if (root === null) return [];

  const queue = [root];
  const result = [];

  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentLevel = [];

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      currentLevel.push(node.val);

      if (node.left !== null) queue.push(node.left);
      if (node.right !== null) queue.push(node.right);
    }

    result.push(currentLevel);
    note("Completed level with values: [" + currentLevel.join(", ") + "]");
  }

  return result;
}`;

const zigzagLevelOrderCode = `function zigzagLevelOrder(root) {
  if (root === null) return [];

  const queue = [root];
  const result = [];
  let leftToRight = true;

  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentLevel = [];

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();

      if (leftToRight) {
        currentLevel.push(node.val);
      } else {
        currentLevel.unshift(node.val);
      }

      if (node.left !== null) queue.push(node.left);
      if (node.right !== null) queue.push(node.right);
    }

    result.push(currentLevel);
    note("Completed level with direction " + (leftToRight ? "L-to-R" : "R-to-L") + ": [" + currentLevel.join(", ") + "]");
    leftToRight = !leftToRight;
  }

  return result;
}`;

const minDiffBstCode = `function getMinimumDifference(root) {
  let minDiff = Infinity;
  let prevVal = null;

  function inorder(node) {
    if (node === null) return;

    inorder(node.left);

    if (prevVal !== null) {
      const diff = node.val - prevVal;
      if (diff < minDiff) {
        minDiff = diff;
        note("New minimum difference: " + minDiff + " (between " + prevVal + " and " + node.val + ")");
      } else {
        note("Difference: " + diff + " (between " + prevVal + " and " + node.val + ")");
      }
    } else {
      note("First inorder node: " + node.val);
    }
    prevVal = node.val;

    inorder(node.right);
  }

  inorder(root);
  return minDiff;
}`;

const kthSmallestBstCode = `function kthSmallest(root, k) {
  let count = 0;
  let result = null;

  function inorder(node) {
    if (node === null || result !== null) return;

    inorder(node.left);

    if (result === null) {
      count++;
      note("Visited node " + node.val + " (rank #" + count + ")");
      if (count === k) {
        result = node.val;
        note("Found " + k + "-th smallest element: " + result);
        return;
      }
    }

    inorder(node.right);
  }

  inorder(root);
  return result;
}`;

const isValidBstCode = `function isValidBST(root) {
  function validate(node, min, max) {
    if (node === null) return true;

    if (min !== null && node.val <= min) {
      note("Violation: node " + node.val + " <= minimum allowed " + min);
      return false;
    }
    if (max !== null && node.val >= max) {
      note("Violation: node " + node.val + " >= maximum allowed " + max);
      return false;
    }

    note("Node " + node.val + " is valid within (" + min + ", " + max + ")");
    return validate(node.left, min, node.val) && validate(node.right, node.val, max);
  }

  return validate(root, null, null);
}`;

const nQueensCode = `function solveNQueens(n) {
  const board = [];
  for (let i = 0; i < n; i++) {
    const row = [];
    for (let j = 0; j < n; j++) {
      row.push('.');
    }
    board.push(row);
  }

  const solutions = [];
  const cols = new Set();
  const diag1 = new Set();
  const diag2 = new Set();

  function backtrack(row) {
    if (row === n) {
      note("Found valid configuration! All " + n + " queens placed safely.");
      const solution = [];
      for (let i = 0; i < n; i++) {
        solution.push(board[i].join(''));
      }
      solutions.push(solution);
      return;
    }

    for (let col = 0; col < n; col++) {
      const d1 = row - col;
      const d2 = row + col;

      if (cols.has(col) || diag1.has(d1) || diag2.has(d2)) {
        continue;
      }

      note("Placing Queen at row " + row + ", col " + col);
      board[row][col] = 'Q';
      cols.add(col);
      diag1.add(d1);
      diag2.add(d2);

      backtrack(row + 1);

      note("Backtracking: remove Queen from row " + row + ", col " + col);
      board[row][col] = '.';
      cols.delete(col);
      diag1.delete(d1);
      diag2.delete(d2);
    }
  }

  backtrack(0);
  return solutions;
}`;

const nQueensIICode = `function totalNQueens(n) {
  let count = 0;
  const board = [];
  for (let i = 0; i < n; i++) {
    const row = [];
    for (let j = 0; j < n; j++) {
      row.push('.');
    }
    board.push(row);
  }

  const cols = new Set();
  const diag1 = new Set();
  const diag2 = new Set();

  function backtrack(row) {
    if (row === n) {
      note("Valid placement found! Incrementing solutions count.");
      count++;
      return;
    }

    for (let col = 0; col < n; col++) {
      const d1 = row - col;
      const d2 = row + col;

      if (cols.has(col) || diag1.has(d1) || diag2.has(d2)) {
        continue;
      }

      note("Placing Queen at row " + row + ", col " + col);
      board[row][col] = 'Q';
      cols.add(col);
      diag1.add(d1);
      diag2.add(d2);

      backtrack(row + 1);

      note("Backtracking: remove Queen from row " + row + ", col " + col);
      board[row][col] = '.';
      cols.delete(col);
      diag1.delete(d1);
      diag2.delete(d2);
    }
  }

  backtrack(0);
  return count;
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

  // Linked List Category (Batch 2)
  {
    meta: llCycleMeta,
    solutionCode: llCycleCode,
    inputs: llCycleInputs,
    rendererConfig: llCycleRenderer,
  },
  {
    meta: addTwoNumbersMeta,
    solutionCode: addTwoNumbersCode,
    inputs: addTwoNumbersInputs,
    rendererConfig: addTwoNumbersRenderer,
  },
  {
    meta: mergeTwoListsMeta,
    solutionCode: mergeTwoListsCode,
    inputs: mergeTwoListsInputs,
    rendererConfig: mergeTwoListsRenderer,
  },
  {
    meta: copyRandomListMeta,
    solutionCode: copyRandomListCode,
    inputs: copyRandomListInputs,
    rendererConfig: copyRandomListRenderer,
  },
  {
    meta: reverseBetweenMeta,
    solutionCode: reverseBetweenCode,
    inputs: reverseBetweenInputs,
    rendererConfig: reverseBetweenRenderer,
  },
  {
    meta: reverseKGroupMeta,
    solutionCode: reverseKGroupCode,
    inputs: reverseKGroupInputs,
    rendererConfig: reverseKGroupRenderer,
  },
  {
    meta: removeNthMeta,
    solutionCode: removeNthFromEndCode,
    inputs: removeNthInputs,
    rendererConfig: removeNthRenderer,
  },
  {
    meta: deleteDuplicatesMeta,
    solutionCode: deleteDuplicatesCode,
    inputs: deleteDuplicatesInputs,
    rendererConfig: deleteDuplicatesRenderer,
  },
  {
    meta: rotateListMeta,
    solutionCode: rotateListCode,
    inputs: rotateListInputs,
    rendererConfig: rotateListRenderer,
  },
  {
    meta: partitionListMeta,
    solutionCode: partitionCode,
    inputs: partitionListInputs,
    rendererConfig: partitionListRenderer,
  },
  {
    meta: lruCacheMeta,
    solutionCode: lruCacheCode,
    inputs: lruCacheInputs,
    rendererConfig: lruCacheRenderer,
  },

  // Binary Tree General Category (Batch 3)
  {
    meta: maxDepthMeta,
    solutionCode: maxDepthCode,
    inputs: maxDepthInputs,
    rendererConfig: maxDepthRenderer,
  },
  {
    meta: sameTreeMeta,
    solutionCode: sameTreeCode,
    inputs: sameTreeInputs,
    rendererConfig: sameTreeRenderer,
  },
  {
    meta: invertTreeMeta,
    solutionCode: invertTreeCode,
    inputs: invertTreeInputs,
    rendererConfig: invertTreeRenderer,
  },
  {
    meta: symmetricTreeMeta,
    solutionCode: symmetricTreeCode,
    inputs: symmetricTreeInputs,
    rendererConfig: symmetricTreeRenderer,
  },
  {
    meta: buildTreePreInMeta,
    solutionCode: buildTreePreInCode,
    inputs: buildTreePreInInputs,
    rendererConfig: buildTreePreInRenderer,
  },
  {
    meta: buildTreeInPostMeta,
    solutionCode: buildTreeInPostCode,
    inputs: buildTreeInPostInputs,
    rendererConfig: buildTreeInPostRenderer,
  },
  {
    meta: connectNextMeta,
    solutionCode: connectNextCode,
    inputs: connectNextInputs,
    rendererConfig: connectNextRenderer,
  },
  {
    meta: flattenTreeMeta,
    solutionCode: flattenTreeCode,
    inputs: flattenTreeInputs,
    rendererConfig: flattenTreeRenderer,
  },
  {
    meta: hasPathSumMeta,
    solutionCode: hasPathSumCode,
    inputs: hasPathSumInputs,
    rendererConfig: hasPathSumRenderer,
  },
  {
    meta: sumNumbersMeta,
    solutionCode: sumNumbersCode,
    inputs: sumNumbersInputs,
    rendererConfig: sumNumbersRenderer,
  },
  {
    meta: maxPathSumMeta,
    solutionCode: maxPathSumCode,
    inputs: maxPathSumInputs,
    rendererConfig: maxPathSumRenderer,
  },
  {
    meta: bstIteratorMeta,
    solutionCode: bstIteratorCode,
    inputs: bstIteratorInputs,
    rendererConfig: bstIteratorRenderer,
  },
  {
    meta: countNodesMeta,
    solutionCode: countNodesCode,
    inputs: countNodesInputs,
    rendererConfig: countNodesRenderer,
  },
  {
    meta: lowestCommonAncestorMeta,
    solutionCode: lowestCommonAncestorCode,
    inputs: lowestCommonAncestorInputs,
    rendererConfig: lowestCommonAncestorRenderer,
  },

  // Binary Tree BFS Category
  {
    meta: rightSideViewMeta,
    solutionCode: rightSideViewCode,
    inputs: rightSideViewInputs,
    rendererConfig: rightSideViewRenderer,
  },
  {
    meta: averageOfLevelsMeta,
    solutionCode: averageOfLevelsCode,
    inputs: averageOfLevelsInputs,
    rendererConfig: averageOfLevelsRenderer,
  },
  {
    meta: levelOrderMeta,
    solutionCode: levelOrderCode,
    inputs: levelOrderInputs,
    rendererConfig: levelOrderRenderer,
  },
  {
    meta: zigzagLevelOrderMeta,
    solutionCode: zigzagLevelOrderCode,
    inputs: zigzagLevelOrderInputs,
    rendererConfig: zigzagLevelOrderRenderer,
  },

  // Binary Search Tree Category
  {
    meta: minDiffBstMeta,
    solutionCode: minDiffBstCode,
    inputs: minDiffBstInputs,
    rendererConfig: minDiffBstRenderer,
  },
  {
    meta: kthSmallestBstMeta,
    solutionCode: kthSmallestBstCode,
    inputs: kthSmallestBstInputs,
    rendererConfig: kthSmallestBstRenderer,
  },
  {
    meta: isValidBstMeta,
    solutionCode: isValidBstCode,
    inputs: isValidBstInputs,
    rendererConfig: isValidBstRenderer,
  },

  // Backtracking Category (Assignment Focus)
  {
    meta: nQueensMeta,
    solutionCode: nQueensCode,
    inputs: nQueensInputs,
    rendererConfig: nQueensRenderer,
  },
  {
    meta: nQueensIIMeta,
    solutionCode: nQueensIICode,
    inputs: nQueensIIInputs,
    rendererConfig: nQueensIIRenderer,
  },
];

export function getAllProblems(): ProblemDefinition[] {
  return PROBLEMS;
}

export function getProblemBySlug(slug: string): ProblemDefinition | undefined {
  return PROBLEMS.find((p) => p.meta.slug === slug);
}
