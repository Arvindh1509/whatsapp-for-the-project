//importing
import express from 'express'
import mongoose from 'mongoose'
import Messages from './dbMessages.js'
import Pusher from 'pusher';//the middleware which makes the project and mongodb the realtime one
import cors from 'cors'

//app config
const app=express(); //creating application instance
const port=process.env.PORT || 9000;//specifying a port 

const pusher = new Pusher({
    appId: "1353258",
    key: "a44e8c159a4eabd3acf6",
    secret: "a23b960b963b25cfa1ad",
    cluster: "ap2",
    useTLS: true
  });

//middleware
app.use(express.json())//uses the server to get the data also shown in the api
app.use(cors() )


//DB config
mongoose.connect('mongodb+srv://Arvindh007:rockstar007@cluster0.bmxmp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
                ,{
                    // useCreateIndex: true,
                    // useNewUrlParser:true,
                    // useUnifiedTopology:true
                })

const db=mongoose.connection       
db.once('open',()=>{
    console.log("db is connected");

    const msgCollection=db.collection("messagecontents");
    const changeStream=msgCollection.watch();

    changeStream.on('change',(change)=>{         //change stream:listens and watches the application and if there's a change, it triggers the pusher

        console.log("a change occured",change);

        if(change.operationType=='insert'){         //shows the newly posted message as an inserted message in the console
             const messageDetails=change.fullDocument;
             pusher.trigger('messages','inserted',{
                 name:messageDetails.name,
                 message:messageDetails.message,
                 timestamp:messageDetails.timestamp,
                 received:messageDetails.received
               
             });}
             else{
                 console.log('error triggering Pusher')
             }
        
    })
})
//?

//api routes
app.get('/',(req,res)=>res.status(200).send('hello world')); 
app.get('/messages/sync',(req,res)=> {      //for retreiving messages
    const dbmessage=req.body
    Messages.find(dbmessage,(err,data)=>{
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(200).send(data)
        }
    })
})

app.post('/messages/new',(req,res)=> { //for posting new mwssages
    const dbmessage=req.body
    Messages.create(dbmessage,(err,data)=>{
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(201).send(data)
        }
    })
})

//get it listen what we say
app.listen(port,()=>console.log(`Listening on Localhost:${port}`));