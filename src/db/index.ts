import mongoose from "mongoose"

export async function dbConnection() {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}/${process.env.DB_NAME}`);
    
    const connection = mongoose.connection;

    connection.on('connected', () => {
      console.log("Mongodb Connected");
    });

    connection.on('error', () => {
      console.log("Mongodb Connection Error");
      process.exit(1);
    });
  }
  catch(err) {
    console.log("Kuch garbar ho gaya hai db connect karty samay :: "+err);
  }
}

