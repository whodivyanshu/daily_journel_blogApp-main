import { AuthOptions } from "next-auth"
import NextAuth from "next-auth/next"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter";


import prisma from '@/lib/prismadb'

export const authOptions: AuthOptions={
    adapter:PrismaAdapter(prisma) as any,
    providers:[
        GoogleProvider({
            clientId:process.env.CLIENT_ID as string,
            clientSecret:process.env.CLIENT_SECRET as string,
        }),
    ], 
    pages:{
        signIn:'/signin'
    },
    secret:process.env.NEXTAUTH_SECRET,
};

const handler=NextAuth(authOptions);

export {handler as GET, handler as POST}

