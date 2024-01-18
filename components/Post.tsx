import Thumbnail from '@/thumbnail-placeholder.png'
import Image from 'next/image'
import Link from 'next/link'
import { FcLink } from 'react-icons/fc'
import DeleteBtn from './DeleteBtn'

import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'

interface PostProps {
  id: string
  author: string
  date: string
  image?: string
  authorEmail?: string
  title: string
  content: string
  link?: string
  category?: string
}

const Post = async ({
  id,
  author,
  authorEmail,
  date,
  image,
  link,
  title,
  content,
  category
}: PostProps) => {
  const session = await getServerSession(authOptions)
  const isEditable = session && session?.user?.email === authorEmail

  const dateObject = new Date(date)
  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }

  const formattedDate = dateObject.toLocaleDateString('en-US', options)

  return (
    <div className="my-4 border-b border-b-300 py-8">
      {author ? (
        <div className="mb-4">
          Posted By: <span className="font-bold">{author}</span> on{' '}
          <span>{formattedDate}</span>
        </div>
      ) : (
        <div className="mb-4">
          Posted on <span>{formattedDate}</span>
        </div>
      )}
      <div className="w-full h-72 relative bg-slate-100">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-contain rounded-md object-center"
          />
        ) : (
          <Image
            src={Thumbnail}
            alt="Image Not Found"
            className="object-cover rounded-md object-center h-60"
          />
        )}
      </div>

      {category && (
        <Link
          className="bg-slate-800 w-fit text-white px-4 py-0.5 text-sm font-bold rounded-md mt-4 block"
          href={`categories/${category}`}
        >
          {category}
        </Link>
      )}

      <h2>{title}</h2>
      <p className="leading-loose">{content}</p>

      {link && (
        <Link
          className="flex gap-2 text-[#1976D2] font-bold max-w-full overflow-hidden text-ellipsis"
          href={link}
          target="_blank"
        >
          {' '}
          <FcLink size={25} /> {link}{' '}
        </Link>
      )}

      {isEditable && (
        <div className="flex gap-3 font-bold py-2 px-4 my-3 rounded-md bg-slate-200 w-fit">
          <Link href={`/editpost/${id}`}>Edit</Link>
          <DeleteBtn id={id} />
        </div>
      )}
    </div>
  )
}

export default Post
