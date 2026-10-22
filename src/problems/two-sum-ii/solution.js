function twoSumII(numbers, target) {
  let left = 0;
  let right = numbers.length - 1;

  while (left < right) {
    const sum = numbers[left] + numbers[right];
    note("Sum = numbers[" + left + "] + numbers[" + right + "] = " + sum + " (target = " + target + ")");

    if (sum === target) {
      note("Found target sum! 1-indexed positions: [" + (left + 1) + ", " + (right + 1) + "]");
      return [left + 1, right + 1];
    } else if (sum < target) {
      note(sum + " < " + target + ": moving left pointer right to increase sum");
      left++;
    } else {
      note(sum + " > " + target + ": moving right pointer left to decrease sum");
      right--;
    }
  }

  return [];
}
