const express = require('express');
const path = require('path');
const messagesApi = require('./apis/messages-api');
const port = 3000;

const app = express();
app.use("/static", express.static(path.resolve(__dirname, "frontend", "static")))

// API //
app.get("/api/", (req, res) => {
  messagesApi.handleReadAll(res);
})
app.get("/api/view/*", (req, res) => {
  messagesApi.handleRead(req, res);
})
app.post("/api/create", (req, res) => {
  messagesApi.handleCreate(req, res);
})
app.put("/api/update", (req, res) => {
  messagesApi.handleUpdate(req, res);
})
app.delete("/api/delete/*", (req, res) => {
  messagesApi.handleDelete(req, res);
})

// GUI //
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend/html", "list.html"));
})
app.get("/view", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend/html", "view.html"));
})
app.get("/create", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend/html", "create.html"));
})
app.get("/update", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend/html", "update.html"));
})
app.get("/delete", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend/html", "delete.html"));
})
app.all("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend/html", "404.html"));
})

app.listen(port, function(error) {
  if (error) {
    console.log('Something went wrong', error)
  } else {
    console.log('Server is listening on port ' + port)
  }
});