import { Bouquet } from "@/lib/models/bouquet"
import { SharedLink } from "@/lib/models/share-link"
import { dbConnect } from "@/lib/mongoose"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    await dbConnect();
    const { bouquetIds } = await request.json()

    if (!bouquetIds || !Array.isArray(bouquetIds) || bouquetIds.length === 0) {
      return NextResponse.json(
        { error: "Valid bouquet IDs array is required" },
        { status: 400 }
      )
    }

    const bouquets = await Bouquet.find({ _id: { $in: bouquetIds } })

    if (bouquets.length !== bouquetIds.length) {
      return NextResponse.json(
        { error: "Some bouquet IDs are invalid" },
        { status: 400 }
      )
    }

    const sharedLink = await SharedLink.create({
      bouquets: bouquetIds.map(id => ({ _id: id })),
    })

    return NextResponse.json({
      id: sharedLink._id,
    }, { status: 201 })

  } catch (error) {
    console.log("Error creating shared link:", error)
    return NextResponse.json(
      { error: "Failed to create shared link" },
      { status: 500 }
    )
  }
}
