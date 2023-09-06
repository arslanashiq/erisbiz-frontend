/**
 *
 * @param {number} amount
 * @returns {string} formatted amount in the form of 0,000.00
 */
function formatAmount(amount = 0) {
  try {
    const formattedAmount = amount.toLocaleString('en-US', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    });
    if (formattedAmount) return formattedAmount;
    return amount;
  } catch (error) {
    console.log(error);
    return '0.00';
  }
}

export default formatAmount;

const formatAmountInShortForm = n => {
  if (n >= 1e3 && n < 1e6) return `${(n / 1e3).toFixed(2)}K`;
  if (n >= 1e6 && n < 1e9) return `${(n / 1e6).toFixed(2)}M`;
  if (n >= 1e9 && n < 1e12) return `${(n / 1e9).toFixed(2)}B`;
  if (n >= 1e12) return `${(n / 1e12).toFixed(2)}T`;
  return n;
};

export const abbreviateAmount = amount => {
  if (amount < 0) {
    return `-${formatAmountInShortForm(-1 * amount)}`;
  }
  return formatAmountInShortForm(amount);
};
