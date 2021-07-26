import { lazy, Suspense } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
//导入加载组件
import Loading from '@/components/Loading'

const Login = lazy(() => import("@/views/login/index"))
const Dashboard = lazy(() => import("@/views/dashboard/index"))

const Routes = () => {
  return (
    //fallback需要导入加载组件
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route path="/login" component={Login}></Route>
        <Route path="/dashboard" component={Dashboard}></Route>
        <Redirect to="/login" from="/"></Redirect>
      </Switch>
    </Suspense>
  )
}
export default Routes