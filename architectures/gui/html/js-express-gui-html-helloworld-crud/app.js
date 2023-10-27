const express = require('express');
const bodyParser = require('body-parser');
const messagesApi = require('./apis/messages-api');
const messagesService = require('./services/messages-service');
const port = 3000;

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('static'));
app.set('view engine', 'ejs');

// API //
app.put("/api/v1/messages", (req, res) => {
  messagesApi.handleUpdate(req, res);
})
app.delete("/api/v1/messages/*", (req, res) => {
  messagesApi.handleDelete(req, res);
})

// GUI //
app.get("/", (req, res) => {
  list(req, res);
})
app.get("/view", (req, res) => {
  view(req, res);
})
app.get("/create", (req, res) => {
  createDisplay(req, res);
})
app.post("/create", (req, res) => {
  createHandle(req, res);
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

// ***** HELP METHODS ***** //

function list(req, res) {
  res.locals.messages = messagesService.getAll();
  res.render('list');
}

function view(req, res) {

  const messageId = req.query.id;
  if (isNaN(messageId)) {
    res.render('404');
    return;
  }

  const message = messagesService.getById(messageId);
  if (message == null) {
    res.render('404');
    return;
  }

  res.locals.message = message;
  res.render('view');
}

function createDisplay(req, res) {
  res.render('create');
}

function createHandle(req, res) {
  messagesService.add(req.body);
  res.redirect('/');
}