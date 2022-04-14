const express = require("express");
const app = express();
const cors = require('cors')
app.use(cors())
app.use(express.json())

const sid = "AC3c8e6b241094580da99376d974857061";
const token = "c927d59efebbcb24fafe5fb5844d3ac2";
const client = require("twilio")(sid, token);
app.get("/", (req, res) => {
  res.send("Hello from nodejs");
});
app.post("/sendMsg", (req, res) => {
  const { message, sender, receiver } = req.body;
  try{
    client.messages
    .create({
      body: message,
      from: sender,
      to: receiver,
    })
    .then((message) => {
        console.log(message.sid)
        res.json('Message Sent Successfully')
    }).catch(err => {
        console.log(err)
        if(err.code === 21608){
            res.json('This number is unverified. Please use verified number +8801641739025')
        }
    })
    
    
  }
  catch(err){
    res.send(err)
  }
});
app.listen(5000, () => {
  console.log("server running");
});
console.log(app.get);
