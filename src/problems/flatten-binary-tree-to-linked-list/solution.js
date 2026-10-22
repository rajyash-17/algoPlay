function flatten(root) {
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
}
