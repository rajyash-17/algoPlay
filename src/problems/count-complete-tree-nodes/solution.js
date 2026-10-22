function countNodes(root) {
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
}
