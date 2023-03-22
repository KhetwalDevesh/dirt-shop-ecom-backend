import mongoose from "mongoose";
const connectToDatabase = async () => {
	try {
		const connection = await mongoose.connect(`${process.env.MONGO_URI}`);
		if (connection) {
			console.log(`Connected to database ${connection.connection.host}`);
		}
	} catch (error) {
		console.log("error in connectToDatabase", error);
		throw error;
	}
};

export default connectToDatabase;
