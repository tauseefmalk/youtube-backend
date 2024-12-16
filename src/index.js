// require('dotenv').config({path: "./env"})
import dotenv from "dotenv"
import connectDB from "./db/index.js";
import app from "./app.js";
dotenv.config({
    path: "./env"
})


connectDB()
.then(()=>{
  app.on("error", (error) => {
    console.error("error", error);
    throw error;
  })
  app.listen(process.env.PORT ||3000, ()=>{
    console.log(`App is listening on ${process.env.PORT}`);
    
  })
})
.catch(error => console.log("db connection error",error))





/*
import express from "express";
const app = express();

(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_name}`);
    app.on("error", (error) => {
      console.error("error", error);
      throw error;
    });
    app.listen(process.env.PORT, ()=>{
        console.log(`App is listening on ${process.env.PORT}`);
        
    })
  } catch (error) {
    console.error("error", error);
    throw error;
  }
})();
*/