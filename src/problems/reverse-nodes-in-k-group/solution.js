function reverseKGroup(head, k) {
  if (head === null || k === 1) return head;

  const dummyHead = { val: 0, next: head };
  let groupPrev = dummyHead;

  while (true) {
    let kth = groupPrev;
    for (let i = 0; i < k && kth !== null; i++) {
      kth = kth.next;
    }
    if (kth === null) break;

    const groupNext = kth.next;
    let prev = groupNext;
    let curr = groupPrev.next;

    note("Reversing k = " + k + " nodes starting from val " + curr.val);
    while (curr !== groupNext) {
      const temp = curr.next;
      curr.next = prev;
      prev = curr;
      curr = temp;
    }

    const tempTail = groupPrev.next;
    groupPrev.next = kth;
    groupPrev = tempTail;
  }

  note("Completed k-group reversals. Returning dummyHead.next");
  return dummyHead.next;
}
