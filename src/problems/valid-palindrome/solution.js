function isPalindrome(s) {
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
}
