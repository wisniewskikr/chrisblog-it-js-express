import express from 'express';
import { getAll, getById, add, update, deleteById } from './services/messages-service.js';
const port = 3000;

const app = express();
app.use(express.json());

app.get("/api/v1/messages", (req, res) => {
  handleReadAll(res);
})

app.get("/api/v1/messages/*", (req, res) => {
  handleRead(req, res);
})

app.post("/api/v1/messages", (req, res) => {
  handleCreate(req, res);
})

app.put("/api/v1/messages", (req, res) => {
  handleUpdate(req, res);
})

app.delete("/api/v1/messages/*", (req, res) => {
  handleDelete(req, res); 
})

app.all("*", (req, res) => {
  const json = JSON.parse('{"message": "Error: Resource Not Found. Please use following API path: /api/v1/messages"}')
  displayMessage(json, res, 404);
})

app.listen(port, function(error) {
  if (error) {
    console.log('Something went wrong', error)
  } else {
    console.log('Server is listening on port ' + port)
  }
});

// ***** HELP METHODS ***** //

function handleReadAll(res) {
  
  let messages = getAll();
  displayMessage(messages, res, 200);

}

function handleRead(req, res) {

  const messageId = parseInt(req.url.substring(req.url.lastIndexOf('/') + 1));
  if (isNaN(messageId)) {
    const json = JSON.parse('{"message": "Specific ID Not Found"}')
    displayMessage(json, res, 200);
    return;
  }

  const message = getById(messageId);
  if (message == null) {
    const json = JSON.parse('{"message": "Specific Message Not Found"}')
    displayMessage(json, res, 200);
    return;
  }

  displayMessage(message, res, 200);

}

function handleCreate(req, res) {

  add(req.body);
  const json = JSON.parse('{"message": "New Message was added"}')
  displayMessage(json, res, 200); 

}

function handleUpdate(req, res) {    

  update(req.body);
  const json = JSON.parse('{"message": "Message was updated"}')
  displayMessage(json, res, 200);

}

function handleDelete(req, res) {
  
  const messageId = parseInt(req.url.substring(req.url.lastIndexOf('/') + 1));
  if (isNaN(messageId)) {
    const json = JSON.parse('{"message": "Specific ID Not Found"}')
    displayMessage(json, res, 200);
    return;
  }

  const messageCurrent = getById(messageId);
  if (!messageCurrent) {
    const json = JSON.parse('{"message": "Specific Message Not Found"}')
    displayMessage(json, res, 200);
    return; 
  }

  deleteById(messageId);
  const json = JSON.parse('{"message": "Message was deleted"}')
  displayMessage(json, res, 200); 

}

function displayMessage(json, res, statusCode) {

  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(json));

}