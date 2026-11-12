export type CurrencyCode = 'INR' | 'USD' | 'EUR' | 'GBP';

export const CURRENCY_RATES: Record<CurrencyCode, { symbol: string; rate: number; prefix: boolean }> = {
  INR: { symbol: '₹', rate: 1, prefix: true },
  USD: { symbol: '$', rate: 0.012, prefix: true },
  EUR: { symbol: '€', rate: 0.011, prefix: true },
  GBP: { symbol: '£', rate: 0.0095, prefix: true },
};

let currentCurrency: CurrencyCode = (localStorage.getItem('dropx_currency') as CurrencyCode) || 'INR';

export const setGlobalCurrency = (code: CurrencyCode) => {
  currentCurrency = code;
  localStorage.setItem('dropx_currency', code);
  window.dispatchEvent(new Event('currency-change'));
};

export const getGlobalCurrency = (): CurrencyCode => {
  return currentCurrency;
};

export const formatPrice = (amountInINR: number, code: CurrencyCode = currentCurrency): string => {
  const conf = CURRENCY_RATES[code] || CURRENCY_RATES.INR;
  if (code === 'INR') {
    return `${conf.symbol}${Math.round(amountInINR).toLocaleString('en-IN')}`;
  }
  const converted = Math.round(amountInINR * conf.rate);
  return `${conf.symbol}${converted.toLocaleString('en-US')}`;
};

export const formatINR = (amount: number): string => {
  return formatPrice(amount);
};
