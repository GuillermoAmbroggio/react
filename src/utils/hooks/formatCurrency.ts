const formatCurrency = (amount: string | number): string | number => {
  const num = typeof amount === 'string' ? Number(amount) : amount;

  if (isNaN(num)) {
    return amount;
  }

  const formatted = num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

  return `$ ${formatted}`;
};

export default formatCurrency;
