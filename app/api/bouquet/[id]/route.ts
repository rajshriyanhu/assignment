import { Bouquet } from "@/lib/models/bouquet";
import { dbConnect } from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await context.params;

    const bouquet = await Bouquet.findById(id)
      .populate("comments")

    if (!bouquet) {
      return NextResponse.json(
        { error: "Bouquet not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(bouquet, { status: 200 });
  } catch (error) {
    console.log("Failed to fetch bouquet by id", error);
    return NextResponse.json(
      { error: "Failed to fetch bouquet." },
      { status: 500 }
    );
  }
}


export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await context.params;

    const bouquet = await Bouquet.findByIdAndUpdate(
      id,
      { $inc: { votes: 1 } },
      { new: true }
    )
      .populate("comments")

    if (!bouquet) {
      return NextResponse.json(
        { error: "Bouquet not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(bouquet, { status: 200 });
  } catch (error) {
    console.log("Failed to update bouquet", error);
    return NextResponse.json(
      { error: "Failed to update bouquet." },
      { status: 500 }
    );
  }
}