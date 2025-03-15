const express = require("express"); // access the express
const socket = require("socket.io");

const app = express(); // initialized the server ready

let PORT = 5000;
let server = app.listen(PORT,()=>{
    console.log("Listening to the port" + PORT);
})