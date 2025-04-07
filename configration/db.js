const mongoose = require("mongoose");


async function connectDB() {
    try{
        await mongoose.connect(process.env.MONGO_URL_CLOUD , {
        }).then(() => {
            console.log('Connected to cloud MongoDB');
        }).catch((err) => {
            console.error('Error connecting to MongoDB', err);
        });
}catch(err){
    console.log(err);
}
}

module.exports = connectDB;