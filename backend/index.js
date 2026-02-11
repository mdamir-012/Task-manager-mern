const express=require("express");
const cors=require("cors");
const { connection } = require("./config/db");
const app=express();

app.use(express.json());

app.get("/",(_req,res)=>{
    res.send("welcome to backend  Api");
})

app.use(cors())

app.listen(8000, async()=>{
    try{
        await connection;
        console.log("connected to mongoDB !")

    }
    catch(error){
        console.log(error)
        console.log("error while connecting to mongoDB")
    }
    console.log("listening on port 8000");
})