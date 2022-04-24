import { Cookies } from 'react-cookie';
import { useRouter } from 'next/router';

interface AuthProps {
  logOut: () => void;
}

export const useAuth = (): AuthProps => {
  const router = useRouter();

  const logOut = () => {
    const cookies = new Cookies();

    cookies.remove('@my-school:user');
    cookies.remove('@my-school:token');

    router.push('/login');
  };

  return { logOut };
};
