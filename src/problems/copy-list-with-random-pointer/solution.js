function copyRandomList(head) {
  if (head === null) return null;

  const map = new Map();

  let curr = head;
  while (curr !== null) {
    note("Pass 1: clone node with val " + curr.val);
    map.set(curr, { val: curr.val, next: null, random: null });
    curr = curr.next;
  }

  curr = head;
  while (curr !== null) {
    const copyNode = map.get(curr);
    copyNode.next = curr.next !== null ? map.get(curr.next) : null;
    copyNode.random = curr.random !== null ? map.get(curr.random) : null;
    note("Pass 2: link copy node (" + curr.val + ") next and random pointers");
    curr = curr.next;
  }

  note("Cloning complete. Returning head of deep copy");
  return map.get(head);
}
