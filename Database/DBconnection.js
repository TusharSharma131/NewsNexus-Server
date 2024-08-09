const mongoose = require('mongoose');

const connectDB = (uri, next) =>{
   try{
     console.log("Database Connected");
     return mongoose.connect(uri);
   } catch(err)
   {
    const status = 500;
    const message = "Failed to connect with Database";

    const error = {
      status,
      message,
    };

     next(error);
   }
}

module.exports = connectDB;