const express = require("express"); // access the express
const socket = require("socket.io");

const app = express(); // initialized the server ready

app.use(express.static("frontModule"));

let PORT = 5000;
let server = app.listen(PORT,()=>{
    console.log("Listening to the port" + PORT);
})

let io = socket(server);

io.on("connection",(socket)=>{
    console.log("socket connection successfully");

    // data received to server
    socket.on("beginPath",(data)=>{
        //data -> data from frontend
        // now transfer data to all connected computers
        io.sockets.emit("beginPath", data);
    })

    socket.on("drawStroke",(data)=>{
        io.sockets.emit("drawStroke",data);
    })

    socket.on("redoUndo",(data)=>{
        io.sockets.emit("redoUndo",data);
    })
})