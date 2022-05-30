import { Avatar } from '@mui/material'
import React from 'react'
import './SidebarChat.css';
import { useState,useEffect } from 'react';

function SidebarChat() {

  const [seed, setseed] = useState("");

  useEffect(() => {
    setseed(Math.floor(Math.random()* 5000));
    
  }, [])

  return (

    


  <div className='sidebarChat'>
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
        <div className='sidebarchat_info'>
            <h1>room name</h1>
            <p>last message</p>
        </div>
    </div>
  )
}

export default SidebarChat