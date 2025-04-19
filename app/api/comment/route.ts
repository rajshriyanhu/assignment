import { Bouquet } from "@/lib/models/bouquet";
import { Comment } from "@/lib/models/comment";
import { dbConnect } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();
    const { bouquetId, message, name } = body;

    if (!bouquetId || !message || !name) {
      return NextResponse.json(
        { error: "bouquetId, message, and name are required." },
        { status: 400 }
      );
    }

    const bouquet = await Bouquet.findById(bouquetId);
    if (!bouquet) {
      return NextResponse.json(
        { error: "Bouquet not found." },
        { status: 404 }
      );
    }

    const comment = await Comment.create({
      name,
      message,
      bouquetId: bouquet._id,
    });

    bouquet.comments.push(comment._id);
    await bouquet.save();

    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    console.log("Error creating comment:", error);
    return NextResponse.json(
      { error: "Error creating comment" },
      { status: 500 }
    );
  }
}