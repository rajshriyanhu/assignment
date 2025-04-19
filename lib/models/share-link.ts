import { Schema, model, models, Types } from "mongoose"
import { SharedLinkType } from "@/types/model"

const SharedLinkSchema = new Schema<SharedLinkType>({
  bouquets: [{ type: Types.ObjectId, ref: "Bouquet" }],
  createdAt: { type: Date, default: Date.now },
})

export const SharedLink =
  models.SharedLink || model<SharedLinkType>("SharedLink", SharedLinkSchema)