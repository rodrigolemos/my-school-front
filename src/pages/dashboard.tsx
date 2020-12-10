import withPrivateRoute from '../components/withPrivateRouter'

const Dashboard = () => {
  return <div>Dashboard logado.</div>
}

Dashboard.getInitialProps = async (props: any) => {
  console.info('Private route valid', props)
  return {}
}

export default withPrivateRoute(Dashboard)