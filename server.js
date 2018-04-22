const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();
const maintenance = false;

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${req.method} ${req.url}`;
  console.log(`${req.method} ${req.url}`);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server log');
    }
  })
  if (maintenance) {
    res.render('maintenance.hbs')
  } else {
    next();
  }
});

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase()
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'YAYAYAYA Page',
    welcomeMsg: 'Hi, this is a great website'
  })
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  })
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessagge: 'Bad shizzle'
  })
});

app.listen(3000, () => {
  console.log('Server is up on 3000');
});
