import { Types } from "mongoose"

export interface CommentType {
  name: string
  message: string
  bouquetId: Types.ObjectId
  createdAt?: Date
}

export interface BouquetType {
  title: string
  imageUrl: string
  votes?: number
  comments?: Types.DocumentArray<CommentType>
  shares?: Types.ObjectId[] // Ref to SharedLink[]
}

export interface SharedLinkType {
  bouquets: Types.ObjectId[] // Ref to Bouquet[]
  createdAt?: Date
}