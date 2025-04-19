import { BouquetType } from "@/types/model"
import { Schema, model, models, Types } from "mongoose"
import "./comment"; // 👈 ensures Comment schema is registered before use

const BouquetSchema = new Schema<BouquetType>({
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
  votes: { type: Number, default: 0 },
  comments: [{type : Types.ObjectId, ref: 'Comment'}],
})

export const Bouquet = models.Bouquet || model<BouquetType>("Bouquet", BouquetSchema)