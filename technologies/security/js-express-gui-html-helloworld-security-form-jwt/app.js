const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { login, logout, authPage, handleUsername } = require('./middlewares/auth-middleware');
const port = 3000;

const app = express();
app.use(express.static('static'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());

app.get("/", handleUsername, (req, res) => {
  res.render('index')
})

app.get("/login", (req, res) => {
  displayLogin(req, res);
})

app.post("/login", (req, res) => {
  handleLogin(req, res);
})

app.get("/logout", (req, res) => {
  handleLogout(req, res);
})

app.get("/public", (req, res) => {
  res.render('public')
})

app.get("/user", authPage(["USER", "ADMIN"]), (req, res) => {
  res.render('user')
})

app.get("/admin", authPage(["ADMIN"]), (req, res) => {
  res.render('admin')
})

app.get("/401", (req, res) => {
  res.render('401')
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

function displayLogin(req, res) {
  
  if ( typeof req.cookies.error == 'undefined') {
    res.locals.error = null;
  } else {
    res.locals.error = req.cookies.error;
    res.cookie('error', '', { maxAge: 1 });
  }
  
  res.render('login');
}

function handleLogin(req, res) {
  login(req, res);  
}

function handleLogout(req, res) {
  logout(req, res);  
}