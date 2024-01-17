export type TCategory={
    id:string,
    categoryName:string,
};

export type TPost={
    id:string,
    title:string,
    content:string,
    imageUrl?:string,
    categoryName?:string,
    links:string,
    publicId?:string,
    createdAt:string,
    authorEmail:string,
    author:{
        name:string
    }
}