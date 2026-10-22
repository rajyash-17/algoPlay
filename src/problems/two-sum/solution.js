function twoSum(nums, target) {
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    note("Checking if complement " + complement + " (" + target + " - " + nums[i] + ") is in map");

    if (map.has(complement)) {
      note("Found complement in map! Pair indices: [" + map.get(complement) + ", " + i + "]");
      return [map.get(complement), i];
    }

    map.set(nums[i], i);
  }

  return [];
}
