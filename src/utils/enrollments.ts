export const formatStatus = (status: string): string => {
  const description = {
    P: 'Pendente',
    A: 'Ativa'
  };
  return description[status] || 'Status não informado';
};
