const express = require('express');
const messagesApi = require('./apis/messages-api');
const port = 3000;

const app = express();
app.use(express.json());
app.use(express.static('static'));
app.set('view engine', 'ejs');

// API //
app.get("/api/v1/messages", (req, res) => {
  messagesApi.handleReadAll(res);
})
app.get("/api/v1/messages/*", (req, res) => {
  messagesApi.handleRead(req, res);
})
app.post("/api/v1/messages", (req, res) => {
  messagesApi.handleCreate(req, res);
})
app.put("/api/v1/messages", (req, res) => {
  messagesApi.handleUpdate(req, res);
})
app.delete("/api/v1/messages/*", (req, res) => {
  messagesApi.handleDelete(req, res);
})

// GUI //
app.get("/", (req, res) => {
  res.render('list')
})
app.get("/view", (req, res) => {
  res.render('view')
})
app.get("/create", (req, res) => {
  res.render('create')
})
app.get("/update", (req, res) => {
  res.render('update')
})
app.get("/delete", (req, res) => {
  res.render('delete')
})
app.all("*", (req, res) => {
  res.render('404')
})

app.listen(port, function(error) {
  if (error) {
    console.log('Something went wrong', error)
  } else {
    console.log('Server is listening on port ' + port)
  }
});