import mongoose from "mongoose";
import { DB_name } from "../constants.js";


const connectDB = async () => {
    try {
       const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_name}`) // url + db name
       console.log(`\n MongoDB coonected!! DB_HOST: ${connectionInstance.connection.host}`);
       
    } catch (error) {
        console.error("Mongodb Connection Failed!!" , error);
        process.exit(1);
    }
}
export default connectDB;