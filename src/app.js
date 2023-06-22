import express from "express"
import cors from "cors"

let user = {username:"", avatar:""}
const tweets = []

const app = express()
app.use(express.json())
app.use(cors())
app.listen(5000,()=>console.log("Server running on port 5000"))

app.post("/sign-up",(req,res)=>{
    let login = {
        username: req.body.username,
        avatar: req.body.avatar
    }
    user = login
    res.sendStatus(200)
})

app.post("/tweets",(req,res)=>{
    if(!req.body.username){
        res.send("UNAUTHORIZED")
    }else{
        const message = {
            username: req.body.username,
            tweet: req.body.tweet,
            avatar: user.avatar
        }
        tweets.push(message)
        if(tweets.length>10){
            tweets.shift()
        }
        res.sendStatus(200)
    }
})

app.get("/tweets",(req,res)=>{
    res.send(tweets)
})