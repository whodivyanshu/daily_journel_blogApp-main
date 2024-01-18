import CreatePostForm from '@/components/CreatePostForm'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

const page = async () => {
  const session = await getServerSession(authOptions)
  //console.log(session);
  if (!session) {
    redirect('/signin')
  }

  return (
    <div>
      <CreatePostForm />
    </div>
  )
}

export default page
