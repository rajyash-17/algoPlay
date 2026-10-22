function calculate(s) {
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
      note("Opening '(': save running result " + result + " and sign " + sign + " to stack");
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
      note("Closing ')': resolve sub-expression to " + result);
    }
  }

  result += sign * currentNumber;
  note("Calculation complete. Final value: " + result);
  return result;
}
