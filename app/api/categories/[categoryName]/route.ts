import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";


export async function GET(req:Request,{params}:{params:{categoryName:string}}){
    try {
        const categoryName=params.categoryName;
        const post = await prisma.category.findUnique({
            where:{categoryName},
            include:{
                posts: {include: { author:true }, orderBy: { createdAt:"desc" }}
            }
        })
        return NextResponse.json(post);
    } catch (error) {
        return NextResponse.json({message:"Couldn't Fetch Post"});
    }
}
