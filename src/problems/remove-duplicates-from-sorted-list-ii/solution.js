function deleteDuplicates(head) {
  const sentinel = { val: 0, next: head };
  let pred = sentinel;

  while (head !== null) {
    if (head.next !== null && head.val === head.next.val) {
      note("Detected duplicate sequence with val " + head.val);
      while (head.next !== null && head.val === head.next.val) {
        head = head.next;
      }
      pred.next = head.next;
    } else {
      pred = pred.next;
    }
    head = head.next;
  }

  note("Duplicate removal complete. Returning sentinel.next");
  return sentinel.next;
}
