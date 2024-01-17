import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";


export async function GET(req:Request,{params}:{params:{email:string}}){
    try {
        const email=params.email;
        const post = await prisma.user.findUnique({
            where:{email},
            include:{
                posts: {orderBy: { createdAt:"desc" }}
            }
        })
        return NextResponse.json(post);
    } catch (error) {
        return NextResponse.json({message:"Couldn't Fetch Post"});
    }
}
