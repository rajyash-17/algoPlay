function simplifyPath(path) {
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
}
