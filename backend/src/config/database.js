import mongoose from "mongoose"

const connectDB = async () => {

    try {
        // console.log(`${process.env.MONGODB_URI} !!!!!!!!!!!!!!!!!`);
        const connectionInstance = await mongoose.connect
        (`${process.env.MONGODB_URI}`)  
        console.log(`\n Mongodb connctd !!!
            ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB CNNCTION FAILED !!! ",error);
        process.exit(1)
        
    }   
}

export default connectDB;