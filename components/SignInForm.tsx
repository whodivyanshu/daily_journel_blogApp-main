'use client'    

import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

const SignInForm = () => {

  return (
    <div>
     <h1 className='text-center mt-8 font-semibold text-lg'>SignIn</h1>
        <div className='mt-2 p-3 flex flex-col items-center justify-center gap-4'>
            <button onClick={()=>signIn('google')} className='flex items-center border p-4 rounded-full gap-4 hover:bg-slate-100/25 transition '>
                <span>
                    <FcGoogle size={30}/>
                </span>
                Sign In with Google
            </button>
        </div>
    </div>
  )
}

export default SignInForm