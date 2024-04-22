import mongoose from "mongoose";

const connect = async () => {
  try {
    await mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default connect;
