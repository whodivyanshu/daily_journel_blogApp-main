'use client'
import { useState } from 'react';
import Link from 'next/link'
import { useSession,signOut } from 'next-auth/react'
import Image from 'next/image';
import { MdAddCircleOutline } from "react-icons/md";

const Navbar = () => {

  const {status,data:session}=useSession();
  const [showpopup,setShowPopUp]=useState(false);

  const handlePopUp=()=>{
    if(showpopup){
      setShowPopUp(false);
    }else{
      setShowPopUp(true);
    }
  }

  return (
    <div className='navbar relative' >
        <div>
            <Link href={"/"}> <h1>DAILY JOURNEL</h1> </Link>
        </div>

        {
          status ==='authenticated' ?(
              <>
                <div className={`absolute z-30 right-0 top-20 bg-white p-6 shadow-lg rounded-md  flex-col gap-2 text-right min-w-[160px] ${showpopup ? "flex":"hidden"}`}>
                  <div className='font-bold'>{session?.user?.name}</div>
                  <div>{session?.user?.email}</div>
                  <Link href={'/dashboard'}  className='hover:underline' onClick={()=>setShowPopUp(false)}>Dashboard</Link>
                  <Link href={'/createpost'} className='hover:underline' onClick={()=>setShowPopUp(false)}>Create Post</Link>
                  <button onClick={()=>signOut()} className='btn'>Sign Out</button>
                </div>

                <div className='flex gap-3 items-center'>
                  <Link href={'/createpost'} className='hidden md:flex gap-2 items-center mr-6 '> <MdAddCircleOutline size={25}/> <span>Create new</span></Link>
                  <Image src={session?.user?.image || ''} width={36} height={36} alt='Profile Img' className='rounded-full cursor-pointer' onClick={handlePopUp}/>
                </div>

              </>
          )
          :
          (
            <div>
                <Link className='btn' href={"/signin"}>Sign In</Link>
            </div>
          )
        }
    </div>
  )
}

export default Navbar


