import CreatePostForm from '@/components/CreatePostForm'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'


const page = async() => {

    const session=await getServerSession(authOptions);
    //console.log(session);
    if(!session){
        redirect('/signin')
    }

  return (
    <div>
        <CreatePostForm/>
    </div>
  )
}

export default page