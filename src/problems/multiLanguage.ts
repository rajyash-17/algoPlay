export type SupportedLanguage = 'JavaScript' | 'TypeScript' | 'Python' | 'Java' | 'C++';

export interface LanguageImplementation {
  code: string;
  // Maps clean JavaScript line number to the corresponding line in this language
  lineMap: Record<number, number>;
}

export const MULTI_LANG_SOLUTIONS: Record<string, Record<SupportedLanguage, LanguageImplementation>> = {
  'two-sum': {
    JavaScript: {
      code: `function twoSum(nums, target) {
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    if (map.has(complement)) {
      return [map.get(complement), i];
    }

    map.set(nums[i], i);
  }

  return [];
}`,
      lineMap: { 1: 1, 2: 2, 4: 4, 5: 5, 7: 7, 8: 8, 11: 11, 14: 14 },
    },
    TypeScript: {
      code: `function twoSum(nums: number[], target: number): number[] {
  const map = new Map<number, number>();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i]!;

    if (map.has(complement)) {
      return [map.get(complement)!, i];
    }

    map.set(nums[i]!, i);
  }

  return [];
}`,
      lineMap: { 1: 1, 2: 2, 4: 4, 5: 5, 7: 7, 8: 8, 11: 11, 14: 14 },
    },
    Python: {
      code: `def twoSum(nums: list[int], target: int) -> list[int]:
    seen = {}

    for i in range(len(nums)):
        complement = target - nums[i]

        if complement in seen:
            return [seen[complement], i]

        seen[nums[i]] = i

    return []`,
      lineMap: { 1: 1, 2: 2, 4: 4, 5: 5, 7: 7, 8: 8, 11: 10, 14: 12 },
    },
    Java: {
      code: `public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> map = new HashMap<>();

    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];

        if (map.containsKey(complement)) {
            return new int[] { map.get(complement), i };
        }

        map.put(nums[i], i);
    }

    return new int[0];
}`,
      lineMap: { 1: 1, 2: 2, 4: 4, 5: 5, 7: 7, 8: 8, 11: 11, 14: 14 },
    },
    'C++': {
      code: `vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> map;

    for (int i = 0; i < (int)nums.size(); i++) {
        int complement = target - nums[i];

        if (map.find(complement) != map.end()) {
            return { map[complement], i };
        }

        map[nums[i]] = i;
    }

    return {};
}`,
      lineMap: { 1: 1, 2: 2, 4: 4, 5: 5, 7: 7, 8: 8, 11: 11, 14: 14 },
    },
  },

  'two-sum-ii': {
    JavaScript: {
      code: `function twoSumII(numbers, target) {
  let left = 0;
  let right = numbers.length - 1;

  while (left < right) {
    const sum = numbers[left] + numbers[right];

    if (sum === target) {
      return [left + 1, right + 1];
    } else if (sum < target) {
      left++;
    } else {
      right--;
    }
  }

  return [];
}`,
      lineMap: { 1: 1, 2: 2, 3: 3, 5: 5, 6: 6, 8: 8, 9: 9, 10: 10, 11: 11, 12: 12, 13: 13, 17: 17 },
    },
    TypeScript: {
      code: `function twoSumII(numbers: number[], target: number): number[] {
  let left = 0;
  let right = numbers.length - 1;

  while (left < right) {
    const sum = numbers[left]! + numbers[right]!;

    if (sum === target) {
      return [left + 1, right + 1];
    } else if (sum < target) {
      left++;
    } else {
      right--;
    }
  }

  return [];
}`,
      lineMap: { 1: 1, 2: 2, 3: 3, 5: 5, 6: 6, 8: 8, 9: 9, 10: 10, 11: 11, 12: 12, 13: 13, 17: 17 },
    },
    Python: {
      code: `def twoSumII(numbers: list[int], target: int) -> list[int]:
    left = 0
    right = len(numbers) - 1

    while left < right:
        sum = numbers[left] + numbers[right]

        if sum == target:
            return [left + 1, right + 1]
        elif sum < target:
            left += 1
        else:
            right -= 1

    return []`,
      lineMap: { 1: 1, 2: 2, 3: 3, 5: 5, 6: 6, 8: 8, 9: 9, 10: 10, 11: 11, 12: 12, 13: 13, 17: 15 },
    },
    Java: {
      code: `public int[] twoSumII(int[] numbers, int target) {
    int left = 0;
    int right = numbers.length - 1;

    while (left < right) {
        int sum = numbers[left] + numbers[right];

        if (sum == target) {
            return new int[] { left + 1, right + 1 };
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }

    return new int[0];
}`,
      lineMap: { 1: 1, 2: 2, 3: 3, 5: 5, 6: 6, 8: 8, 9: 9, 10: 10, 11: 11, 12: 12, 13: 13, 17: 17 },
    },
    'C++': {
      code: `vector<int> twoSumII(vector<int>& numbers, int target) {
    int left = 0;
    int right = (int)numbers.size() - 1;

    while (left < right) {
        int sum = numbers[left] + numbers[right];

        if (sum == target) {
            return { left + 1, right + 1 };
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }

    return {};
}`,
      lineMap: { 1: 1, 2: 2, 3: 3, 5: 5, 6: 6, 8: 8, 9: 9, 10: 10, 11: 11, 12: 12, 13: 13, 17: 17 },
    },
  },

  'valid-palindrome': {
    JavaScript: {
      code: `function isPalindrome(s) {
  const clean = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  const chars = clean.split('');
  let left = 0;
  let right = chars.length - 1;

  while (left < right) {
    if (chars[left] !== chars[right]) {
      return false;
    }
    left++;
    right--;
  }

  return true;
}`,
      lineMap: { 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 7: 7, 8: 8, 9: 9, 11: 11, 12: 12, 15: 15 },
    },
    TypeScript: {
      code: `function isPalindrome(s: string): boolean {
  const clean = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  const chars = clean.split('');
  let left = 0;
  let right = chars.length - 1;

  while (left < right) {
    if (chars[left] !== chars[right]) {
      return false;
    }
    left++;
    right--;
  }

  return true;
}`,
      lineMap: { 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 7: 7, 8: 8, 9: 9, 11: 11, 12: 12, 15: 15 },
    },
    Python: {
      code: `def isPalindrome(s: str) -> bool:
    clean = "".join(c.lower() for c in s if c.isalnum())
    chars = list(clean)
    left = 0
    right = len(chars) - 1

    while left < right:
        if chars[left] != chars[right]:
            return False
        left += 1
        right -= 1

    return True`,
      lineMap: { 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 7: 7, 8: 8, 9: 9, 11: 10, 12: 11, 15: 13 },
    },
    Java: {
      code: `public boolean isPalindrome(String s) {
    String clean = s.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();
    char[] chars = clean.toCharArray();
    int left = 0;
    int right = chars.length - 1;

    while (left < right) {
        if (chars[left] != chars[right]) {
            return false;
        }
        left++;
        right--;
    }

    return true;
}`,
      lineMap: { 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 7: 7, 8: 8, 9: 9, 11: 11, 12: 12, 15: 15 },
    },
    'C++': {
      code: `bool isPalindrome(string s) {
    string clean = "";
    for (char c : s) if (isalnum(c)) clean += tolower(c);
    vector<char> chars(clean.begin(), clean.end());
    int left = 0;
    int right = (int)chars.size() - 1;

    while (left < right) {
        if (chars[left] != chars[right]) {
            return false;
        }
        left++;
        right--;
    }

    return true;
}`,
      lineMap: { 1: 1, 2: 2, 3: 4, 4: 5, 5: 6, 7: 8, 8: 9, 9: 10, 11: 12, 12: 13, 15: 16 },
    },
  },

  'best-time-to-buy-and-sell-stock': {
    JavaScript: {
      code: `function maxProfit(prices) {
  let minPrice = prices[0];
  let maxProfitSoFar = 0;
  let buyDay = 0;

  for (let day = 1; day < prices.length; day++) {
    const currentPrice = prices[day];
    if (currentPrice < minPrice) {
      minPrice = currentPrice;
      buyDay = day;
    } else {
      const profit = currentPrice - minPrice;
      if (profit > maxProfitSoFar) {
        maxProfitSoFar = profit;
      }
    }
  }

  return maxProfitSoFar;
}`,
      lineMap: { 1: 1, 2: 2, 3: 3, 4: 4, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10, 12: 12, 13: 13, 14: 14, 18: 18 },
    },
    TypeScript: {
      code: `function maxProfit(prices: number[]): number {
  let minPrice = prices[0]!;
  let maxProfitSoFar = 0;
  let buyDay = 0;

  for (let day = 1; day < prices.length; day++) {
    const currentPrice = prices[day]!;
    if (currentPrice < minPrice) {
      minPrice = currentPrice;
      buyDay = day;
    } else {
      const profit = currentPrice - minPrice;
      if (profit > maxProfitSoFar) {
        maxProfitSoFar = profit;
      }
    }
  }

  return maxProfitSoFar;
}`,
      lineMap: { 1: 1, 2: 2, 3: 3, 4: 4, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10, 12: 12, 13: 13, 14: 14, 18: 18 },
    },
    Python: {
      code: `def maxProfit(prices: list[int]) -> int:
    minPrice = prices[0]
    maxProfitSoFar = 0
    buyDay = 0

    for day in range(1, len(prices)):
        currentPrice = prices[day]
        if currentPrice < minPrice:
            minPrice = currentPrice
            buyDay = day
        else:
            profit = currentPrice - minPrice
            if profit > maxProfitSoFar:
                maxProfitSoFar = profit

    return maxProfitSoFar`,
      lineMap: { 1: 1, 2: 2, 3: 3, 4: 4, 6: 6, 7: 7, 8: 8, 9: 9, 10: 9, 12: 11, 13: 12, 14: 13, 18: 15 },
    },
    Java: {
      code: `public int maxProfit(int[] prices) {
    int minPrice = prices[0];
    int maxProfitSoFar = 0;
    int buyDay = 0;

    for (int day = 1; day < prices.length; day++) {
        int currentPrice = prices[day];
        if (currentPrice < minPrice) {
            minPrice = currentPrice;
            buyDay = day;
        } else {
            int profit = currentPrice - minPrice;
            if (profit > maxProfitSoFar) {
                maxProfitSoFar = profit;
            }
        }
    }

    return maxProfitSoFar;
}`,
      lineMap: { 1: 1, 2: 2, 3: 3, 4: 4, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10, 12: 12, 13: 13, 14: 14, 18: 18 },
    },
    'C++': {
      code: `int maxProfit(vector<int>& prices) {
    int minPrice = prices[0];
    int maxProfitSoFar = 0;
    int buyDay = 0;

    for (int day = 1; day < (int)prices.size(); day++) {
        int currentPrice = prices[day];
        if (currentPrice < minPrice) {
            minPrice = currentPrice;
            buyDay = day;
        } else {
            int profit = currentPrice - minPrice;
            if (profit > maxProfitSoFar) {
                maxProfitSoFar = profit;
            }
        }
    }

    return maxProfitSoFar;
}`,
      lineMap: { 1: 1, 2: 2, 3: 3, 4: 4, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10, 12: 12, 13: 13, 14: 14, 18: 18 },
    },
  },

  'search-insert-position': {
    JavaScript: {
      code: `function searchInsert(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return left;
}`,
      lineMap: { 1: 1, 2: 2, 3: 3, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10, 11: 11, 12: 12, 16: 16 },
    },
    TypeScript: {
      code: `function searchInsert(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid]! < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return left;
}`,
      lineMap: { 1: 1, 2: 2, 3: 3, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10, 11: 11, 12: 12, 16: 16 },
    },
    Python: {
      code: `def searchInsert(nums: list[int], target: int) -> int:
    left = 0
    right = len(nums) - 1

    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return left`,
      lineMap: { 1: 1, 2: 2, 3: 3, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10, 11: 11, 12: 12, 16: 14 },
    },
    Java: {
      code: `public int searchInsert(int[] nums, int target) {
    int left = 0;
    int right = nums.length - 1;

    while (left <= right) {
        int mid = (left + right) / 2;
        if (nums[mid] == target) {
            return mid;
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return left;
}`,
      lineMap: { 1: 1, 2: 2, 3: 3, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10, 11: 11, 12: 12, 16: 16 },
    },
    'C++': {
      code: `int searchInsert(vector<int>& nums, int target) {
    int left = 0;
    int right = (int)nums.size() - 1;

    while (left <= right) {
        int mid = (left + right) / 2;
        if (nums[mid] == target) {
            return mid;
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return left;
}`,
      lineMap: { 1: 1, 2: 2, 3: 3, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10, 11: 11, 12: 12, 16: 16 },
    },
  },
};
