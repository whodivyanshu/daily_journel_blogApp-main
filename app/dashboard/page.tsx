import Post from '@/components/Post'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { TPost } from '../types'

const getPosts = async (email: string) => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/author/${email}`)
    const { posts } = await res.json()
    return posts
  } catch (error) {
    console.log(error)
    return null
  }
}

const page = async () => {
  const session = await getServerSession(authOptions)
  const email = session?.user?.email
  let posts = []
  if (!session) {
    redirect('signin')
  }

  if (email) {
    posts = await getPosts(email)
  }

  return (
    <div>
      <h2>My Posts</h2>
      {posts && posts.length > 0 ? (
        posts.map((post: TPost) => (
          <Post
            key={post.id}
            id={post.id}
            author={''}
            authorEmail={post.authorEmail}
            date={post.createdAt}
            image={post.imageUrl}
            link={post.links}
            title={post.title}
            content={post.content}
            category={post.categoryName}
          />
        ))
      ) : (
        <div className="py-6">
          No Post Created.
          <Link className="underline" href={'/createpost'}>
            {' '}
            Create New Post
          </Link>
        </div>
      )}
    </div>
  )
}

export default page
