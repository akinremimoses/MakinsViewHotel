import mongoose from "mongoose";

declare global {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	var mongoose: any
}

const URI = process.env.MONGODB_URI;

if (!URI) {
	throw new Error("Can't find mongodb URI");
}

let cache = global.mongoose;

if (!cache) {
	cache = global.mongoose = {
		conn: null,
		promise: null
	}
}

const dbConnect = async () => {
	if (cache.conn) {
		return cache.conn;
	}

	if (!cache.promise) {
		const opts = { bufferCommands: true }
		cache.promise = mongoose.connect(URI, opts).then(mongoose => mongoose)
	}

	try {
		cache.conn = await cache.promise;
	} catch (error) {
		cache.promise = null;
		throw error;
	}

	return cache.conn
}

export default dbConnect;

