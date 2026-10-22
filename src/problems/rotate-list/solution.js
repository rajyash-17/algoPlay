function rotateRight(head, k) {
  if (head === null || head.next === null || k === 0) return head;

  let length = 1;
  let oldTail = head;
  while (oldTail.next !== null) {
    oldTail = oldTail.next;
    length++;
  }

  const effectiveK = k % length;
  note("Calculated length = " + length + ", effective rotation k = " + effectiveK);
  if (effectiveK === 0) return head;

  oldTail.next = head; // Close circle

  let newTail = head;
  for (let i = 0; i < length - effectiveK - 1; i++) {
    newTail = newTail.next;
  }

  const newHead = newTail.next;
  newTail.next = null; // Break circle

  note("Broke circle at new tail (val " + newTail.val + "); new head is val " + newHead.val);
  return newHead;
}
