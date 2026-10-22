function hasCycle(head) {
  let slow = head;
  let fast = head;

  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
    note("Advance: slow moves 1 step, fast moves 2 steps");

    if (slow === fast) {
      note("Pointers met! Cycle confirmed in linked list.");
      return true;
    }
  }

  note("Fast pointer reached NULL. No cycle exists.");
  return false;
}
