export const formatDescription = (description: string, limit = 80): string => {
  let formatedDescription = description;
  if (description.length > limit) formatedDescription = `${description.substr(0, limit)}...`;
  return formatedDescription;
};
