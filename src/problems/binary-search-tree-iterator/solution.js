function bstIterator(root) {
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
}
