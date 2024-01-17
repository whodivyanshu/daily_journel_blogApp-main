'use client';
import { useState,useEffect } from "react";
import { IoMdAdd } from "react-icons/io";
import Link from "next/link";
import { FcLink } from "react-icons/fc";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TCategory } from "@/app/types";
import { useRouter } from "next/navigation";
import { CldUploadButton, CldUploadWidgetResults } from 'next-cloudinary';
import { IoImagesOutline } from "react-icons/io5";
import Image from "next/image";
import toast from "react-hot-toast";

const CreatePostForm = () => {

    const router=useRouter();

    const [links,setLinks]=useState("");
    const [addlink,setAddLink]=useState(false);

    const [title,setTitle]=useState("");
    const [content,setContent]=useState("");
    const [categories,setCategories]=useState<TCategory[]>([]);
    const [selectedCategory,setSelectedCategory]=useState("");
    const [imageUrl,setImageUrl]=useState("");
    const [publicId,setPublicId]=useState("");

    useEffect(()=>{
        const fetchAllCategories=async()=>{
            const res=await fetch('/api/categories');
            const catName=await res.json();
            setCategories(catName);
        };
        fetchAllCategories();
    },[]);

    const handleClick=(e:React.MouseEvent<HTMLButtonElement,MouseEvent>)=>{
        e.preventDefault();
        setAddLink(true);
    }
    const deleteLink=(e:React.MouseEvent<HTMLButtonElement,MouseEvent>)=>{
        e.preventDefault();
        setLinks("");
        setAddLink(false);
    }

    const handleSubmit=async(e:React.FormEvent)=>{
        e.preventDefault();
        if(!title || !content){
            const errorMsg="Title and Content are Required.";
            toast.error(errorMsg);
            return;
        }

        try {
            const res = await fetch("/api/posts",{
                method:"POST",
                headers:{
                    "Content-type":"application/json"
                },
                body:JSON.stringify({
                    title, content, links, selectedCategory, imageUrl, publicId 
                }),
            });
            if(res.ok){
                toast.success("Post Created Successfully");
                router.push('/dashboard');
                router.refresh();
            }
        } catch (error) {
            toast.error("Something Went Wrong")
            console.log(error);
        }
    }

    const handleImageUpload=(result:CldUploadWidgetResults)=>{
        const info= result.info as object;

        if("secure_url" in info && "public_id" in info){
            const url =info.secure_url as string;
            const public_id= info.public_id as string;
            setImageUrl(url);
            setPublicId(public_id);
        }
    }

    const removeImage=async(e:React.FormEvent)=>{
        e.preventDefault();

        try {
            const res= await fetch('/api/removeImage',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({publicId}),
            });

            if(res.ok){
                setImageUrl("");
                setPublicId("");
            }
        } catch (error) {
            console.log(error);
        }
    }


  return (
    <div>
        <h2>Create Post</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <input type="text" onChange={(e)=>setTitle(e.target.value)} placeholder="Title" />
            <textarea onChange={(e)=>setContent(e.target.value)} placeholder="Content"></textarea>
            <div className="flex gap-2">
                <input className="flex-1" type="text" onChange={(e)=>setLinks(e.target.value)} value={links} placeholder="Paste the link and Click on Add"/>
                <button className="btn flex gap-2 items-center" onClick={handleClick}> <IoMdAdd size={20}/> Add</button>
            </div>
            {links && addlink && <div className="flex gap-2"> <Link className="flex gap-2 text-[#1976D2] font-bold max-w-full overflow-hidden text-ellipsis" href={links}><FcLink size={25}/> {links}</Link> <button onClick={deleteLink}><RiDeleteBin6Line size={20} /></button></div> }

            <CldUploadButton uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET} onUpload={handleImageUpload} className={`h-48 border-2 mt-4 border-dotted grid place-items-center bg-slate-100 rounded-md relative ${imageUrl && 'pointer-events-none'}`}>
                <div> <IoImagesOutline size={25}/> </div>
                {imageUrl && <Image src={imageUrl} alt={title} fill className="absolute object-cover inset-0"/>}
            </CldUploadButton>

            {publicId && <button onClick={removeImage} className="py-2 px-4 rounded-md font-bold w-fit bg-red-600 text-white mb-4">Remove Image</button>}

            <select onChange={(e)=>setSelectedCategory(e.target.value)} className="p-3 rounded-md border appearance-none">
                <option value="">Select A Category</option>
                {
                    categories && categories.map(category=> <option key={category.id} value={category.categoryName}>{category.categoryName}</option>)
                }
            </select>


            <button className="primary-btn" type="submit">Create Post</button>

        </form>
    </div>
  )
}

export default CreatePostForm