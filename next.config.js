/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains:['res.cloudinary.com','lh3.googleusercontent.com','assets-in.bmscdn.com'],
    },
    env:{
        CLIENT_ID:process.env.CLIENT_ID,
        CLIENT_SECRET:process.env.CLIENT_SECRET,
        NEXTAUTH_URL:process.env.NEXTAUTH_URL,
        NEXTAUTH_SECRET:process.env.NEXTAUTH_SECRET,
        DATABASE_URL:process.env.DATABASE_URL,
        NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
        CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
        NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
    }
}

module.exports = nextConfig
