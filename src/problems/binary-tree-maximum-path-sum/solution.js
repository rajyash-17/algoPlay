function maxPathSum(root) {
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
}
