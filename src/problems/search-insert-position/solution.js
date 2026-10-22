function searchInsert(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    note("Examining middle index " + mid + " (value = " + nums[mid] + ") for target " + target);

    if (nums[mid] === target) {
      note("Target " + target + " found at index " + mid + "!");
      return mid;
    } else if (nums[mid] < target) {
      note(nums[mid] + " < " + target + ": searching right half (left = " + (mid + 1) + ")");
      left = mid + 1;
    } else {
      note(nums[mid] + " > " + target + ": searching left half (right = " + (mid - 1) + ")");
      right = mid - 1;
    }
  }

  note("Target not present. Proper insertion point is index " + left);
  return left;
}
