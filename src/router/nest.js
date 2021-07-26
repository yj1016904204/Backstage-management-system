import { lazy, Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
//导入加载组件
import Loading from '@/components/Loading'

const UserList = lazy(() => import("@/views/dashboard/users"))

const Routes = () => {
  return <Suspense fallback={<Loading />}>
    <Switch>
      <Route path="/dashboard/user" component={UserList}></Route>
    </Switch>
  </Suspense>
}
export default Routes