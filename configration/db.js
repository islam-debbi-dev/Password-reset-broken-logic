const mongoose = require("mongoose");


async function connectDB() {
    try{
    await mongoose.connect("mongodb://localhost:27017/home-work", {
    }).then(() => {
        console.log('Connected to MongoDB');
    }).catch((err) => {
        console.error('Error connecting to MongoDB', err);
    });
}catch(err){
    console.log(err);
}
}

module.exports = connectDB;