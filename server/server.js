const express = require("express");
const app  = express();

const server = require("http").createServer(app);
// const io = require("socket.io")(server);
const { Server } =require("socket.io");

const io = new Server(server);

//routes 
app.get("/",(req,res)=>{
    res.send("this is mern realtime board sharing app official server by SShirot")
})

io.on("connection",(socket)=>{
    console.log("User connected");
})
const port = process.env.PORT || 5000;
server.listen(port,() => console.log("server is running on http://localhost:5000"))