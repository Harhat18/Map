import mongoose from "mongoose";

export const DB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Successfully connected to DB");
  } catch (error) {
    console.log("Error connecting to DB", error);
  }
};
