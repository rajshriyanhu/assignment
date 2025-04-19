import mongoose from "mongoose"

declare global {
  // eslint-disable-next-line no-var
  var mongooseConn: {
    conn: typeof mongoose | null
    promise: Promise<typeof mongoose> | null
  }
}

const globalWithMongoose = globalThis as typeof globalThis & {
  mongooseConn?: {
    conn: typeof mongoose | null
    promise: Promise<typeof mongoose> | null
  }
}

let cached = globalWithMongoose.mongooseConn

if (!cached) {
  cached = globalWithMongoose.mongooseConn = {
    conn: null,
    promise: null,
  }
}

export async function dbConnect(): Promise<typeof mongoose> {
  if (cached.conn) return cached.conn

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGODB_URI!)
  }

  cached.conn = await cached.promise
  return cached.conn
}