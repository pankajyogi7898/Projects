const mongoose = require("mongoose")

async function connectToDB() {
    await mongoose.connect(process.env.MONGO_URL)
        .then(() => {
            console.log("database connect successfully..")
        })

}

module.exports = connectToDB