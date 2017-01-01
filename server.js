const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();



// Template engine
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
// helpers
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('textToUppercase', (text) => {
  return text.toUpperCase();
});



// Middleware
app.use((req, res, next) => {
  var date = new Date().toString();
  var log = `${date}: ${req.method} ${req.url}`;
  fs.appendFile('server.log', log);
  console.log(log);
  next();
});

// app.use((req, res) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/app'));



// Routing
app.get('/', (req, res) => {
  res.render('index.hbs', {
    pageTitle: 'Home page',
    welcomeMessage: 'Welcome to express website!',
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About page',
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to connect'
  });
});



// Server
app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
