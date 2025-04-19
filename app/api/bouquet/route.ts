import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { dbConnect } from "@/lib/mongoose";
import { Bouquet } from "@/lib/models/bouquet";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(request: Request) {
  await dbConnect()

  try {
    const body = await request.json()
    const { title, image } = body

    if (!title || !image) {
      return NextResponse.json(
        { error: "Title and image URL are required" },
        { status: 400 }
      )
    }

    const uploadResponse = await cloudinary.uploader.upload(image, {
      folder: "bouquets",
    })

    const bouquet = await Bouquet.create({
      title,
      imageUrl: uploadResponse.secure_url,
      votes: 0,
    })

    return NextResponse.json(bouquet, { status: 201 })
  } catch (error) {
    console.log("Error creating bouquet:", error)
    return NextResponse.json(
      { error: "Error creating bouquet" },
      { status: 500 }
    )
  }
}

export async function GET() {
  await dbConnect()

  try {
    const bouquets = await Bouquet.find()
      .sort({ votes: -1 })
      .populate("comments")

    return NextResponse.json(bouquets, { status: 200 })
  } catch (error) {
    console.log("Error fetching bouquets:", error)
    return NextResponse.json(
      { error: "Error fetching bouquets" },
      { status: 500 }
    )
  }
}
