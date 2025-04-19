import { Schema, model, models } from "mongoose"
import { CommentType } from "@/types/model"

const CommentSchema = new Schema<CommentType>({
  name: { type: String, required: true },
  message: { type: String, required: true },
  bouquetId: { type: Schema.Types.ObjectId, ref: "Bouquet", required: true },
  createdAt: { type: Date, default: Date.now },
})

export const Comment = models.Comment || model<CommentType>("Comment", CommentSchema)