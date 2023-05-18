// require all npm 
const express=require("express");
const mongoose= require("mongoose");
const bodyParser=require("body-parser");
const ejs=require("ejs");

//dot env file equipment
require("dotenv").config();
const PORT=process.env.PORT;
console.log("URI is : ",process.env.URI);
console.log("port is "+process.env.PORT );

//routes
const userRoute = require("./routes/userRoute");
const user_route = require("./routes/userRoute");

// using app
const app=express();


//for static folder public
app.use(express.static("public"));

//for body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// for ejs
// app.set('view engine' , ejs);
app.set('view engine', 'ejs');


//mongoose connection
mongoose.set({strictQuery:true});
mongoose.connect("mongodb://127.0.0.1:27017/bookdata",()=>{

    try {
        console.log("database is connected");
    } catch (error) {
        console.log("theres an error "+error);
    }
});
  
 
//for user route
// app.get("/",async(req,res)=>{
//     res.send("heyy");
// })

 app.use("/",userRoute);
//  app.use("/",productRoute);

// server listen on port
app.listen(PORT,()=>{
    console.log("server is running at http://localhost:"+PORT);
}) 