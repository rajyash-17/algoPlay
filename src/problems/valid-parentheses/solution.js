function isValid(s) {
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
}
