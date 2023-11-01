const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const messagesRouter = require('./routes/messages')

const app = express()
app.use(express.json())
app.use('/api/v1/messages', messagesRouter)
dotenv.config()

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.listen(3000, () => console.log('Server Started'))

// const subscribersRouter = require('./routes/subscribers')
// app.use('/subscribers', subscribersRouter)

// import express from 'express';
// import { getAll, getById, create, update, deleteById } from './services/messages-service.js';
// const port = 3000;

// const app = express();
// app.use(express.json());

// app.get("/api/v1/messages", async (req, res) => {
//   const messages = await getAll();
//   displayMessage(messages, res, 200);
// })

// app.get("/api/v1/messages/:id", async (req, res) => {

//   const messageId = req.params.id
//   if (isNaN(messageId)) {
//     const json = JSON.parse('{"message": "Specific ID Not Found"}')
//     displayMessage(json, res, 200);
//     return;
//   }

//   const message = await getById(messageId);
//   if (message == null) {
//     const json = JSON.parse('{"message": "Specific Message Not Found"}')
//     displayMessage(json, res, 200);
//     return;
//   }

//   displayMessage(message, res, 200);

// })

// app.post("/api/v1/messages", async (req, res) => {
  
//   await create(req.body.text);
//   const json = JSON.parse('{"message": "New Message was added"}')
//   displayMessage(json, res, 200);

// })

// app.put("/api/v1/messages", async (req, res) => {
  
//   await update(req.body);
//   const json = JSON.parse('{"message": "Message was updated"}')
//   displayMessage(json, res, 200);

// })

// app.delete("/api/v1/messages/:id", async (req, res) => {
  
//   const messageId = req.params.id
//   if (isNaN(messageId)) {
//     const json = JSON.parse('{"message": "Specific ID Not Found"}')
//     displayMessage(json, res, 200);
//     return;
//   }

//   const messageCurrent = getById(messageId);
//   if (!messageCurrent) {
//     const json = JSON.parse('{"message": "Specific Message Not Found"}')
//     displayMessage(json, res, 200);
//     return; 
//   }

//   await deleteById(messageId);
//   const json = JSON.parse('{"message": "Message was deleted"}')
//   displayMessage(json, res, 200); 

// })

// app.all("*", (req, res) => {
//   const json = JSON.parse('{"message": "Error: Resource Not Found. Please use following API path: /api/v1/messages"}')
//   displayMessage(json, res, 404);
// })

// app.listen(port, function(error) {
//   if (error) {
//     console.log('Something went wrong', error)
//   } else {
//     console.log('Server is listening on port ' + port)
//   }
// });

// function displayMessage(json, res, statusCode) {

//   res.statusCode = statusCode;
//   res.setHeader('Content-Type', 'application/json');
//   res.end(JSON.stringify(json));

// }