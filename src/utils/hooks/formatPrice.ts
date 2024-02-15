const formatPrice = (num?: number) => {
  if (!num) return 'AR$00.00';
  const formattedNumber = num.toLocaleString('es-AR');

  return `AR$ ${formattedNumber}`;
};

export default formatPrice;
