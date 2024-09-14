import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useLocation } from 'react-router-dom'
// import { router } from '../../../server/route';


const socket = io.connect('http://localhost:5000');

const Chat = () => {
  
  
  const location = useLocation();
  const { search } = location;
  const [state, setState] = useState([]);

  const [params, setParams] = useState(null);

  
  useEffect(() => {
    const searchParams = Object.fromEntries(new URLSearchParams(search));
    setParams(searchParams);
    console.log(params);
    
    socket.emit("join", searchParams);
  },[search]);

  useEffect(()=>{
    socket.on('message', ({ data }) => {
      setState((_state)=>([ ..._state, data ]));
      
      
    });
  },[]);


  return (
    <div>Chat</div>
  )
}

export default Chat