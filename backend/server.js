
const express =require ('express');

const env = require ('dotenv')
const connectDB = require ('./config/db.js')
const userRoutes = require ('./routes/userRoutes.js'
)

const http = require('http');

const app = express()
const server = http.createServer(app);

const socketio = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  });
  socketio.on('connection',socket=>{

    socket.on('welcome',msg=>{
        //console.log(msg)
    })
    


    socket.on('MsgToServer', msg => {
       // socket.emit('MsgFromServer',msg)
        socketio.sockets.emit('MsgFromServer', msg);

    })

})


app.use(express.json())
env.config()
connectDB()
app.use('/api/users', userRoutes)


const PORT = process.env.PORT || 5000
server.listen(PORT, console.log(`server running on port : `+ PORT))


/*


io.on('connection',(socket)=>{

    socket.on('newMessageToServer',(msg)=>{
        console.log(msg)
    })

    socket.emit('welcome','welcome home')
    
})*/




