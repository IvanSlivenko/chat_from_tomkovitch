import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useLocation, useNavigate } from 'react-router-dom'
// import { router } from '../../../server/route';
import EmojiPicker from "emoji-picker-react"

import styles from "../styles/Chat.module.css"
import icon from "../images/emoji2.svg"

import Messages from './Messages';


const socket = io.connect('http://localhost:5000');

const Chat = () => {
  
  
  const location = useLocation();
  const { search } = location;
  const navigate = useNavigate();
  const [state, setState] = useState([]);
  const [params, setParams] = useState({ room: "", user: "", lastname: "" });
  const [message, setMessage] = useState("");
  const [isOpen, setOpen] = useState(false);
  const [users, setUsers] = useState(0);

  
  useEffect(() => {
    const searchParams = Object.fromEntries(new URLSearchParams(search));
    setParams(searchParams);
    
    socket.emit("join", searchParams);
  },[search]);

  useEffect(()=>{
    socket.on('message', ({ data }) => {
      setState((_state)=>([ ..._state, data ]));
      
      
    });
  },[]);

  useEffect(()=>{
    socket.on('room', ({ data: { users } }) => {
      setUsers(users.length)
    });
  },[]);



  const leftRoom = () =>{
    socket.emit('leftRoom', { params });
    navigate('/')

  };
  const handleChange = ({target: {value}}) => setMessage(value);
  const handleSubmit = (e) => {

    e.preventDefault();

    if(!message) return;
    socket.emit('sendMessage', { message, params });

    setMessage("");
  };
  const onEmojiClick = ({emoji}) => setMessage(`${message} ${emoji}`);
  

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <div className={styles.title}  >{params.name} {params.lastname} в "{params.room}"  </div>
        <div className={styles.users}> 
              Користувачів у цій кімнаті: {users} </div>
        <button className={styles.left} onClick={leftRoom}>
          Left the room
        </button>
      </div>

      <div className={styles.messages}>
        <Messages messages={state} name={params.name} lastname={params.lastname}/>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.input}>
          <input
            type="text"
            name="message"
            placeholder="Напишіть ваше повідомлення?"
            value={message}
            onChange={handleChange}
            autoComplete="off"
            required
          />
        </div>
        <div className={styles.emoji}>
          <img src={icon} alt="" onClick={() => setOpen(!isOpen)} />

          {isOpen && (
            <div className={styles.emojies}>
              <EmojiPicker onEmojiClick={onEmojiClick} />
            </div>
          )}
        </div>

        <div className={styles.button}>
          <input type="submit" onSubmit={handleSubmit} value="Send a message" />
        </div>
      </form>
    </div>
  );
};

export default Chat