import dotenv from "dotenv";
import connectDB from "./db/index.js";
import {app} from './app.js';

dotenv.config(
    {
        path: './.env' // Fixed path to .env file
    }
)

connectDB()
.then(()=>
{
     app.on("error",(error)=>
    {
        console.log("error",error)
        throw error
    }) 
    app.listen(process.env.PORT|| 8000,()=>
    {
        console.log("SERVER IS CONNECTED AND RUNNING")
    })
})
.catch((err)=>
{
    console.error("MONGO DB CONNECTION FAILED", err)

})

