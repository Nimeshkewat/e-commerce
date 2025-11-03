import mongoose from "mongoose";

function connectDb(){
    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log('Db Connected');
    }).catch(error => {
        console.log(`Error connecting to db: ${error}`);
    })
}

export default connectDb;