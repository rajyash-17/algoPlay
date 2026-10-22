function maxProfit(prices) {
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
}
