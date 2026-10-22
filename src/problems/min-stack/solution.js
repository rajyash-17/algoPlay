function simulateMinStack(operations, values) {
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
}
