function connect(root) {
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
}
