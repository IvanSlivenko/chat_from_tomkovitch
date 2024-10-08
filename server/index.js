const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const  app = express();
const route = require('./route');
const { addUser, findUser, getRoomUsers, removeUser } = require('./users');

app.use(cors({ origin: "*" }));
app.use(route);


const server = http.createServer(app);

const io = new Server(server,{
     cors:{
          origin: "*",
          methods: ["GET", "POST"],
     },
});

io.on("connection", (socket) => {
     socket.on('join', ({ name, lastname, room })=>{
          
          socket.join(room);

          const { user, isExist } = addUser({ name, lastname, room });
          
          const  userMessage = isExist ? `${user.name} ${user.lastname}  з поверненням` : ` Раді вас бачити ${user.name} ${user.lastname}` 

          socket.emit('message',{
               data: { 
                    user: { name: "Admin" },
                    // message: `Hello ${user.name} ${user.lastname}`},
                    message: userMessage},
          });

          socket.broadcast.to(user.room).emit('message', {
               data: { 
                    user: { name: "Admin" },
                    message: `${user.name} ${user.lastname} has joined`},
               });

               io.to(user.room).emit('room', {
                    data: {
                         room: user.room,
                         users: getRoomUsers(user.room)

                    }
               })
     });

     socket.on('sendMessage', ({ message, params })=>{
          const user = findUser(params);
          if(user){
               io.to(user.room).emit('message', { data: { user, message } });
          }
     });

     socket.on('leftRoom', ({ params })=>{
          const user = removeUser(params);
          if(user){
               const { room, name, lastname } = user;

               io.to(room).emit('message', { 
                    data: { user:{ name: "Admin"}, message: ` Користувач ${name} ${lastname} вийшов з чату. ` },
               });

               io.to(user.room).emit('room', {
                    data: {
                         room: room,
                         users: getRoomUsers(room)

                    }
               })

          }
     })

     


     io.on('disconnect', () => {
          console.log('disconnect');
          
     })
     
})




server.listen(5000, ()=>{
     console.log('Server is running ');
     
})