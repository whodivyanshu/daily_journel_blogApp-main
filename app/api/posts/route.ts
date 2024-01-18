import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prismadb'
import { getServerSession } from 'next-auth/next'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Not Authenticated' }, { status: 401 })
  }

  const { title, content, links, selectedCategory, imageUrl, publicId } =
    await req.json()
  const authorEmail = session?.user?.email as string

  if (!title || !content) {
    return NextResponse.json(
      { error: 'Title and Content are required.' },
      { status: 500 }
    )
  }

  try {
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        links,
        imageUrl,
        publicId,
        categoryName: selectedCategory,
        authorEmail
      }
    })
    console.log('Post Created')
    return NextResponse.json(newPost)
  } catch (error) {}
}

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include: { author: { select: { name: true } } },
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(posts)
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Something went Wrong' })
  }
}
