const express = require('express');
const Info = require('./models/info')
const messagesService = require('./services/messages-service');
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
  displayMessage(new Info('Error: Resource Not Found. Please use following API path: /api/v1/messages'), res, 404);
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
  
  let messages = messagesService.getAll();
  displayMessage(messages, res, 200);

}

function handleRead(req, res) {

  const messageId = parseInt(req.url.substring(req.url.lastIndexOf('/') + 1));
  if (isNaN(messageId)) {
    displayMessage(new Info('Specific ID Not Found'), res, 200);
    return;
  }

  const message = messagesService.getById(messageId);
  if (message == null) {
    displayMessage(new Info('Specific Message Not Found'), res, 200);
    return;
  }

  displayMessage(message, res, 200);

}

function handleCreate(req, res) {

  messagesService.add(req.body);
  displayMessage(new Info('New Message was added'), res, 200); 

}

function handleUpdate(req, res) {    

  messagesService.update(req.body);
  displayMessage(new Info('Message was updated'), res, 200);

}

function handleDelete(req, res) {
  
  const messageId = parseInt(req.url.substring(req.url.lastIndexOf('/') + 1));
  if (isNaN(messageId)) {
    displayMessage(new Info('Specific ID Not Found'), res, 200);
    return;
  }

  const messageCurrent = messagesService.getById(messageId);
  if (!messageCurrent) {
    displayMessage(new Info('Specific Message Not Found'), res, 200);
    return; 
  }

  messagesService.delete(messageId);
  displayMessage(new Info('Message was deleted'), res, 200); 

}

function displayMessage(json, res, statusCode) {

  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(json));

}