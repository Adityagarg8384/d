const express= require("express");
const app= express();
const cors= require("cors");
const http= require("http");
const {Server}= require("socket.io");
const File = require("./models/file");


const server= require('http').createServer(app);

app.use(cors());
app.use(express.json());

const io= new Server(server,{
    cors:{
        origin:'*',
    }
});
server.listen(5001,()=>{
    console.log("Successfully listen");
})

try{
    io.on("connection", (socket)=>{
    })
}
catch(err){
    console.log(err);
}

async function watchforexpires(){
    const changeStream= File.watch();
    changeStream.on('change', async(change)=>{
        if(change.operationType==='delete'){
            io.emit('message',"Hello world");
        }
    })
}

watchforexpires();
