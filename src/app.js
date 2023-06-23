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
    res.send("OK")
    res.sendStatus(201)
})

app.post("/tweets",(req,res)=>{
    if(!user.username){
        res.send("UNAUTHORIZED")
        res.sendStatus(401)
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
        res.send("OK")
        res.sendStatus(201)
    }
})

app.get("/tweets",(req,res)=>{
    res.send(tweets)
})