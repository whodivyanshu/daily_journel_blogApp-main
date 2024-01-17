import Link from 'next/link'
import { TCategory } from '@/app/types';

const getCategories=async(): Promise<TCategory[]|null>=>{
  try {
    const res=await fetch(`${process.env.NEXTAUTH_URL}/api/categories`);
    if(res.ok){
      const categories=await res.json();
      return categories;
    }
  } catch (error) {
    console.log(error);
  }
  return null;
}


const CategoryList = async() => {
  const categories = await getCategories();
  return (
    <div >
        {categories && categories.map((category:TCategory)=>(
            <Link className='categoryList' key={category.id} href={`/categories/${category.categoryName}`}>{category.categoryName}</Link>
        ))}
    </div>
  )
}

export default CategoryList