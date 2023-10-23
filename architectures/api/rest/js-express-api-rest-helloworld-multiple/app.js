const express = require('express');
const port = 3000;

const app = express();

app.get("/", (req, res) => {
  displayMessage('Hello World Idex', res, 200)
})

app.get("/helloworld", (req, res) => {
  displayMessage('Hello World Message', res, 200)
})

app.all('*', function(req, res) {
  displayMessage('Resource Not Found', res, 404)
});

// ***** HELP METHODS ***** //M

app.listen(port, function(error) {
  if (error) {
    console.log('Something went wrong', error)
  } else {
    console.log('Server is listening on port ' + port)
  }
});

function displayMessage(message, res, statusCode) {

  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'text/plain');
  res.end(message);

}