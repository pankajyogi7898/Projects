import mongoose from 'mongoose';

async function connectToDB() {
    await mongoose.connect(process.env.MONGO_URL)
        .then(() => {
            console.log("database connected successfully.")
        })
}

export default connectToDB
