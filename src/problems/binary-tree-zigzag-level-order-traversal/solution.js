function zigzagLevelOrder(root) {
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
}
