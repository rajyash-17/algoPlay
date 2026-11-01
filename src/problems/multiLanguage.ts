export type SupportedLanguage = 'JavaScript' | 'TypeScript' | 'Python' | 'Java' | 'C++';

export interface LanguageImplementation {
  code: string;
  // Maps clean JavaScript line number to the corresponding line in this language
  lineMap: Record<number, number>;
}

import { TREE_MULTI_LANG_SOLUTIONS } from './treeMultiLanguage';
import { N_QUEENS_MULTI_LANG_SOLUTIONS } from './nQueensMultiLanguage';

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

  'valid-parentheses': {
    JavaScript: {
      code: `function isValid(s) {
  const stack = [];
  const pairs = { ')': '(', '}': '{', ']': '[' };

  for (let i = 0; i < s.length; i++) {
    const char = s[i];

    if (char === '(' || char === '{' || char === '[') {
      stack.push(char);
    } else {
      if (stack.length === 0 || stack[stack.length - 1] !== pairs[char]) {
        return false;
      }
      stack.pop();
    }
  }

  return stack.length === 0;
}`,
      lineMap: { 1: 1, 2: 2, 3: 3, 5: 5, 6: 6, 8: 8, 9: 9, 11: 11, 12: 12, 14: 14, 18: 18 },
    },
    TypeScript: {
      code: `function isValid(s: string): boolean {
  const stack: string[] = [];
  const pairs: Record<string, string> = { ')': '(', '}': '{', ']': '[' };

  for (let i = 0; i < s.length; i++) {
    const char = s[i]!;

    if (char === '(' || char === '{' || char === '[') {
      stack.push(char);
    } else {
      if (stack.length === 0 || stack[stack.length - 1] !== pairs[char]) {
        return false;
      }
      stack.pop();
    }
  }

  return stack.length === 0;
}`,
      lineMap: { 1: 1, 2: 2, 3: 3, 5: 5, 6: 6, 8: 8, 9: 9, 11: 11, 12: 12, 14: 14, 18: 18 },
    },
    Python: {
      code: `def isValid(s: str) -> bool:
    stack = []
    pairs = {')': '(', '}': '{', ']': '['}

    for i in range(len(s)):
        char = s[i]

        if char in '({[':
            stack.append(char)
        else:
            if not stack or stack[-1] != pairs[char]:
                return False
            stack.pop()

    return len(stack) == 0`,
      lineMap: { 1: 1, 2: 2, 3: 3, 5: 5, 6: 6, 8: 8, 9: 9, 11: 11, 12: 12, 14: 13, 18: 15 },
    },
    Java: {
      code: `public boolean isValid(String s) {
    Stack<Character> stack = new Stack<>();
    Map<Character, Character> pairs = Map.of(')', '(', '}', '{', ']', '[');

    for (int i = 0; i < s.length(); i++) {
        char char = s.charAt(i);

        if (char == '(' || char == '{' || char == '[') {
            stack.push(char);
        } else {
            if (stack.isEmpty() || stack.peek() != pairs.get(char)) {
                return false;
            }
            stack.pop();
        }
    }

    return stack.isEmpty();
}`,
      lineMap: { 1: 1, 2: 2, 3: 3, 5: 5, 6: 6, 8: 8, 9: 9, 11: 11, 12: 12, 14: 14, 18: 18 },
    },
    'C++': {
      code: `bool isValid(string s) {
    stack<char> stack;
    unordered_map<char, char> pairs = {{')', '('}, {'}', '{'}, {']', '['}};

    for (int i = 0; i < (int)s.size(); i++) {
        char char = s[i];

        if (char == '(' || char == '{' || char == '[') {
            stack.push(char);
        } else {
            if (stack.empty() || stack.top() != pairs[char]) {
                return false;
            }
            stack.pop();
        }
    }

    return stack.empty();
}`,
      lineMap: { 1: 1, 2: 2, 3: 3, 5: 5, 6: 6, 8: 8, 9: 9, 11: 11, 12: 12, 14: 14, 18: 18 },
    },
  },

  'simplify-path': {
    JavaScript: {
      code: `function simplifyPath(path) {
  const stack = [];
  const parts = path.split('/');

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];

    if (part === '' || part === '.') {
      continue;
    }

    if (part === '..') {
      if (stack.length > 0) {
        stack.pop();
      }
    } else {
      stack.push(part);
    }
  }

  const canonical = '/' + stack.join('/');
  return canonical;
}`,
      lineMap: { 1: 1, 2: 2, 3: 3, 5: 5, 6: 6, 8: 8, 12: 12, 13: 13, 14: 14, 17: 17, 21: 21, 22: 22 },
    },
    TypeScript: {
      code: `function simplifyPath(path: string): string {
  const stack: string[] = [];
  const parts = path.split('/');

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i]!;

    if (part === '' || part === '.') {
      continue;
    }

    if (part === '..') {
      if (stack.length > 0) {
        stack.pop();
      }
    } else {
      stack.push(part);
    }
  }

  const canonical = '/' + stack.join('/');
  return canonical;
}`,
      lineMap: { 1: 1, 2: 2, 3: 3, 5: 5, 6: 6, 8: 8, 12: 12, 13: 13, 14: 14, 17: 17, 21: 21, 22: 22 },
    },
    Python: {
      code: `def simplifyPath(path: str) -> str:
    stack = []
    parts = path.split('/')

    for i in range(len(parts)):
        part = parts[i]

        if part == '' or part == '.':
            continue

        if part == '..':
            if len(stack) > 0:
                stack.pop()
        else:
            stack.append(part)

    canonical = '/' + '/'.join(stack)
    return canonical`,
      lineMap: { 1: 1, 2: 2, 3: 3, 5: 5, 6: 6, 8: 8, 12: 11, 13: 12, 14: 13, 17: 15, 21: 17, 22: 18 },
    },
    Java: {
      code: `public String simplifyPath(String path) {
    Stack<String> stack = new Stack<>();
    String[] parts = path.split("/");

    for (int i = 0; i < parts.length; i++) {
        String part = parts[i];

        if (part.equals("") || part.equals(".")) {
            continue;
        }

        if (part.equals("..")) {
            if (!stack.isEmpty()) {
                stack.pop();
            }
        } else {
            stack.push(part);
        }
    }

    String canonical = "/" + String.join("/", stack);
    return canonical;
}`,
      lineMap: { 1: 1, 2: 2, 3: 3, 5: 5, 6: 6, 8: 8, 12: 12, 13: 13, 14: 14, 17: 17, 21: 21, 22: 22 },
    },
    'C++': {
      code: `string simplifyPath(string path) {
    vector<string> stack;
    stringstream ss(path);
    string part;

    while (getline(ss, part, '/')) {
        if (part == "" || part == ".") {
            continue;
        }

        if (part == "..") {
            if (!stack.empty()) {
                stack.pop_back();
            }
        } else {
            stack.push_back(part);
        }
    }

    string canonical = "";
    for (const string& dir : stack) canonical += "/" + dir;
    return canonical.empty() ? "/" : canonical;
}`,
      lineMap: { 1: 1, 2: 2, 3: 3, 5: 6, 6: 6, 8: 7, 12: 11, 13: 12, 14: 13, 17: 16, 21: 20, 22: 22 },
    },
  },

  'min-stack': {
    JavaScript: {
      code: `function simulateMinStack(operations, values) {
  const stack = [];
  const minStack = [];
  const result = [];

  for (let i = 0; i < operations.length; i++) {
    const op = operations[i];
    const val = values[i];

    if (op === 'push') {
      const minVal = minStack.length === 0 ? val : Math.min(val, minStack[minStack.length - 1]);
      stack.push(val);
      minStack.push(minVal);
      result.push(null);
    } else if (op === 'pop') {
      stack.pop();
      minStack.pop();
      result.push(null);
    } else if (op === 'top') {
      const topVal = stack[stack.length - 1];
      result.push(topVal);
    } else if (op === 'getMin') {
      const minVal = minStack[minStack.length - 1];
      result.push(minVal);
    }
  }

  return result;
}`,
      lineMap: { 1: 1, 2: 2, 3: 3, 4: 4, 6: 6, 7: 7, 8: 8, 10: 10, 11: 11, 12: 12, 13: 13, 14: 14, 15: 15, 16: 16, 17: 17, 18: 18, 19: 19, 20: 20, 21: 21, 22: 22, 23: 23, 27: 27 },
    },
    TypeScript: {
      code: `function simulateMinStack(operations: string[], values: (number | null)[]): (number | null)[] {
  const stack: number[] = [];
  const minStack: number[] = [];
  const result: (number | null)[] = [];

  for (let i = 0; i < operations.length; i++) {
    const op = operations[i]!;
    const val = values[i]!;

    if (op === 'push') {
      const minVal = minStack.length === 0 ? val : Math.min(val, minStack[minStack.length - 1]!);
      stack.push(val);
      minStack.push(minVal);
      result.push(null);
    } else if (op === 'pop') {
      stack.pop();
      minStack.pop();
      result.push(null);
    } else if (op === 'top') {
      const topVal = stack[stack.length - 1]!;
      result.push(topVal);
    } else if (op === 'getMin') {
      const minVal = minStack[minStack.length - 1]!;
      result.push(minVal);
    }
  }

  return result;
}`,
      lineMap: { 1: 1, 2: 2, 3: 3, 4: 4, 6: 6, 7: 7, 8: 8, 10: 10, 11: 11, 12: 12, 13: 13, 14: 14, 15: 15, 16: 16, 17: 17, 18: 18, 19: 19, 20: 20, 21: 21, 22: 22, 23: 23, 27: 27 },
    },
    Python: {
      code: `def simulateMinStack(operations: list[str], values: list[any]) -> list[any]:
    stack = []
    minStack = []
    result = []

    for i in range(len(operations)):
        op = operations[i]
        val = values[i]

        if op == 'push':
            minVal = val if len(minStack) == 0 else min(val, minStack[-1])
            stack.append(val)
            minStack.append(minVal)
            result.append(None)
        elif op == 'pop':
            stack.pop()
            minStack.pop()
            result.append(None)
        elif op == 'top':
            topVal = stack[-1]
            result.append(topVal)
        elif op == 'getMin':
            minVal = minStack[-1]
            result.append(minVal)

    return result`,
      lineMap: { 1: 1, 2: 2, 3: 3, 4: 4, 6: 6, 7: 7, 8: 8, 10: 10, 11: 11, 12: 12, 13: 13, 14: 14, 15: 15, 16: 16, 17: 17, 18: 18, 19: 19, 20: 20, 21: 21, 22: 22, 23: 23, 27: 25 },
    },
    Java: {
      code: `public List<Integer> simulateMinStack(String[] operations, Integer[] values) {
    Stack<Integer> stack = new Stack<>();
    Stack<Integer> minStack = new Stack<>();
    List<Integer> result = new ArrayList<>();

    for (int i = 0; i < operations.length; i++) {
        String op = operations[i];
        Integer val = values[i];

        if (op.equals("push")) {
            int minVal = minStack.isEmpty() ? val : Math.min(val, minStack.peek());
            stack.push(val);
            minStack.push(minVal);
            result.add(null);
        } else if (op.equals("pop")) {
            stack.pop();
            minStack.pop();
            result.add(null);
        } else if (op.equals("top")) {
            int topVal = stack.peek();
            result.add(topVal);
        } else if (op.equals("getMin")) {
            int minVal = minStack.peek();
            result.add(minVal);
        }
    }

    return result;
}`,
      lineMap: { 1: 1, 2: 2, 3: 3, 4: 4, 6: 6, 7: 7, 8: 8, 10: 10, 11: 11, 12: 12, 13: 13, 14: 14, 15: 15, 16: 16, 17: 17, 18: 18, 19: 19, 20: 20, 21: 21, 22: 22, 23: 23, 27: 27 },
    },
    'C++': {
      code: `vector<int> simulateMinStack(vector<string>& operations, vector<int>& values) {
    vector<int> stack;
    vector<int> minStack;
    vector<int> result;

    for (int i = 0; i < (int)operations.size(); i++) {
        string op = operations[i];
        int val = values[i];

        if (op == "push") {
            int minVal = minStack.empty() ? val : min(val, minStack.back());
            stack.push_back(val);
            minStack.push_back(minVal);
            result.push_back(0);
        } else if (op == "pop") {
            stack.pop_back();
            minStack.pop_back();
            result.push_back(0);
        } else if (op == "top") {
            int topVal = stack.back();
            result.push_back(topVal);
        } else if (op == "getMin") {
            int minVal = minStack.back();
            result.push_back(minVal);
        }
    }

    return result;
}`,
      lineMap: { 1: 1, 2: 2, 3: 3, 4: 4, 6: 6, 7: 7, 8: 8, 10: 10, 11: 11, 12: 12, 13: 13, 14: 14, 15: 15, 16: 16, 17: 17, 18: 18, 19: 19, 20: 20, 21: 21, 22: 22, 23: 23, 27: 27 },
    },
  },

  'evaluate-reverse-polish-notation': {
    JavaScript: {
      code: `function evalRPN(tokens) {
  const stack = [];

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    if (token === '+' || token === '-' || token === '*' || token === '/') {
      const b = stack.pop();
      const a = stack.pop();
      let res = 0;

      if (token === '+') res = a + b;
      else if (token === '-') res = a - b;
      else if (token === '*') res = a * b;
      else if (token === '/') res = Math.trunc(a / b);

      stack.push(res);
    } else {
      const num = Number(token);
      stack.push(num);
    }
  }

  const finalVal = stack.pop();
  return finalVal;
}`,
      lineMap: { 1: 1, 2: 2, 4: 4, 5: 5, 7: 7, 8: 8, 9: 9, 10: 10, 12: 12, 13: 13, 14: 14, 15: 15, 17: 17, 19: 19, 20: 20, 24: 24, 25: 25 },
    },
    TypeScript: {
      code: `function evalRPN(tokens: string[]): number {
  const stack: number[] = [];

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i]!;

    if (token === '+' || token === '-' || token === '*' || token === '/') {
      const b = stack.pop()!;
      const a = stack.pop()!;
      let res = 0;

      if (token === '+') res = a + b;
      else if (token === '-') res = a - b;
      else if (token === '*') res = a * b;
      else if (token === '/') res = Math.trunc(a / b);

      stack.push(res);
    } else {
      const num = Number(token);
      stack.push(num);
    }
  }

  const finalVal = stack.pop()!;
  return finalVal;
}`,
      lineMap: { 1: 1, 2: 2, 4: 4, 5: 5, 7: 7, 8: 8, 9: 9, 10: 10, 12: 12, 13: 13, 14: 14, 15: 15, 17: 17, 19: 19, 20: 20, 24: 24, 25: 25 },
    },
    Python: {
      code: `def evalRPN(tokens: list[str]) -> int:
    stack = []

    for i in range(len(tokens)):
        token = tokens[i]

        if token in '+-*/':
            b = stack.pop()
            a = stack.pop()
            res = 0

            if token == '+': res = a + b
            elif token == '-': res = a - b
            elif token == '*': res = a * b
            elif token == '/': res = int(a / b)

            stack.append(res)
        else:
            num = int(token)
            stack.append(num)

    finalVal = stack.pop()
    return finalVal`,
      lineMap: { 1: 1, 2: 2, 4: 4, 5: 5, 7: 7, 8: 8, 9: 9, 10: 10, 12: 12, 13: 13, 14: 14, 15: 15, 17: 17, 19: 19, 20: 20, 24: 22, 25: 23 },
    },
    Java: {
      code: `public int evalRPN(String[] tokens) {
    Stack<Integer> stack = new Stack<>();

    for (int i = 0; i < tokens.length; i++) {
        String token = tokens[i];

        if (token.equals("+") || token.equals("-") || token.equals("*") || token.equals("/")) {
            int b = stack.pop();
            int a = stack.pop();
            int res = 0;

            if (token.equals("+")) res = a + b;
            else if (token.equals("-")) res = a - b;
            else if (token.equals("*")) res = a * b;
            else if (token.equals("/")) res = a / b;

            stack.push(res);
        } else {
            int num = Integer.parseInt(token);
            stack.push(num);
        }
    }

    int finalVal = stack.pop();
    return finalVal;
}`,
      lineMap: { 1: 1, 2: 2, 4: 4, 5: 5, 7: 7, 8: 8, 9: 9, 10: 10, 12: 12, 13: 13, 14: 14, 15: 15, 17: 17, 19: 19, 20: 20, 24: 24, 25: 25 },
    },
    'C++': {
      code: `int evalRPN(vector<string>& tokens) {
    stack<int> stack;

    for (int i = 0; i < (int)tokens.size(); i++) {
        string token = tokens[i];

        if (token == "+" || token == "-" || token == "*" || token == "/") {
            int b = stack.top(); stack.pop();
            int a = stack.top(); stack.pop();
            int res = 0;

            if (token == "+") res = a + b;
            else if (token == "-") res = a - b;
            else if (token == "*") res = a * b;
            else if (token == "/") res = a / b;

            stack.push(res);
        } else {
            int num = stoi(token);
            stack.push(num);
        }
    }

    int finalVal = stack.top(); stack.pop();
    return finalVal;
}`,
      lineMap: { 1: 1, 2: 2, 4: 4, 5: 5, 7: 7, 8: 8, 9: 9, 10: 10, 12: 12, 13: 13, 14: 14, 15: 15, 17: 17, 19: 19, 20: 20, 24: 24, 25: 25 },
    },
  },

  'basic-calculator': {
    JavaScript: {
      code: `function calculate(s) {
  const stack = [];
  let currentNumber = 0;
  let result = 0;
  let sign = 1;

  for (let i = 0; i < s.length; i++) {
    const char = s[i];

    if (char >= '0' && char <= '9') {
      currentNumber = currentNumber * 10 + Number(char);
    } else if (char === '+') {
      result += sign * currentNumber;
      currentNumber = 0;
      sign = 1;
    } else if (char === '-') {
      result += sign * currentNumber;
      currentNumber = 0;
      sign = -1;
    } else if (char === '(') {
      stack.push(result);
      stack.push(sign);
      result = 0;
      sign = 1;
    } else if (char === ')') {
      result += sign * currentNumber;
      currentNumber = 0;
      const prevSign = stack.pop();
      const prevResult = stack.pop();
      result = prevResult + prevSign * result;
    }
  }

  result += sign * currentNumber;
  return result;
}`,
      lineMap: { 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 7: 7, 8: 8, 10: 10, 11: 11, 12: 12, 13: 13, 14: 14, 15: 15, 16: 16, 17: 17, 18: 18, 19: 19, 20: 20, 21: 21, 22: 22, 23: 23, 24: 24, 25: 25, 26: 26, 27: 27, 28: 28, 29: 29, 33: 33, 34: 34 },
    },
    TypeScript: {
      code: `function calculate(s: string): number {
  const stack: number[] = [];
  let currentNumber = 0;
  let result = 0;
  let sign = 1;

  for (let i = 0; i < s.length; i++) {
    const char = s[i]!;

    if (char >= '0' && char <= '9') {
      currentNumber = currentNumber * 10 + Number(char);
    } else if (char === '+') {
      result += sign * currentNumber;
      currentNumber = 0;
      sign = 1;
    } else if (char === '-') {
      result += sign * currentNumber;
      currentNumber = 0;
      sign = -1;
    } else if (char === '(') {
      stack.push(result);
      stack.push(sign);
      result = 0;
      sign = 1;
    } else if (char === ')') {
      result += sign * currentNumber;
      currentNumber = 0;
      const prevSign = stack.pop()!;
      const prevResult = stack.pop()!;
      result = prevResult + prevSign * result;
    }
  }

  result += sign * currentNumber;
  return result;
}`,
      lineMap: { 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 7: 7, 8: 8, 10: 10, 11: 11, 12: 12, 13: 13, 14: 14, 15: 15, 16: 16, 17: 17, 18: 18, 19: 19, 20: 20, 21: 21, 22: 22, 23: 23, 24: 24, 25: 25, 26: 26, 27: 27, 28: 28, 29: 29, 33: 33, 34: 34 },
    },
    Python: {
      code: `def calculate(s: str) -> int:
    stack = []
    currentNumber = 0
    result = 0
    sign = 1

    for i in range(len(s)):
        char = s[i]

        if '0' <= char <= '9':
            currentNumber = currentNumber * 10 + int(char)
        elif char == '+':
            result += sign * currentNumber
            currentNumber = 0
            sign = 1
        elif char == '-':
            result += sign * currentNumber
            currentNumber = 0
            sign = -1
        elif char == '(':
            stack.append(result)
            stack.append(sign)
            result = 0
            sign = 1
        elif char == ')':
            result += sign * currentNumber
            currentNumber = 0
            prevSign = stack.pop()
            prevResult = stack.pop()
            result = prevResult + prevSign * result

    result += sign * currentNumber
    return result`,
      lineMap: { 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 7: 7, 8: 8, 10: 10, 11: 11, 12: 12, 13: 13, 14: 14, 15: 15, 16: 16, 17: 17, 18: 18, 19: 19, 20: 20, 21: 21, 22: 22, 23: 23, 24: 24, 25: 25, 26: 26, 27: 27, 28: 28, 29: 29, 33: 31, 34: 32 },
    },
    Java: {
      code: `public int calculate(String s) {
    Stack<Integer> stack = new Stack<>();
    int currentNumber = 0;
    int result = 0;
    int sign = 1;

    for (int i = 0; i < s.length(); i++) {
        char char = s.charAt(i);

        if (char >= '0' && char <= '9') {
            currentNumber = currentNumber * 10 + (char - '0');
        } else if (char == '+') {
            result += sign * currentNumber;
            currentNumber = 0;
            sign = 1;
        } else if (char == '-') {
            result += sign * currentNumber;
            currentNumber = 0;
            sign = -1;
        } else if (char == '(') {
            stack.push(result);
            stack.push(sign);
            result = 0;
            sign = 1;
        } else if (char == ')') {
            result += sign * currentNumber;
            currentNumber = 0;
            int prevSign = stack.pop();
            int prevResult = stack.pop();
            result = prevResult + prevSign * result;
        }
    }

    result += sign * currentNumber;
    return result;
}`,
      lineMap: { 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 7: 7, 8: 8, 10: 10, 11: 11, 12: 12, 13: 13, 14: 14, 15: 15, 16: 16, 17: 17, 18: 18, 19: 19, 20: 20, 21: 21, 22: 22, 23: 23, 24: 24, 25: 25, 26: 26, 27: 27, 28: 28, 29: 29, 33: 33, 34: 34 },
    },
    'C++': {
      code: `int calculate(string s) {
    stack<int> stack;
    long long currentNumber = 0;
    long long result = 0;
    int sign = 1;

    for (int i = 0; i < (int)s.size(); i++) {
        char char = s[i];

        if (char >= '0' && char <= '9') {
            currentNumber = currentNumber * 10 + (char - '0');
        } else if (char == '+') {
            result += sign * currentNumber;
            currentNumber = 0;
            sign = 1;
        } else if (char == '-') {
            result += sign * currentNumber;
            currentNumber = 0;
            sign = -1;
        } else if (char == '(') {
            stack.push((int)result);
            stack.push(sign);
            result = 0;
            sign = 1;
        } else if (char == ')') {
            result += sign * currentNumber;
            currentNumber = 0;
            int prevSign = stack.top(); stack.pop();
            int prevResult = stack.top(); stack.pop();
            result = prevResult + prevSign * result;
        }
    }

    result += sign * currentNumber;
    return (int)result;
}`,
      lineMap: { 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 7: 7, 8: 8, 10: 10, 11: 11, 12: 12, 13: 13, 14: 14, 15: 15, 16: 16, 17: 17, 18: 18, 19: 19, 20: 20, 21: 21, 22: 22, 23: 23, 24: 24, 25: 25, 26: 26, 27: 27, 28: 28, 29: 29, 33: 33, 34: 34 },
    },
  },

  'linked-list-cycle': {
    JavaScript: {
      code: `function hasCycle(head) {
  let slow = head;
  let fast = head;

  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;

    if (slow === fast) {
      return true;
    }
  }

  return false;
}`,
      lineMap: { 1: 1, 2: 2, 3: 3, 5: 5, 6: 6, 7: 7, 9: 9, 10: 10, 14: 14 },
    },
    TypeScript: {
      code: `function hasCycle(head: ListNode | null): boolean {
  let slow = head;
  let fast = head;

  while (fast !== null && fast.next !== null) {
    slow = slow!.next;
    fast = fast.next.next;

    if (slow === fast) {
      return true;
    }
  }

  return false;
}`,
      lineMap: { 1: 1, 2: 2, 3: 3, 5: 5, 6: 6, 7: 7, 9: 9, 10: 10, 14: 14 },
    },
    Python: {
      code: `def hasCycle(head: Optional[ListNode]) -> bool:
    slow = head
    fast = head

    while fast is not None and fast.next is not None:
        slow = slow.next
        fast = fast.next.next

        if slow == fast:
            return True

    return False`,
      lineMap: { 1: 1, 2: 2, 3: 3, 5: 5, 6: 6, 7: 7, 9: 9, 10: 10, 14: 12 },
    },
    Java: {
      code: `public boolean hasCycle(ListNode head) {
    ListNode slow = head;
    ListNode fast = head;

    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;

        if (slow == fast) {
            return true;
        }
    }

    return false;
}`,
      lineMap: { 1: 1, 2: 2, 3: 3, 5: 5, 6: 6, 7: 7, 9: 9, 10: 10, 14: 14 },
    },
    'C++': {
      code: `bool hasCycle(ListNode* head) {
    ListNode* slow = head;
    ListNode* fast = head;

    while (fast != nullptr && fast->next != nullptr) {
        slow = slow->next;
        fast = fast->next->next;

        if (slow == fast) {
            return true;
        }
    }

    return false;
}`,
      lineMap: { 1: 1, 2: 2, 3: 3, 5: 5, 6: 6, 7: 7, 9: 9, 10: 10, 14: 14 },
    },
  },

  'add-two-numbers': {
    JavaScript: {
      code: `function addTwoNumbers(l1, l2) {
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

    curr.next = { val: digit, next: null };
    curr = curr.next;

    if (p !== null) p = p.next;
    if (q !== null) q = q.next;
  }

  return dummyHead.next;
}`,
      lineMap: { 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 8: 8, 9: 9, 10: 10, 11: 11, 12: 12, 13: 13, 15: 15, 16: 16, 18: 18, 19: 19, 22: 22 },
    },
    TypeScript: {
      code: `function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  const dummyHead = new ListNode(0);
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

    curr.next = new ListNode(digit);
    curr = curr.next;

    if (p !== null) p = p.next;
    if (q !== null) q = q.next;
  }

  return dummyHead.next;
}`,
      lineMap: { 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 8: 8, 9: 9, 10: 10, 11: 11, 12: 12, 13: 13, 15: 15, 16: 16, 18: 18, 19: 19, 22: 22 },
    },
    Python: {
      code: `def addTwoNumbers(l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
    dummyHead = ListNode(0)
    curr = dummyHead
    p = l1
    q = l2
    carry = 0

    while p is not None or q is not None or carry != 0:
        x = p.val if p is not None else 0
        y = q.val if q is not None else 0
        sum = carry + x + y
        carry = sum // 10
        digit = sum % 10

        curr.next = ListNode(digit)
        curr = curr.next

        if p is not None: p = p.next
        if q is not None: q = q.next

    return dummyHead.next`,
      lineMap: { 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 8: 8, 9: 9, 10: 10, 11: 11, 12: 12, 13: 13, 15: 15, 16: 16, 18: 18, 19: 19, 22: 21 },
    },
    Java: {
      code: `public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
    ListNode dummyHead = new ListNode(0);
    ListNode curr = dummyHead;
    ListNode p = l1, q = l2;
    int carry = 0;

    while (p != null || q != null || carry != 0) {
        int x = (p != null) ? p.val : 0;
        int y = (q != null) ? q.val : 0;
        int sum = carry + x + y;
        carry = sum / 10;
        int digit = sum % 10;

        curr.next = new ListNode(digit);
        curr = curr.next;

        if (p != null) p = p.next;
        if (q != null) q = q.next;
    }

    return dummyHead.next;
}`,
      lineMap: { 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 5, 8: 7, 9: 8, 10: 9, 11: 10, 12: 11, 13: 12, 15: 14, 16: 15, 18: 17, 19: 18, 22: 21 },
    },
    'C++': {
      code: `ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
    ListNode dummyHead(0);
    ListNode* curr = &dummyHead;
    ListNode* p = l1;
    ListNode* q = l2;
    int carry = 0;

    while (p != nullptr || q != nullptr || carry != 0) {
        int x = p ? p->val : 0;
        int y = q ? q->val : 0;
        int sum = carry + x + y;
        carry = sum / 10;
        int digit = sum % 10;

        curr->next = new ListNode(digit);
        curr = curr->next;

        if (p) p = p->next;
        if (q) q = q->next;
    }

    return dummyHead.next;
}`,
      lineMap: { 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 8: 8, 9: 9, 10: 10, 11: 11, 12: 12, 13: 13, 15: 15, 16: 16, 18: 18, 19: 19, 22: 22 },
    },
  },

  'merge-two-sorted-lists': {
    JavaScript: {
      code: `function mergeTwoLists(list1, list2) {
  const dummyHead = { val: -1, next: null };
  let curr = dummyHead;

  while (list1 !== null && list2 !== null) {
    if (list1.val <= list2.val) {
      curr.next = list1;
      list1 = list1.next;
    } else {
      curr.next = list2;
      list2 = list2.next;
    }
    curr = curr.next;
  }

  if (list1 !== null) {
    curr.next = list1;
  } else if (list2 !== null) {
    curr.next = list2;
  }

  return dummyHead.next;
}`,
      lineMap: { 1: 1, 2: 2, 3: 3, 5: 5, 6: 6, 7: 7, 8: 8, 10: 10, 11: 11, 13: 13, 16: 16, 17: 17, 18: 18, 19: 19, 22: 22 },
    },
    TypeScript: {
      code: `function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
  const dummyHead = new ListNode(-1);
  let curr = dummyHead;

  while (list1 !== null && list2 !== null) {
    if (list1.val <= list2.val) {
      curr.next = list1;
      list1 = list1.next;
    } else {
      curr.next = list2;
      list2 = list2.next;
    }
    curr = curr.next;
  }

  if (list1 !== null) {
    curr.next = list1;
  } else if (list2 !== null) {
    curr.next = list2;
  }

  return dummyHead.next;
}`,
      lineMap: { 1: 1, 2: 2, 3: 3, 5: 5, 6: 6, 7: 7, 8: 8, 10: 10, 11: 11, 13: 13, 16: 16, 17: 17, 18: 18, 19: 19, 22: 22 },
    },
    Python: {
      code: `def mergeTwoLists(list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:
    dummyHead = ListNode(-1)
    curr = dummyHead

    while list1 is not None and list2 is not None:
        if list1.val <= list2.val:
            curr.next = list1
            list1 = list1.next
        else:
            curr.next = list2
            list2 = list2.next
        curr = curr.next

    if list1 is not None:
        curr.next = list1
    elif list2 is not None:
        curr.next = list2

    return dummyHead.next`,
      lineMap: { 1: 1, 2: 2, 3: 3, 5: 5, 6: 6, 7: 7, 8: 8, 10: 10, 11: 11, 13: 12, 16: 14, 17: 15, 18: 16, 19: 17, 22: 19 },
    },
    Java: {
      code: `public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
    ListNode dummyHead = new ListNode(-1);
    ListNode curr = dummyHead;

    while (list1 != null && list2 != null) {
        if (list1.val <= list2.val) {
            curr.next = list1;
            list1 = list1.next;
        } else {
            curr.next = list2;
            list2 = list2.next;
        }
        curr = curr.next;
    }

    if (list1 != null) {
        curr.next = list1;
    } else if (list2 != null) {
        curr.next = list2;
    }

    return dummyHead.next;
}`,
      lineMap: { 1: 1, 2: 2, 3: 3, 5: 5, 6: 6, 7: 7, 8: 8, 10: 10, 11: 11, 13: 13, 16: 16, 17: 17, 18: 18, 19: 19, 22: 22 },
    },
    'C++': {
      code: `ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
    ListNode dummyHead(-1);
    ListNode* curr = &dummyHead;

    while (list1 != nullptr && list2 != nullptr) {
        if (list1->val <= list2->val) {
            curr->next = list1;
            list1 = list1->next;
        } else {
            curr->next = list2;
            list2 = list2->next;
        }
        curr = curr->next;
    }

    if (list1 != nullptr) {
        curr->next = list1;
    } else if (list2 != nullptr) {
        curr->next = list2;
    }

    return dummyHead.next;
}`,
      lineMap: { 1: 1, 2: 2, 3: 3, 5: 5, 6: 6, 7: 7, 8: 8, 10: 10, 11: 11, 13: 13, 16: 16, 17: 17, 18: 18, 19: 19, 22: 22 },
    },
  },

  'copy-list-with-random-pointer': {
    JavaScript: {
      code: `function copyRandomList(head) {
  if (head === null) return null;

  const map = new Map();

  let curr = head;
  while (curr !== null) {
    map.set(curr, { val: curr.val, next: null, random: null });
    curr = curr.next;
  }

  curr = head;
  while (curr !== null) {
    const copyNode = map.get(curr);
    copyNode.next = curr.next !== null ? map.get(curr.next) : null;
    copyNode.random = curr.random !== null ? map.get(curr.random) : null;
    curr = curr.next;
  }

  return map.get(head);
}`,
      lineMap: { 1: 1, 2: 2, 4: 4, 6: 6, 7: 7, 8: 8, 9: 9, 12: 12, 13: 13, 14: 14, 15: 15, 16: 16, 17: 17, 20: 20 },
    },
    TypeScript: {
      code: `function copyRandomList(head: Node | null): Node | null {
  if (head === null) return null;

  const map = new Map<Node, Node>();

  let curr: Node | null = head;
  while (curr !== null) {
    map.set(curr, new Node(curr.val));
    curr = curr.next;
  }

  curr = head;
  while (curr !== null) {
    const copyNode = map.get(curr)!;
    copyNode.next = curr.next !== null ? map.get(curr.next)! : null;
    copyNode.random = curr.random !== null ? map.get(curr.random)! : null;
    curr = curr.next;
  }

  return map.get(head)!;
}`,
      lineMap: { 1: 1, 2: 2, 4: 4, 6: 6, 7: 7, 8: 8, 9: 9, 12: 12, 13: 13, 14: 14, 15: 15, 16: 16, 17: 17, 20: 20 },
    },
    Python: {
      code: `def copyRandomList(head: 'Optional[Node]') -> 'Optional[Node]':
    if head is None: return None

    map = {}

    curr = head
    while curr is not None:
        map[curr] = Node(curr.val)
        curr = curr.next

    curr = head
    while curr is not None:
        copyNode = map[curr]
        copyNode.next = map.get(curr.next)
        copyNode.random = map.get(curr.random)
        curr = curr.next

    return map[head]`,
      lineMap: { 1: 1, 2: 2, 4: 4, 6: 6, 7: 7, 8: 8, 9: 9, 12: 11, 13: 12, 14: 13, 15: 14, 16: 15, 17: 16, 20: 18 },
    },
    Java: {
      code: `public Node copyRandomList(Node head) {
    if (head == null) return null;

    Map<Node, Node> map = new HashMap<>();

    Node curr = head;
    while (curr != null) {
        map.put(curr, new Node(curr.val));
        curr = curr.next;
    }

    curr = head;
    while (curr != null) {
        Node copyNode = map.get(curr);
        copyNode.next = map.get(curr.next);
        copyNode.random = map.get(curr.random);
        curr = curr.next;
    }

    return map.get(head);
}`,
      lineMap: { 1: 1, 2: 2, 4: 4, 6: 6, 7: 7, 8: 8, 9: 9, 12: 12, 13: 13, 14: 14, 15: 15, 16: 16, 17: 17, 20: 20 },
    },
    'C++': {
      code: `Node* copyRandomList(Node* head) {
    if (!head) return nullptr;

    unordered_map<Node*, Node*> map;

    Node* curr = head;
    while (curr) {
        map[curr] = new Node(curr->val);
        curr = curr->next;
    }

    curr = head;
    while (curr) {
        Node* copyNode = map[curr];
        copyNode->next = map[curr->next];
        copyNode->random = map[curr->random];
        curr = curr->next;
    }

    return map[head];
}`,
      lineMap: { 1: 1, 2: 2, 4: 4, 6: 6, 7: 7, 8: 8, 9: 9, 12: 12, 13: 13, 14: 14, 15: 15, 16: 16, 17: 17, 20: 20 },
    },
  },

  'reverse-linked-list-ii': {
    JavaScript: {
      code: `function reverseBetween(head, left, right) {
  if (head === null || left === right) return head;

  const dummyHead = { val: 0, next: head };
  let prev = dummyHead;

  for (let i = 1; i < left; i++) {
    prev = prev.next;
  }

  let curr = prev.next;

  for (let i = 0; i < right - left; i++) {
    const temp = curr.next;
    curr.next = temp.next;
    temp.next = prev.next;
    prev.next = temp;
  }

  return dummyHead.next;
}`,
      lineMap: { 1: 1, 2: 2, 4: 4, 5: 5, 7: 7, 8: 8, 11: 11, 13: 13, 14: 14, 15: 15, 16: 16, 17: 17, 20: 20 },
    },
    TypeScript: {
      code: `function reverseBetween(head: ListNode | null, left: number, right: number): ListNode | null {
  if (head === null || left === right) return head;

  const dummyHead = new ListNode(0, head);
  let prev = dummyHead;

  for (let i = 1; i < left; i++) {
    prev = prev.next!;
  }

  let curr = prev.next!;

  for (let i = 0; i < right - left; i++) {
    const temp = curr.next!;
    curr.next = temp.next;
    temp.next = prev.next;
    prev.next = temp;
  }

  return dummyHead.next;
}`,
      lineMap: { 1: 1, 2: 2, 4: 4, 5: 5, 7: 7, 8: 8, 11: 11, 13: 13, 14: 14, 15: 15, 16: 16, 17: 17, 20: 20 },
    },
    Python: {
      code: `def reverseBetween(head: Optional[ListNode], left: int, right: int) -> Optional[ListNode]:
    if head is None or left == right: return head

    dummyHead = ListNode(0, head)
    prev = dummyHead

    for i in range(1, left):
        prev = prev.next

    curr = prev.next

    for i in range(right - left):
        temp = curr.next
        curr.next = temp.next
        temp.next = prev.next
        prev.next = temp

    return dummyHead.next`,
      lineMap: { 1: 1, 2: 2, 4: 4, 5: 5, 7: 7, 8: 8, 11: 10, 13: 12, 14: 13, 15: 14, 16: 15, 17: 16, 20: 18 },
    },
    Java: {
      code: `public ListNode reverseBetween(ListNode head, int left, int right) {
    if (head == null || left == right) return head;

    ListNode dummyHead = new ListNode(0, head);
    ListNode prev = dummyHead;

    for (int i = 1; i < left; i++) {
        prev = prev.next;
    }

    ListNode curr = prev.next;

    for (int i = 0; i < right - left; i++) {
        ListNode temp = curr.next;
        curr.next = temp.next;
        temp.next = prev.next;
        prev.next = temp;
    }

    return dummyHead.next;
}`,
      lineMap: { 1: 1, 2: 2, 4: 4, 5: 5, 7: 7, 8: 8, 11: 11, 13: 13, 14: 14, 15: 15, 16: 16, 17: 17, 20: 20 },
    },
    'C++': {
      code: `ListNode* reverseBetween(ListNode* head, int left, int right) {
    if (!head || left == right) return head;

    ListNode dummyHead(0, head);
    ListNode* prev = &dummyHead;

    for (int i = 1; i < left; i++) {
        prev = prev->next;
    }

    ListNode* curr = prev->next;

    for (int i = 0; i < right - left; i++) {
        ListNode* temp = curr->next;
        curr->next = temp->next;
        temp->next = prev->next;
        prev->next = temp;
    }

    return dummyHead.next;
}`,
      lineMap: { 1: 1, 2: 2, 4: 4, 5: 5, 7: 7, 8: 8, 11: 11, 13: 13, 14: 14, 15: 15, 16: 16, 17: 17, 20: 20 },
    },
  },

  'reverse-nodes-in-k-group': {
    JavaScript: {
      code: `function reverseKGroup(head, k) {
  if (head === null || k === 1) return head;

  const dummyHead = { val: 0, next: head };
  let groupPrev = dummyHead;

  while (true) {
    let kth = groupPrev;
    for (let i = 0; i < k && kth !== null; i++) {
      kth = kth.next;
    }
    if (kth === null) break;

    const groupNext = kth.next;
    let prev = groupNext;
    let curr = groupPrev.next;

    while (curr !== groupNext) {
      const temp = curr.next;
      curr.next = prev;
      prev = curr;
      curr = temp;
    }

    const tempTail = groupPrev.next;
    groupPrev.next = kth;
    groupPrev = tempTail;
  }

  return dummyHead.next;
}`,
      lineMap: { 1: 1, 2: 2, 4: 4, 5: 5, 7: 7, 8: 8, 9: 9, 10: 10, 12: 12, 14: 14, 15: 15, 16: 16, 18: 18, 19: 19, 20: 20, 21: 21, 22: 22, 25: 25, 26: 26, 27: 27, 30: 30 },
    },
    TypeScript: {
      code: `function reverseKGroup(head: ListNode | null, k: number): ListNode | null {
  if (head === null || k === 1) return head;

  const dummyHead = new ListNode(0, head);
  let groupPrev: ListNode = dummyHead;

  while (true) {
    let kth: ListNode | null = groupPrev;
    for (let i = 0; i < k && kth !== null; i++) {
      kth = kth.next;
    }
    if (kth === null) break;

    const groupNext = kth.next;
    let prev = groupNext;
    let curr = groupPrev.next;

    while (curr !== groupNext && curr !== null) {
      const temp = curr.next;
      curr.next = prev;
      prev = curr;
      curr = temp;
    }

    const tempTail = groupPrev.next!;
    groupPrev.next = kth;
    groupPrev = tempTail;
  }

  return dummyHead.next;
}`,
      lineMap: { 1: 1, 2: 2, 4: 4, 5: 5, 7: 7, 8: 8, 9: 9, 10: 10, 12: 12, 14: 14, 15: 15, 16: 16, 18: 18, 19: 19, 20: 20, 21: 21, 22: 22, 25: 25, 26: 26, 27: 27, 30: 30 },
    },
    Python: {
      code: `def reverseKGroup(head: Optional[ListNode], k: int) -> Optional[ListNode]:
    if head is None or k == 1: return head

    dummyHead = ListNode(0, head)
    groupPrev = dummyHead

    while True:
        kth = groupPrev
        for i in range(k):
            kth = kth.next if kth else None
        if kth is None: break

        groupNext = kth.next
        prev = groupNext
        curr = groupPrev.next

        while curr != groupNext:
            temp = curr.next
            curr.next = prev
            prev = curr
            curr = temp

        tempTail = groupPrev.next
        groupPrev.next = kth
        groupPrev = tempTail

    return dummyHead.next`,
      lineMap: { 1: 1, 2: 2, 4: 4, 5: 5, 7: 7, 8: 8, 9: 9, 10: 10, 12: 11, 14: 13, 15: 14, 16: 15, 18: 17, 19: 18, 20: 19, 21: 20, 22: 21, 25: 23, 26: 24, 27: 25, 30: 27 },
    },
    Java: {
      code: `public ListNode reverseKGroup(ListNode head, int k) {
    if (head == null || k == 1) return head;

    ListNode dummyHead = new ListNode(0, head);
    ListNode groupPrev = dummyHead;

    while (true) {
        ListNode kth = groupPrev;
        for (int i = 0; i < k && kth != null; i++) {
            kth = kth.next;
        }
        if (kth == null) break;

        ListNode groupNext = kth.next;
        ListNode prev = groupNext;
        ListNode curr = groupPrev.next;

        while (curr != groupNext) {
            ListNode temp = curr.next;
            curr.next = prev;
            prev = curr;
            curr = temp;
        }

        ListNode tempTail = groupPrev.next;
        groupPrev.next = kth;
        groupPrev = tempTail;
    }

    return dummyHead.next;
}`,
      lineMap: { 1: 1, 2: 2, 4: 4, 5: 5, 7: 7, 8: 8, 9: 9, 10: 10, 12: 12, 14: 14, 15: 15, 16: 16, 18: 18, 19: 19, 20: 20, 21: 21, 22: 22, 25: 25, 26: 26, 27: 27, 30: 30 },
    },
    'C++': {
      code: `ListNode* reverseKGroup(ListNode* head, int k) {
    if (!head || k == 1) return head;

    ListNode dummyHead(0, head);
    ListNode* groupPrev = &dummyHead;

    while (true) {
        ListNode* kth = groupPrev;
        for (int i = 0; i < k && kth != nullptr; i++) {
            kth = kth->next;
        }
        if (kth == nullptr) break;

        ListNode* groupNext = kth->next;
        ListNode* prev = groupNext;
        ListNode* curr = groupPrev->next;

        while (curr != groupNext) {
            ListNode* temp = curr->next;
            curr->next = prev;
            prev = curr;
            curr = temp;
        }

        ListNode* tempTail = groupPrev->next;
        groupPrev->next = kth;
        groupPrev = tempTail;
    }

    return dummyHead.next;
}`,
      lineMap: { 1: 1, 2: 2, 4: 4, 5: 5, 7: 7, 8: 8, 9: 9, 10: 10, 12: 12, 14: 14, 15: 15, 16: 16, 18: 18, 19: 19, 20: 20, 21: 21, 22: 22, 25: 25, 26: 26, 27: 27, 30: 30 },
    },
  },

  'remove-nth-node-from-end-of-list': {
    JavaScript: {
      code: `function removeNthFromEnd(head, n) {
  const dummyHead = { val: 0, next: head };
  let fast = dummyHead;
  let slow = dummyHead;

  for (let i = 0; i <= n; i++) {
    fast = fast.next;
  }

  while (fast !== null) {
    slow = slow.next;
    fast = fast.next;
  }

  slow.next = slow.next.next;
  return dummyHead.next;
}`,
      lineMap: { 1: 1, 2: 2, 3: 3, 4: 4, 6: 6, 7: 7, 10: 10, 11: 11, 12: 12, 15: 15, 16: 16 },
    },
    TypeScript: {
      code: `function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  const dummyHead = new ListNode(0, head);
  let fast: ListNode | null = dummyHead;
  let slow: ListNode = dummyHead;

  for (let i = 0; i <= n; i++) {
    fast = fast!.next;
  }

  while (fast !== null) {
    slow = slow.next!;
    fast = fast.next;
  }

  slow.next = slow.next!.next;
  return dummyHead.next;
}`,
      lineMap: { 1: 1, 2: 2, 3: 3, 4: 4, 6: 6, 7: 7, 10: 10, 11: 11, 12: 12, 15: 15, 16: 16 },
    },
    Python: {
      code: `def removeNthFromEnd(head: Optional[ListNode], n: int) -> Optional[ListNode]:
    dummyHead = ListNode(0, head)
    fast = dummyHead
    slow = dummyHead

    for i in range(n + 1):
        fast = fast.next

    while fast is not None:
        slow = slow.next
        fast = fast.next

    slow.next = slow.next.next
    return dummyHead.next`,
      lineMap: { 1: 1, 2: 2, 3: 3, 4: 4, 6: 6, 7: 7, 10: 9, 11: 10, 12: 11, 15: 13, 16: 14 },
    },
    Java: {
      code: `public ListNode removeNthFromEnd(ListNode head, int n) {
    ListNode dummyHead = new ListNode(0, head);
    ListNode fast = dummyHead;
    ListNode slow = dummyHead;

    for (int i = 0; i <= n; i++) {
        fast = fast.next;
    }

    while (fast != null) {
        slow = slow.next;
        fast = fast.next;
    }

    slow.next = slow.next.next;
    return dummyHead.next;
}`,
      lineMap: { 1: 1, 2: 2, 3: 3, 4: 4, 6: 6, 7: 7, 10: 10, 11: 11, 12: 12, 15: 15, 16: 16 },
    },
    'C++': {
      code: `ListNode* removeNthFromEnd(ListNode* head, int n) {
    ListNode dummyHead(0, head);
    ListNode* fast = &dummyHead;
    ListNode* slow = &dummyHead;

    for (int i = 0; i <= n; i++) {
        fast = fast->next;
    }

    while (fast != nullptr) {
        slow = slow->next;
        fast = fast->next;
    }

    slow->next = slow->next->next;
    return dummyHead.next;
}`,
      lineMap: { 1: 1, 2: 2, 3: 3, 4: 4, 6: 6, 7: 7, 10: 10, 11: 11, 12: 12, 15: 15, 16: 16 },
    },
  },

  'remove-duplicates-from-sorted-list-ii': {
    JavaScript: {
      code: `function deleteDuplicates(head) {
  const sentinel = { val: 0, next: head };
  let pred = sentinel;

  while (head !== null) {
    if (head.next !== null && head.val === head.next.val) {
      while (head.next !== null && head.val === head.next.val) {
        head = head.next;
      }
      pred.next = head.next;
    } else {
      pred = pred.next;
    }
    head = head.next;
  }

  return sentinel.next;
}`,
      lineMap: { 1: 1, 2: 2, 3: 3, 5: 5, 6: 6, 7: 7, 8: 8, 10: 10, 12: 12, 14: 14, 17: 17 },
    },
    TypeScript: {
      code: `function deleteDuplicates(head: ListNode | null): ListNode | null {
  const sentinel = new ListNode(0, head);
  let pred: ListNode = sentinel;

  while (head !== null) {
    if (head.next !== null && head.val === head.next.val) {
      while (head.next !== null && head.val === head.next.val) {
        head = head.next;
      }
      pred.next = head.next;
    } else {
      pred = pred.next!;
    }
    head = head.next;
  }

  return sentinel.next;
}`,
      lineMap: { 1: 1, 2: 2, 3: 3, 5: 5, 6: 6, 7: 7, 8: 8, 10: 10, 12: 12, 14: 14, 17: 17 },
    },
    Python: {
      code: `def deleteDuplicates(head: Optional[ListNode]) -> Optional[ListNode]:
    sentinel = ListNode(0, head)
    pred = sentinel

    while head is not None:
        if head.next is not None and head.val == head.next.val:
            while head.next is not None and head.val == head.next.val:
                head = head.next
            pred.next = head.next
        else:
            pred = pred.next
        head = head.next

    return sentinel.next`,
      lineMap: { 1: 1, 2: 2, 3: 3, 5: 5, 6: 6, 7: 7, 8: 8, 10: 9, 12: 11, 14: 12, 17: 14 },
    },
    Java: {
      code: `public ListNode deleteDuplicates(ListNode head) {
    ListNode sentinel = new ListNode(0, head);
    ListNode pred = sentinel;

    while (head != null) {
        if (head.next != null && head.val == head.next.val) {
            while (head.next != null && head.val == head.next.val) {
                head = head.next;
            }
            pred.next = head.next;
        } else {
            pred = pred.next;
        }
        head = head.next;
    }

    return sentinel.next;
}`,
      lineMap: { 1: 1, 2: 2, 3: 3, 5: 5, 6: 6, 7: 7, 8: 8, 10: 10, 12: 12, 14: 14, 17: 17 },
    },
    'C++': {
      code: `ListNode* deleteDuplicates(ListNode* head) {
    ListNode sentinel(0, head);
    ListNode* pred = &sentinel;

    while (head != nullptr) {
        if (head->next != nullptr && head->val == head->next->val) {
            while (head->next != nullptr && head->val == head->next->val) {
                head = head->next;
            }
            pred->next = head->next;
        } else {
            pred = pred->next;
        }
        head = head->next;
    }

    return sentinel.next;
}`,
      lineMap: { 1: 1, 2: 2, 3: 3, 5: 5, 6: 6, 7: 7, 8: 8, 10: 10, 12: 12, 14: 14, 17: 17 },
    },
  },

  'rotate-list': {
    JavaScript: {
      code: `function rotateRight(head, k) {
  if (head === null || head.next === null || k === 0) return head;

  let length = 1;
  let oldTail = head;
  while (oldTail.next !== null) {
    oldTail = oldTail.next;
    length++;
  }

  const effectiveK = k % length;
  if (effectiveK === 0) return head;

  oldTail.next = head;

  let newTail = head;
  for (let i = 0; i < length - effectiveK - 1; i++) {
    newTail = newTail.next;
  }

  const newHead = newTail.next;
  newTail.next = null;

  return newHead;
}`,
      lineMap: { 1: 1, 2: 2, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 11: 11, 12: 12, 14: 14, 16: 16, 17: 17, 18: 18, 21: 21, 22: 22, 24: 24 },
    },
    TypeScript: {
      code: `function rotateRight(head: ListNode | null, k: number): ListNode | null {
  if (head === null || head.next === null || k === 0) return head;

  let length = 1;
  let oldTail: ListNode = head;
  while (oldTail.next !== null) {
    oldTail = oldTail.next;
    length++;
  }

  const effectiveK = k % length;
  if (effectiveK === 0) return head;

  oldTail.next = head;

  let newTail: ListNode = head;
  for (let i = 0; i < length - effectiveK - 1; i++) {
    newTail = newTail.next!;
  }

  const newHead = newTail.next;
  newTail.next = null;

  return newHead;
}`,
      lineMap: { 1: 1, 2: 2, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 11: 11, 12: 12, 14: 14, 16: 16, 17: 17, 18: 18, 21: 21, 22: 22, 24: 24 },
    },
    Python: {
      code: `def rotateRight(head: Optional[ListNode], k: int) -> Optional[ListNode]:
    if head is None or head.next is None or k == 0: return head

    length = 1
    oldTail = head
    while oldTail.next is not None:
        oldTail = oldTail.next
        length += 1

    effectiveK = k % length
    if effectiveK == 0: return head

    oldTail.next = head

    newTail = head
    for i in range(length - effectiveK - 1):
        newTail = newTail.next

    newHead = newTail.next
    newTail.next = None

    return newHead`,
      lineMap: { 1: 1, 2: 2, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 11: 10, 12: 11, 14: 13, 16: 15, 17: 16, 18: 17, 21: 19, 22: 20, 24: 22 },
    },
    Java: {
      code: `public ListNode rotateRight(ListNode head, int k) {
    if (head == null || head.next == null || k == 0) return head;

    int length = 1;
    ListNode oldTail = head;
    while (oldTail.next != null) {
        oldTail = oldTail.next;
        length++;
    }

    int effectiveK = k % length;
    if (effectiveK == 0) return head;

    oldTail.next = head;

    ListNode newTail = head;
    for (int i = 0; i < length - effectiveK - 1; i++) {
        newTail = newTail.next;
    }

    ListNode newHead = newTail.next;
    newTail.next = null;

    return newHead;
}`,
      lineMap: { 1: 1, 2: 2, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 11: 11, 12: 12, 14: 14, 16: 16, 17: 17, 18: 18, 21: 21, 22: 22, 24: 24 },
    },
    'C++': {
      code: `ListNode* rotateRight(ListNode* head, int k) {
    if (!head || !head->next || k == 0) return head;

    int length = 1;
    ListNode* oldTail = head;
    while (oldTail->next != nullptr) {
        oldTail = oldTail->next;
        length++;
    }

    int effectiveK = k % length;
    if (effectiveK == 0) return head;

    oldTail->next = head;

    ListNode* newTail = head;
    for (int i = 0; i < length - effectiveK - 1; i++) {
        newTail = newTail->next;
    }

    ListNode* newHead = newTail->next;
    newTail->next = nullptr;

    return newHead;
}`,
      lineMap: { 1: 1, 2: 2, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 11: 11, 12: 12, 14: 14, 16: 16, 17: 17, 18: 18, 21: 21, 22: 22, 24: 24 },
    },
  },

  'partition-list': {
    JavaScript: {
      code: `function partition(head, x) {
  const beforeHead = { val: 0, next: null };
  const afterHead = { val: 0, next: null };
  let before = beforeHead;
  let after = afterHead;

  let curr = head;
  while (curr !== null) {
    if (curr.val < x) {
      before.next = curr;
      before = before.next;
    } else {
      after.next = curr;
      after = after.next;
    }
    curr = curr.next;
  }

  after.next = null;
  before.next = afterHead.next;

  return beforeHead.next;
}`,
      lineMap: { 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 7: 7, 8: 8, 9: 9, 10: 10, 11: 11, 13: 13, 14: 14, 16: 16, 19: 19, 20: 20, 22: 22 },
    },
    TypeScript: {
      code: `function partition(head: ListNode | null, x: number): ListNode | null {
  const beforeHead = new ListNode(0);
  const afterHead = new ListNode(0);
  let before = beforeHead;
  let after = afterHead;

  let curr = head;
  while (curr !== null) {
    if (curr.val < x) {
      before.next = curr;
      before = before.next;
    } else {
      after.next = curr;
      after = after.next;
    }
    curr = curr.next;
  }

  after.next = null;
  before.next = afterHead.next;

  return beforeHead.next;
}`,
      lineMap: { 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 7: 7, 8: 8, 9: 9, 10: 10, 11: 11, 13: 13, 14: 14, 16: 16, 19: 19, 20: 20, 22: 22 },
    },
    Python: {
      code: `def partition(head: Optional[ListNode], x: int) -> Optional[ListNode]:
    beforeHead = ListNode(0)
    afterHead = ListNode(0)
    before = beforeHead
    after = afterHead

    curr = head
    while curr is not None:
        if curr.val < x:
            before.next = curr
            before = before.next
        else:
            after.next = curr
            after = after.next
        curr = curr.next

    after.next = None
    before.next = afterHead.next

    return beforeHead.next`,
      lineMap: { 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 7: 7, 8: 8, 9: 9, 10: 10, 11: 11, 13: 13, 14: 14, 16: 15, 19: 17, 20: 18, 22: 20 },
    },
    Java: {
      code: `public ListNode partition(ListNode head, int x) {
    ListNode beforeHead = new ListNode(0);
    ListNode afterHead = new ListNode(0);
    ListNode before = beforeHead;
    ListNode after = afterHead;

    ListNode curr = head;
    while (curr != null) {
        if (curr.val < x) {
            before.next = curr;
            before = before.next;
        } else {
            after.next = curr;
            after = after.next;
        }
        curr = curr.next;
    }

    after.next = null;
    before.next = afterHead.next;

    return beforeHead.next;
}`,
      lineMap: { 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 7: 7, 8: 8, 9: 9, 10: 10, 11: 11, 13: 13, 14: 14, 16: 16, 19: 19, 20: 20, 22: 22 },
    },
    'C++': {
      code: `ListNode* partition(ListNode* head, int x) {
    ListNode beforeHead(0);
    ListNode afterHead(0);
    ListNode* before = &beforeHead;
    ListNode* after = &afterHead;

    ListNode* curr = head;
    while (curr != nullptr) {
        if (curr->val < x) {
            before->next = curr;
            before = before->next;
        } else {
            after->next = curr;
            after = after->next;
        }
        curr = curr->next;
    }

    after->next = nullptr;
    before->next = afterHead.next;

    return beforeHead.next;
}`,
      lineMap: { 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 7: 7, 8: 8, 9: 9, 10: 10, 11: 11, 13: 13, 14: 14, 16: 16, 19: 19, 20: 20, 22: 22 },
    },
  },

  'lru-cache': {
    JavaScript: {
      code: `function simulateLRUCache(capacity, operations, argsList) {
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
      } else {
        if (map.size >= capacity) {
          let prevNode = head;
          while (prevNode.next !== null && prevNode.next.next !== null) {
            prevNode = prevNode.next;
          }
          const lruNode = prevNode;
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
      }
      result.push(null);
    } else if (op === 'get') {
      const key = args[0];
      if (map.has(key)) {
        const node = map.get(key);
        removeNode(node);
        addToFront(node);
        const parts = String(node.val).split(':');
        result.push(Number(parts[1]));
      } else {
        result.push(-1);
      }
    }
  }

  return result;
}`,
      lineMap: { 1: 1, 2: 2, 3: 3, 4: 4, 6: 6, 7: 7, 24: 24, 25: 25, 26: 26, 28: 28, 29: 29, 30: 30, 32: 32, 33: 33, 34: 34, 35: 35, 36: 36, 38: 38, 39: 39, 43: 43, 44: 44, 52: 52, 53: 53, 54: 54, 56: 56, 57: 57, 58: 58, 59: 59, 60: 60, 61: 61, 62: 62, 63: 63, 64: 64, 65: 65, 67: 67, 72: 72 },
    },
    TypeScript: {
      code: `function simulateLRUCache(capacity: number, operations: string[], argsList: any[]): any[] {
  const head: any = { val: 'HEAD', next: null };
  const tail: any = { val: 'TAIL', next: null };
  head.next = tail;

  const map = new Map<any, any>();
  const result: any[] = [];

  function removeNode(node: any) {
    let prevNode = head;
    while (prevNode.next !== null && prevNode.next !== node) {
      prevNode = prevNode.next;
    }
    if (prevNode.next === node) {
      prevNode.next = node.next;
    }
  }

  function addToFront(node: any) {
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
      } else {
        if (map.size >= capacity) {
          let prevNode = head;
          while (prevNode.next !== null && prevNode.next.next !== null) {
            prevNode = prevNode.next;
          }
          const lruNode = prevNode;
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
      }
      result.push(null);
    } else if (op === 'get') {
      const key = args[0];
      if (map.has(key)) {
        const node = map.get(key);
        removeNode(node);
        addToFront(node);
        const parts = String(node.val).split(':');
        result.push(Number(parts[1]));
      } else {
        result.push(-1);
      }
    }
  }

  return result;
}`,
      lineMap: { 1: 1, 2: 2, 3: 3, 4: 4, 6: 6, 7: 7, 24: 24, 25: 25, 26: 26, 28: 28, 29: 29, 30: 30, 32: 32, 33: 33, 34: 34, 35: 35, 36: 36, 38: 38, 39: 39, 43: 43, 44: 44, 52: 52, 53: 53, 54: 54, 56: 56, 57: 57, 58: 58, 59: 59, 60: 60, 61: 61, 62: 62, 63: 63, 64: 64, 65: 65, 67: 67, 72: 72 },
    },
    Python: {
      code: `def simulateLRUCache(capacity: int, operations: list[str], argsList: list[any]) -> list[any]:
    head = {'val': 'HEAD', 'next': None}
    tail = {'val': 'TAIL', 'next': None}
    head['next'] = tail

    map = {}
    result = []

    def removeNode(node):
        prevNode = head
        while prevNode['next'] and prevNode['next'] != node:
            prevNode = prevNode['next']
        if prevNode['next'] == node:
            prevNode['next'] = node['next']

    def addToFront(node):
        node['next'] = head['next']
        head['next'] = node

    for i in range(len(operations)):
        op = operations[i]
        args = argsList[i]

        if op == 'put':
            key, val = args[0], args[1]
            if key in map:
                existing = map[key]
                existing['val'] = f"{key}:{val}"
                removeNode(existing)
                addToFront(existing)
            else:
                if len(map) >= capacity:
                    prevNode = head
                    while prevNode['next'] and prevNode['next']['next']:
                        prevNode = prevNode['next']
                    removeNode(prevNode)
                    for k, v in list(map.items()):
                        if v == prevNode:
                            del map[k]
                            break
                newNode = {'val': f"{key}:{val}", 'next': None}
                addToFront(newNode)
                map[key] = newNode
            result.append(None)
        elif op == 'get':
            key = args[0]
            if key in map:
                node = map[key]
                removeNode(node)
                addToFront(node)
                val = int(node['val'].split(':')[1])
                result.append(val)
            else:
                result.append(-1)

    return result`,
      lineMap: { 1: 1, 2: 2, 3: 3, 4: 4, 6: 6, 7: 7, 24: 20, 25: 21, 26: 22, 28: 24, 29: 25, 30: 25, 32: 26, 33: 27, 34: 28, 35: 29, 36: 30, 38: 31, 39: 32, 43: 35, 44: 36, 52: 40, 53: 41, 54: 42, 56: 43, 57: 44, 58: 45, 59: 46, 60: 47, 61: 48, 62: 49, 63: 50, 64: 51, 65: 52, 67: 53, 72: 55 },
    },
    Java: {
      code: `public List<Integer> simulateLRUCache(int capacity, String[] operations, int[][] argsList) {
    List<Integer> result = new ArrayList<>();
    LinkedHashMap<Integer, Integer> cache = new LinkedHashMap<Integer, Integer>(capacity, 0.75f, true) {
        protected boolean removeEldestEntry(Map.Entry<Integer, Integer> eldest) {
            return size() > capacity;
        }
    };

    for (int i = 0; i < operations.length; i++) {
        String op = operations[i];
        int[] args = argsList[i];

        if (op.equals("put")) {
            cache.put(args[0], args[1]);
            result.add(null);
        } else if (op.equals("get")) {
            result.add(cache.getOrDefault(args[0], -1));
        }
    }

    return result;
}`,
      lineMap: { 1: 1, 2: 2, 3: 3, 4: 4, 6: 2, 7: 2, 24: 10, 25: 11, 26: 12, 28: 14, 29: 14, 30: 14, 32: 15, 33: 15, 34: 15, 35: 15, 36: 15, 38: 15, 39: 15, 43: 15, 44: 15, 52: 15, 53: 15, 54: 16, 56: 17, 57: 18, 58: 18, 59: 19, 60: 19, 61: 19, 62: 19, 63: 19, 64: 19, 65: 19, 67: 19, 72: 21 },
    },
    'C++': {
      code: `vector<int> simulateLRUCache(int capacity, vector<string>& operations, vector<vector<int>>& argsList) {
    vector<int> result;
    list<pair<int, int>> lruList;
    unordered_map<int, list<pair<int, int>>::iterator> map;

    for (int i = 0; i < (int)operations.size(); i++) {
        string op = operations[i];
        vector<int> args = argsList[i];

        if (op == "put") {
            int key = args[0], val = args[1];
            if (map.count(key)) {
                lruList.erase(map[key]);
            } else if ((int)map.size() >= capacity) {
                map.erase(lruList.back().first);
                lruList.pop_back();
            }
            lruList.push_front({key, val});
            map[key] = lruList.begin();
            result.push_back(0);
        } else if (op == "get") {
            int key = args[0];
            if (map.count(key)) {
                int val = map[key]->second;
                lruList.erase(map[key]);
                lruList.push_front({key, val});
                map[key] = lruList.begin();
                result.push_back(val);
            } else {
                result.push_back(-1);
            }
        }
    }

    return result;
}`,
      lineMap: { 1: 1, 2: 2, 3: 3, 4: 4, 6: 4, 7: 2, 24: 6, 25: 7, 26: 8, 28: 10, 29: 11, 30: 11, 32: 12, 33: 13, 34: 13, 35: 14, 36: 14, 38: 15, 39: 16, 43: 17, 44: 18, 52: 19, 53: 20, 54: 21, 56: 22, 57: 23, 58: 24, 59: 25, 60: 26, 61: 27, 62: 28, 63: 29, 64: 30, 65: 31, 67: 32, 72: 36 },
    },
  },
  ...TREE_MULTI_LANG_SOLUTIONS,
  ...N_QUEENS_MULTI_LANG_SOLUTIONS,
};
