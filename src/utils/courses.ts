export const formatPeriod = (period: string): string => {
  const periods = {
    M: 'Matutino',
    E: 'Vespertino',
    N: 'Noturno'
  };
  return periods[period] || 'Período não informado';
};

export const formatDescription = (description: string): string => {
  const limit = 80;
  let formatedDescription = description;
  if (description.length > limit) formatedDescription = `${description.substr(0, limit)}...`;
  return formatedDescription;
};
