function averageOfLevels(root) {
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
}
