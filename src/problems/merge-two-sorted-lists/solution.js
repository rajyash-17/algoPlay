function mergeTwoLists(list1, list2) {
  const dummyHead = { val: -1, next: null };
  let curr = dummyHead;

  while (list1 !== null && list2 !== null) {
    if (list1.val <= list2.val) {
      note("Compare: " + list1.val + " <= " + list2.val + "; link list1 node (" + list1.val + ")");
      curr.next = list1;
      list1 = list1.next;
    } else {
      note("Compare: " + list2.val + " < " + list1.val + "; link list2 node (" + list2.val + ")");
      curr.next = list2;
      list2 = list2.next;
    }
    curr = curr.next;
  }

  if (list1 !== null) {
    note("Append remaining nodes from list1");
    curr.next = list1;
  } else if (list2 !== null) {
    note("Append remaining nodes from list2");
    curr.next = list2;
  }

  note("Merge complete. Returning merged head");
  return dummyHead.next;
}
