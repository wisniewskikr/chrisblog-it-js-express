const express = require('express');
const port = 3000;

const app = express();
app.use(express.static('static'));
app.set('view engine', 'ejs');

app.get("/", (req, res) => {
  res.render('helloworld')
})

app.listen(port, function(error) {
  if (error) {
    console.log('Something went wrong', error)
  } else {
    console.log('Server is listening on port ' + port)
  }
});