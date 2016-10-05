const bodyParser = require('body-parser')
const express = require('express')
const renderFile = require('ejs').renderFile
<<<<<<< HEAD
=======

>>>>>>> b94bf6ee38ad7f4e1614458ea4b141559fbb7c07
const app = express()

const theRoot = __dirname + '/dist/',
	PORT = process.env.PORT || 3000 

// got env port for heroku or elsewhere, else set to 3000 for dev
app.set('port', PORT)

app.set('views', './dist/views');
app.engine('html', renderFile)
app.set('view engine', 'html');

// serving images from dist/assets/
app.use( express.static( __dirname + '/dist/assets') );

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded() );

app.post('/auth/register', function(req, res){
  console.log(req.body)
  res.redirect('/')
})

// get the root page
app.get('/', function (req, res) {
  res.render('index');
});

//get the register page
app.get('/register', function (req, res) {
  res.render('register');
});




app.listen(PORT,function() {
	console.log('\n\n===== listening for requests on port ' + PORT + ' =====\n\n')
})
