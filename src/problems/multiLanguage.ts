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
};
