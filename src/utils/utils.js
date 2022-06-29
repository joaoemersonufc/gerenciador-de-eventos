export const formatNumberAsMoney = (value) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'BRL',
  });

  return formatter.format(value);
}

  