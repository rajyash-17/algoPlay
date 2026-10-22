function addTwoNumbers(l1, l2) {
  const dummyHead = { val: 0, next: null };
  let curr = dummyHead;
  let p = l1;
  let q = l2;
  let carry = 0;

  while (p !== null || q !== null || carry !== 0) {
    const x = p !== null ? p.val : 0;
    const y = q !== null ? q.val : 0;
    const sum = carry + x + y;
    carry = Math.floor(sum / 10);
    const digit = sum % 10;

    note("Add " + x + " + " + y + " + carry " + (sum - x - y) + " = " + sum + "; append digit " + digit);
    curr.next = { val: digit, next: null };
    curr = curr.next;

    if (p !== null) p = p.next;
    if (q !== null) q = q.next;
  }

  note("Addition complete. Result head is dummyHead.next");
  return dummyHead.next;
}
