import { verify } from 'jsonwebtoken';

export const checkAuth = (token: string): string => {
  return verify(token, process.env.JWT_SECRET);
};
