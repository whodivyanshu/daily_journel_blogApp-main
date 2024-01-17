'use client'

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const DeleteBtn = ({id}:{id:string}) => {

  const router=useRouter();

  const deleteImage=async (publicId:string)=>{
    const res= await fetch("/api/removeImage",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({publicId}),
    });
  };

  const handleDelete=async()=>{
    const confirmed = window.confirm("Are you sure, You want to delete this Post?");

    if(confirmed){
      try {
          const res= await fetch(`/api/posts/${id}`,{
            method:"DELETE",
            headers:{
              "Content-type":"application/json",
            },
          });
          if(res.ok){
            const post= await res.json();
            const {publicId}=post;
            await deleteImage(publicId);
            toast.success("Post Deleted Successfully");
            router.refresh();
          } 
      } catch (error) {
        toast.error("Somerthing Went Wrong")
        console.log(error);
      }
    }
  };

  return (
    <div>
        <button onClick={handleDelete} className='text-red-600'>Delete</button>
    </div>
  )
}

export default DeleteBtn