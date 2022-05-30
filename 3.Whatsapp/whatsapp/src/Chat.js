import SearchOutlined from '@mui/icons-material/SearchOutlined'
import { Avatar, IconButton } from '@mui/material'
import React from 'react'
import "./Chat.css"
import AttachFile from '@mui/icons-material/AttachFile'
import MoreVert from '@mui/icons-material/MoreVert'
import MicIcon from '@mui/icons-material/Mic'
import InsertEmoticon from "@mui/icons-material/InsertEmoticon";
import { useState , useEffect} from 'react'
import axios from './axios'


function Chat({ messages }) {
  const [input, setInput] = useState("");
  const [seed, setseed] = useState("");

  useEffect(() => {
    setseed(Math.floor(Math.random()* 5000));
    
  }, [])

    const sendMessage = async (e) => {
        e.preventDefault();

        await axios.post("/messages/new", {
            "message": input,
            "name": "ROCKSTAR",
            "timestamp": "Just Now",
            "receiver": false
        })

        setInput("");

        console.log(input);
    }




  return (
    <div className='chat'> 
      <div className='chat_header'>
      <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
        <div className='chatheader_info'>
          <h2>room name</h2>
          <p>last seen</p>
        </div>
        <div className='chatheader_right'>
          <IconButton>
            <SearchOutlined/>
          </IconButton>
          <IconButton>
            <AttachFile/>
          </IconButton>
          <IconButton>
            <MoreVert/>
          </IconButton>
        </div>
      </div>
      <div className='chat_body'>
        {messages.map((message)=>(
            <p className={`chat_message ${message.received && "chat_receiver"}`}>
            <span className='chat_name'>{message.name}</span>
              {message.message}
              <span className='chat_time'>
                {message.timestamp}
              </span>          
              </p>
        ))}
        </div>
        

          
      <div className='chat_footer'>
        <InsertEmoticon/>
        <form
                    value={input}
                    onChange={e => setInput(e.target.value)}
                >
                    <input placeholder="Type a message" type="text" value={input}/>
                    <button onClick={sendMessage} type="submit">Send a message</button>
                </form>
        <MicIcon/>
      </div>
    </div>
  )
}

export default Chat