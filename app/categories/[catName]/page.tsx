import { TPost } from "@/app/types";
import Post from "@/components/Post";

const getPosts=async(catName:string):Promise<TPost[] | null>=>{
    try {
        const res=await fetch(`${process.env.NEXTAUTH_URL}/api/categories/${catName}`,{cache:"no-store"});
        if(res.ok){
            const categories=await res.json();
            const posts =   categories.posts;
            return posts;
        }
    } catch (error) {
        console.log(error);
    }
    return null;
}

const page = async({params}:{params:{catName:string}}) => {

    const category=params.catName;
    const posts=await getPosts(category);

  return (
    <div>
        <h1>Category:<span className="font-bold">{" "} {decodeURIComponent(category)}</span></h1>
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