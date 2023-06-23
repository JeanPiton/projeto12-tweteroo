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
    if((!login.username&&typeof login.username=='string')||(!login.avatar&&typeof login.avatar=='string')){
        res.sendStatus(400)
        return
    }
    user = login
    res.status(201).send("OK")
})

app.post("/tweets",(req,res)=>{
    if(!user.username){
        res.status(401).send("UNAUTHORIZED")
        return
    }
    const message = {
        username: req.headers.user,
        tweet: req.body.tweet,
        avatar: user.avatar
    }
    if((!message.username&&typeof message.username=='string')||(!message.tweet&&typeof message.tweet=='string')){
        res.sendStatus(400)
        return
    }
    tweets.push(message)
    res.status(201).send("OK")
})

app.get("/tweets",(req,res)=>{
    let page = parseInt(req.query.page)
    if(page<=0){
        res.sendStatus(400)
        return
    }
    if(page == undefined){
        page = 1
    }
    let tweet = []
    if(tweets.length>0){
        for(let i = tweets.length-1-(page-1)*10;i>=0&&i>=tweets.length-page*10;i--){
            tweet.push(tweets[i])
        }
    }
    res.send(tweet)
})

app.get("/tweets/:USERNAME",(req,res)=>{
    let userTweets = tweets.filter(e=>e.username==req.params.USERNAME)
    res.send(userTweets)
})