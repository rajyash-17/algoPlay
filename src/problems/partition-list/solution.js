function partition(head, x) {
  const beforeHead = { val: 0, next: null };
  const afterHead = { val: 0, next: null };
  let before = beforeHead;
  let after = afterHead;

  let curr = head;
  while (curr !== null) {
    if (curr.val < x) {
      note("Node " + curr.val + " < " + x + ": append to 'before' partition");
      before.next = curr;
      before = before.next;
    } else {
      note("Node " + curr.val + " >= " + x + ": append to 'after' partition");
      after.next = curr;
      after = after.next;
    }
    curr = curr.next;
  }

  after.next = null;
  before.next = afterHead.next;
  note("Linked before partition to after partition. Returning beforeHead.next");

  return beforeHead.next;
}
