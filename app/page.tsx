import Post from '@/components/Post'
import CategoryList from '@/components/CategoryList'
import { TPost } from './types';

const getPosts=async():Promise<TPost[] | null>=>{
  try {
    const res=await fetch(`${process.env.NEXTAUTH_URL}/api/posts`,{
      cache:"no-store",
    });
    if(res.ok){
      const posts=await res.json();
      return posts;
    }
  } catch (error) {
    console.log(error);
  }
  return null;
}

const page = async() => {
  const posts=await getPosts();
  return (
    <div>
      <CategoryList/>
      {posts && posts.length>0?(
        posts.map((post)=>
          <Post key={post.id} 
                id={post.id}
                author={post.author.name}
                authorEmail={post.authorEmail}
                date={post.createdAt}
                image={post.imageUrl}
                link={post.links}
                title={post.title}
                content={post.content}
                category={post.categoryName}
          />)
      ):(
        <div>No Posts to Display</div>
      )}
    </div>
  )
}

export default page