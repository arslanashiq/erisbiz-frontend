import { ToWords } from 'to-words';

/**
 *
 * @param {number} amount
 * @returns {string} formatted amount in the form of 0,000.00
 */
function formatAmount(amount = 0, options = { maximumFractionDigits: 2, minimumFractionDigits: 2 }) {
  try {
    const formattedAmount = amount.toLocaleString('en-US', options);
    if (formattedAmount) return formattedAmount;
    return amount;
  } catch (error) {
    // console.log(error);
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

export const numberToWords = number => {
  const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  const teens = [
    '',
    'Eleven',
    'Twelve',
    'Thirteen',
    'Fourteen',
    'Fifteen',
    'Sixteen',
    'Seventeen',
    'Eighteen',
    'Nineteen',
  ];
  const tens = ['', 'Ten', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  function convertHundreds(n) {
    function convertTens(num) {
      if (num < 10) {
        return units[num];
      }
      if (num >= 11 && num <= 19) {
        return teens[num - 10];
      }
      return `${tens[Math.floor(num / 10)]} ${units[num % 10]}`;
    }
    if (n > 99) {
      return `${units[Math.floor(n / 100)]} Hundred ${convertTens(n % 100)}`;
    }
    return convertTens(n);
  }

  function convertThousands(n) {
    if (n >= 1000 && n <= 999999) {
      return `${convertHundreds(Math.floor(n / 1000))} Thousand ${convertHundreds(n % 1000)}`;
    }
    return convertHundreds(n);
  }

  function convertMillions(n) {
    if (n >= 1000000 && n <= 999999999) {
      return `${convertHundreds(Math.floor(n / 1000000))} Million ${convertThousands(n % 1000000)}`;
    }
    return convertThousands(n);
  }

  if (number === 0) {
    return 'zero';
  }
  return convertMillions(number);
};

export const toWords = new ToWords({
  localeCode: 'en-US',
  converterOptions: {
    currency: false,
    ignoreDecimal: false,
    ignoreZeroCurrency: false,
  },
});

export const handleGetAmountInWords = amount => {
  const amountToWords = toWords.convert(amount)?.toLowerCase();
  const capitalLetter = amountToWords.charAt(0).toUpperCase();
  if (amountToWords?.includes('point')) {
    return `${capitalLetter}${amountToWords?.replace('point', 'and')?.slice(1, amountToWords.length)} fills`;
  }
  return `${capitalLetter}${amountToWords?.slice(1, amountToWords.length)}`;
};
