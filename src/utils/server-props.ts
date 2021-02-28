import { GetServerSideProps } from 'next';
import { checkAuth } from '../services/auth';
import { checkPermission } from '../services/permission';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getServerSidePropsAdmin: GetServerSideProps<unknown> = async (context: any) => {
  try {
    checkAuth(context.req.cookies['@my-school:token']);
    const { id, name } = JSON.parse(context.req.cookies['@my-school:user']);
    const isAdmin = await checkPermission(context.req.cookies['@my-school:token'], id);
    if (!isAdmin) throw new Error('Not allowed');
    return {
      props: {
        name,
        isAdmin
      }
    };
  } catch (err) {
    return {
      props: {},
      redirect: {
        destination: '/login',
        permanent: false
      }
    };
  }
};
