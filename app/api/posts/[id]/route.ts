import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prismadb'
import { getServerSession } from 'next-auth/next'
import { NextResponse } from 'next/server'

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id
    const post = await prisma.post.findUnique({ where: { id } })
    return NextResponse.json(post)
  } catch (error) {
    return NextResponse.json({ message: "Couldn't Fetch Post" })
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Not Authenticated' }, { status: 401 })
  }

  const { title, content, links, selectedCategory, imageUrl, publicId } =
    await req.json()
  const id = params.id

  try {
    const post = await prisma.post.update({
      where: { id },
      data: {
        title,
        content,
        links,
        categoryName: selectedCategory,
        imageUrl,
        publicId
      }
    })
    return NextResponse.json(post)
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Error Editing Post' })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Not Authenticated' }, { status: 401 })
  }

  const id = params.id
  try {
    const post = await prisma.post.delete({ where: { id } })
    return NextResponse.json(post)
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Error Deleting the Post' })
  }
}
