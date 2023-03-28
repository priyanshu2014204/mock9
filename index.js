
const http=require('http')
const express=require('express');
const cors=require('cors');
const app=express()
const path=require('path')
const server=http.createServer(app).listen(8080)
const socketIO=require('socket.io');
const {user}=require('./routes/user');
const connection = require('./config/db');

require('dotenv').config(); 
app.use(express.json())
app.use(cors({
   origin:'*'
}))
app.use('/user',user)

const io=socketIO(server,{
   cors: {
     origin: "*",
     methods: ["GET", "POST"], 
     allowedHeaders: ["my-custom-header"],
     credentials: true
   }
 })
let realpath=path.dirname(__filename).split(path.sep);
 realpath.pop();
 realpath=realpath.join('/');
app.use(cors(
   {
      origin:'*'
   }
))
 
app.get('/',(req,res)=>{
   // res.sendFile(realpath+'/frontend/index.html')
})

let allUser={}

io.on('connection',(socket)=>{
    socket.on('join',(name)=>{
      allUser[socket.id]=name
      socket.broadcast.emit('newuser',name);
    })

    socket.on('send',(m)=>{
      console.log(m)
      socket.broadcast.emit('recieve',{m,name:allUser[socket.id]})
    })


})


// const PORT=process.env.port
