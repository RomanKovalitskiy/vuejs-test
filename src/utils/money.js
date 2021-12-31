// new Intl.NumberFormat

const formatPrice = (value) => {
  if (!value) return '';

  const parts = value.toString().split('.');
  parts[0] = parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return parts.join('.');
};

export default {
  formatPrice,
};
