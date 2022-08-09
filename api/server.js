// implement your server here
// require your posts router and connect it here
//SERVER SET UP
const express = require("express")
const server = express()
server.use(express.json());

//ROUTER IMPORT AND USE
const router = require("./posts/posts-router")
server.use("/api/posts", router)

 
//SANITY CHECK
server.get("/", (req, res) => {
    res.send("Express is working")
})

module.exports = server