const express=require("express")
const database=require("./database")
const getRouter=require("./getController")
const postRouter=require("./postController")
const loginRouter=require("./Admin/login")
const putRouter=require("./putController")
const dotenv=require("dotenv")

dotenv.config()
const app=express()
app.use(express.json())
app.use(loginRouter)
app.use(getRouter)
app.use(postRouter)
app.use(putRouter)
app.listen(3000,()=>{
    console.log("Server running at port 3000");
})