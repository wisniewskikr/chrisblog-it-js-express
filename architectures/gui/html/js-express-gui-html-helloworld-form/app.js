const express = require('express');
const bodyParser = require('body-parser');
const port = 3000;

const app = express();
app.use(express.static('static'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req, res) => {
  res.locals.name = null
  res.render('helloworld')
})

app.post("/", (req, res) => {
  res.locals.name = req.body.name
  res.render('helloworld')
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