import { verify } from 'jsonwebtoken'

export const checkAuth = (token: string): string | object => {
  return verify(token, process.env.JWT_SECRET)
}
