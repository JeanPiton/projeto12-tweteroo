import express from "express"
import cors from "cors"

const user = []
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
    if((!login.username||typeof login.username!='string')||(!login.avatar||typeof login.avatar!='string')){
        res.sendStatus(400)
        return
    }
    user.push(login)
    res.status(201).send("OK")
})

app.post("/tweets",(req,res)=>{
    let username = req.headers.user
    if(!req.headers.user){
        if(!req.body.username){
            res.status(401)
            return
        }
        username = req.body.username
    }
    if(user.find(e=>e.username==req.headers.user).length==0){
        res.status(401).send("UNAUTHORIZED")
        return
    }
    if(!req.body.tweet||typeof req.body.tweet!="string"){
        res.status(401)
        return
    }
    const message = {
        username: username,
        tweet: req.body.tweet,
        avatar: user.find(e=>e.username == username).avatar
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
    if(isNaN(page)){
        page = 1
    }
    console.log(page)
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