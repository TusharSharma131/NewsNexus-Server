const express = require('express');
const app = express();
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

const corsOptions = {
   origin : "https://news-nexus-application.netlify.app/",
   methods: "GET, POST, PUT, PATCH, DELETE",
   credentials: true, 
};

app.use(cors(corsOptions));

const authRoutes =  require('./routes/auth-routes');
const connectDB = require("./Database/DBconnection")
const errorMessages = require("./middlewares/error-middleware");


//this middleware comes always before routes
app.use(express.json());

//this is router middleware which handle multiple requests
app.use("/api/auth", authRoutes);

//this middleware comes always after routes
app.use(errorMessages)


app.get("/", (req, res) =>{
    res.send("Hi, Server is live now!");
})

const start = async() =>{
    try{
      await connectDB(process.env.MongoDB_URL)
      app.listen(PORT, ()=>{
        console.log(`Server is running on PORT ${PORT}`);
      })
    } catch(err){
       console.error(err);
    }
}
start();
