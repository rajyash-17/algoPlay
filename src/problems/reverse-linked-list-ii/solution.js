function reverseBetween(head, left, right) {
  if (head === null || left === right) return head;

  const dummyHead = { val: 0, next: head };
  let prev = dummyHead;

  for (let i = 1; i < left; i++) {
    prev = prev.next;
  }

  let curr = prev.next;
  note("Positioned prev at index " + (left - 1) + "; beginning sublist reversal");

  for (let i = 0; i < right - left; i++) {
    const temp = curr.next;
    curr.next = temp.next;
    temp.next = prev.next;
    prev.next = temp;
    note("Move node with val " + temp.val + " to front of reversed sublist");
  }

  note("Sublist reversal finished. Returning dummyHead.next");
  return dummyHead.next;
}
