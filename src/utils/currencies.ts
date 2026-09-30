import { CurrencyCode, CurrencyConfig } from '../types';

export const SUPPORTED_CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  USD: { code: 'USD', symbol: '$', name: 'US Dollar', rateToUSD: 1.0 },
  PKR: { code: 'PKR', symbol: '₨', name: 'Pakistani Rupee', rateToUSD: 278.5 },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro', rateToUSD: 0.92 },
  GBP: { code: 'GBP', symbol: '£', name: 'British Pound', rateToUSD: 0.78 },
  CAD: { code: 'CAD', symbol: 'CA$', name: 'Canadian Dollar', rateToUSD: 1.36 },
  AUD: { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', rateToUSD: 1.52 },
  AED: { code: 'AED', symbol: 'AED', name: 'UAE Dirham', rateToUSD: 3.67 },
  INR: { code: 'INR', symbol: '₹', name: 'Indian Rupee', rateToUSD: 83.5 },
};

export function formatCurrency(amount: number, currency: CurrencyCode = 'USD', includeCode = false): string {
  const cfg = SUPPORTED_CURRENCIES[currency] || SUPPORTED_CURRENCIES.USD;
  const rounded = Math.round(amount);
  const formattedNumber = new Intl.NumberFormat('en-US').format(rounded);

  if (currency === 'PKR') {
    return `PKR ${formattedNumber}`;
  }
  if (currency === 'AED') {
    return `${formattedNumber} AED`;
  }
  if (currency === 'INR') {
    return `₹${formattedNumber}`;
  }

  const prefix = cfg.symbol;
  return includeCode ? `${prefix}${formattedNumber} ${currency}` : `${prefix}${formattedNumber}`;
}

export function convertCurrency(
  amount: number,
  from: CurrencyCode,
  to: CurrencyCode
): { convertedAmount: number; rateUsed: number } {
  if (from === to) return { convertedAmount: amount, rateUsed: 1 };
  
  const fromRate = SUPPORTED_CURRENCIES[from]?.rateToUSD || 1;
  const toRate = SUPPORTED_CURRENCIES[to]?.rateToUSD || 1;
  
  // amount in USD = amount / fromRate
  // amount in target = (amount / fromRate) * toRate
  const inUSD = amount / fromRate;
  const converted = inUSD * toRate;
  const effectiveRate = toRate / fromRate;

  return {
    convertedAmount: converted,
    rateUsed: effectiveRate,
  };
}
