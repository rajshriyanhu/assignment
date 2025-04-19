import { SharedLink } from "@/lib/models/share-link";
import { dbConnect } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {

  try {
    await dbConnect();
    const { id } = await context.params;

    const share = await SharedLink.findOne({ _id: id }).populate('bouquets')

    if (!share) {
      return NextResponse.json(
        { error: "Share not found." },
        { status: 404 }
      )
    }

    return NextResponse.json(share, { status: 200 })
  } catch (error) {
    console.log("Failed to fetch share by id", error)
    return NextResponse.json(
      { error: "Failed to fetch share." },
      { status: 500 }
    )
  }
}
