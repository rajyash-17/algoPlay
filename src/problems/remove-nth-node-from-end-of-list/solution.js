function removeNthFromEnd(head, n) {
  const dummyHead = { val: 0, next: head };
  let fast = dummyHead;
  let slow = dummyHead;

  for (let i = 0; i <= n; i++) {
    fast = fast.next;
  }
  note("Advanced fast pointer by " + (n + 1) + " steps to create the n-gap");

  while (fast !== null) {
    slow = slow.next;
    fast = fast.next;
  }

  note("Fast reached end; slow is at node prior to removal (node " + slow.val + ")");
  slow.next = slow.next.next;

  note("Bypassed nth node. Returning dummyHead.next");
  return dummyHead.next;
}
