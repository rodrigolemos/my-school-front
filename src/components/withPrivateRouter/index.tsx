import Router from 'next/router'

const login = '/login?redirected=true'

interface IAuth {
  auth: boolean
}

const checkUserAuthentication = async (): Promise<IAuth> => {
  return { auth: false }
}

export default (WrappedComponent: any) => {
  const hocComponent = ({ ...props }) => <WrappedComponent {...props} />;

  hocComponent.getInitialProps = async (context: any) => {
    const userAuth = await checkUserAuthentication()

    if (!userAuth?.auth) {
      if (context.res) {
        context.res?.writeHead(302, {
          Location: login
        })
        context.res?.end()
      } else {
        Router.replace(login)
      }
    } else if (WrappedComponent.getInitialProps) {
      const wrappedProps = await WrappedComponent.getInitialProps({ ...context, auth: userAuth })
      return { ...wrappedProps, userAuth }
    }

    return { userAuth }
  }

  return hocComponent
}
