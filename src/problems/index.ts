import { ProblemMeta, ProblemInput, RendererConfig } from '@/engine/types';

import { meta as twoSumMeta } from './two-sum/meta';
import { inputs as twoSumInputs } from './two-sum/inputs';
import { rendererConfig as twoSumRenderer } from './two-sum/renderer';

import { meta as twoSumIIMeta } from './two-sum-ii/meta';
import { inputs as twoSumIIInputs } from './two-sum-ii/inputs';
import { rendererConfig as twoSumIIRenderer } from './two-sum-ii/renderer';

import { meta as validPalindromeMeta } from './valid-palindrome/meta';
import { inputs as validPalindromeInputs } from './valid-palindrome/inputs';
import { rendererConfig as validPalindromeRenderer } from './valid-palindrome/renderer';

import { meta as stockMeta } from './best-time-to-buy-and-sell-stock/meta';
import { inputs as stockInputs } from './best-time-to-buy-and-sell-stock/inputs';
import { rendererConfig as stockRenderer } from './best-time-to-buy-and-sell-stock/renderer';

import { meta as searchInsertMeta } from './search-insert-position/meta';
import { inputs as searchInsertInputs } from './search-insert-position/inputs';
import { rendererConfig as searchInsertRenderer } from './search-insert-position/renderer';

export interface ProblemDefinition {
  meta: ProblemMeta;
  solutionCode: string;
  inputs: ProblemInput[];
  rendererConfig: RendererConfig;
}

const twoSumCode = `function twoSum(nums, target) {
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
}`;

const twoSumIICode = `function twoSumII(numbers, target) {
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
}`;

const validPalindromeCode = `function isPalindrome(s) {
  const clean = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  const chars = clean.split('');
  let left = 0;
  let right = chars.length - 1;

  while (left < right) {
    note("Comparing chars[" + left + "] ('" + chars[left] + "') and chars[" + right + "] ('" + chars[right] + "')");

    if (chars[left] !== chars[right]) {
      note("Mismatch found! '" + chars[left] + "' !== '" + chars[right] + "'. Not a palindrome.");
      return false;
    }

    left++;
    right--;
  }

  note("All characters match symmetrically. It is a valid palindrome!");
  return true;
}`;

const stockCode = `function maxProfit(prices) {
  let minPrice = prices[0];
  let maxProfitSoFar = 0;
  let buyDay = 0;

  for (let day = 1; day < prices.length; day++) {
    const currentPrice = prices[day];
    note("Day " + day + ": price is " + currentPrice + " (lowest buy price so far = " + minPrice + ")");

    if (currentPrice < minPrice) {
      minPrice = currentPrice;
      buyDay = day;
      note("New lower buy price found: " + minPrice + " at day " + day);
    } else {
      const profit = currentPrice - minPrice;
      if (profit > maxProfitSoFar) {
        maxProfitSoFar = profit;
        note("New maximum profit: " + maxProfitSoFar + " (buy on day " + buyDay + " -> sell on day " + day + ")");
      }
    }
  }

  note("Completed search. Best overall profit: " + maxProfitSoFar);
  return maxProfitSoFar;
}`;

const searchInsertCode = `function searchInsert(nums, target) {
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
}`;

export const PROBLEMS: ProblemDefinition[] = [
  {
    meta: twoSumMeta,
    solutionCode: twoSumCode,
    inputs: twoSumInputs,
    rendererConfig: twoSumRenderer,
  },
  {
    meta: twoSumIIMeta,
    solutionCode: twoSumIICode,
    inputs: twoSumIIInputs,
    rendererConfig: twoSumIIRenderer,
  },
  {
    meta: validPalindromeMeta,
    solutionCode: validPalindromeCode,
    inputs: validPalindromeInputs,
    rendererConfig: validPalindromeRenderer,
  },
  {
    meta: stockMeta,
    solutionCode: stockCode,
    inputs: stockInputs,
    rendererConfig: stockRenderer,
  },
  {
    meta: searchInsertMeta,
    solutionCode: searchInsertCode,
    inputs: searchInsertInputs,
    rendererConfig: searchInsertRenderer,
  },
];

export function getAllProblems(): ProblemDefinition[] {
  return PROBLEMS;
}

export function getProblemBySlug(slug: string): ProblemDefinition | undefined {
  return PROBLEMS.find((p) => p.meta.slug === slug);
}
