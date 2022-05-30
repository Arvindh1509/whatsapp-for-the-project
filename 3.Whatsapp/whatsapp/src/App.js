import React from "react";
import './App.css';
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import Pusher from 'pusher-js'
import { useEffect,useState } from "react";
import axios from "./axios";

function App() {
const [messages,setMessages]=useState([]);
useEffect(()=>{
  axios.get('/messages/sync').then(response=>{
   setMessages(response.data);
  })
})

    useEffect(() => {
    const pusher = new Pusher('a44e8c159a4eabd3acf6', {
        cluster: 'ap2'
      });
  
      const channel = pusher.subscribe('messages');
      channel.bind('inserted', data =>{
     
        setMessages([...messages,data])
      });
    },[]);

    useEffect(() => {
      const pusher = new Pusher('a44e8c159a4eabd3acf6', {
          cluster: 'ap2'
        });
    
        const channel = pusher.subscribe('messages');
        channel.bind('inserted', newMessage =>{
         
          setMessages([...messages,newMessage])
        });
        return()=>{
          channel.unbind_all();
          channel.unsubscribe();
        };
      },[messages]);
    console.log(messages);
     
  return (
    <div className="App">
      <div className="App_body">
   
   <Sidebar />
    <Chat messages={messages}/>

    
      </div>
 

    </div>
  );
}

export default App;
