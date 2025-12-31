import Loader from '@/components/common/loader'
import UserIssue from '@/services/user/issue/component/user-issue'
import { Suspense } from 'react'

const page = () => {
  return (
    <Suspense fallback={<Loader />}>
   <UserIssue />
   </Suspense>
  )
}

export default page