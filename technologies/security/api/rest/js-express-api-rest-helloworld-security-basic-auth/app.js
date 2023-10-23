const express = require('express');
const { authPage } = require('./middlewares');
const port = 3000;

const app = express();
app.use(express.json())

app.get("/", (req, res) => {
  res.json(JSON.parse('{"message": "Public Resource"}'))
})

app.get("/user", authPage(["USER", "ADMIN"]), (req, res) => {
  res.json(JSON.parse('{"message": "User Resource"}'))
})

app.get("/admin", authPage(["ADMIN"]), (req, res) => {
  res.json(JSON.parse('{"message": "Admin Resource"}'))
})

app.all('*', function(req, res) {
  res.status(404).json(JSON.parse('{"message": "Resource Not Found"}'))
});

// ***** HELP METHODS ***** //M

app.listen(port, function(error) {
  if (error) {
    console.log('Something went wrong', error)
  } else {
    console.log('Server is listening on port ' + port)
  }
});