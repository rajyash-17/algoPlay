function simulateLRUCache(capacity, operations, argsList) {
  const head = { val: 'HEAD', next: null };
  const tail = { val: 'TAIL', next: null };
  head.next = tail;

  const map = new Map();
  const result = [];

  function removeNode(node) {
    let prevNode = head;
    while (prevNode.next !== null && prevNode.next !== node) {
      prevNode = prevNode.next;
    }
    if (prevNode.next === node) {
      prevNode.next = node.next;
    }
  }

  function addToFront(node) {
    node.next = head.next;
    head.next = node;
  }

  for (let i = 0; i < operations.length; i++) {
    const op = operations[i];
    const args = argsList[i];

    if (op === 'put') {
      const key = args[0];
      const val = args[1];

      if (map.has(key)) {
        const existingNode = map.get(key);
        existingNode.val = key + ':' + val;
        removeNode(existingNode);
        addToFront(existingNode);
        note("Update key " + key + " to " + val + " and move to MRU (front)");
      } else {
        if (map.size >= capacity) {
          // Find node before tail
          let prevNode = head;
          while (prevNode.next !== null && prevNode.next.next !== null) {
            prevNode = prevNode.next;
          }
          const lruNode = prevNode;
          note("Evict LRU node: " + lruNode.val);
          removeNode(lruNode);
          for (const [k, v] of map.entries()) {
            if (v === lruNode) {
              map.delete(k);
              break;
            }
          }
        }

        const newNode = { val: key + ':' + val, next: null };
        addToFront(newNode);
        map.set(key, newNode);
        note("Inserted key " + key + " with val " + val + " at MRU (front)");
      }
      result.push(null);
    } else if (op === 'get') {
      const key = args[0];
      if (map.has(key)) {
        const node = map.get(key);
        removeNode(node);
        addToFront(node);
        const parts = String(node.val).split(':');
        const numVal = Number(parts[1]);
        note("Cache hit for key " + key + ": returned " + numVal + "; moved to MRU");
        result.push(numVal);
      } else {
        note("Cache miss for key " + key + ": returned -1");
        result.push(-1);
      }
    }
  }

  return result;
}
