const express = require('express');
const bodyParser = require('body-parser');
const messagesService = require('./services/messages-service');
const port = 3000;

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('static'));
app.set('view engine', 'ejs');

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
  updateDisplay(req, res);
})
app.post("/update", (req, res) => {
  updateHandle(req, res);
})
app.get("/delete", (req, res) => {
  deleteDisplay(req, res);
})
app.post("/delete", (req, res) => {
  deleteHandle(req, res);
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

function updateDisplay(req, res) {

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

  res.render('update');

}

function updateHandle(req, res) {
  messagesService.update(req.body);
  res.redirect('/');
}

function deleteDisplay(req, res) {

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

  res.render('delete');

}

function deleteHandle(req, res) {

  const messageId = req.body.id;
  if (isNaN(messageId)) {
    res.render('404');
    return;
  }

  messagesService.delete(messageId);
  res.redirect('/');

}