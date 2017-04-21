const express = require('express');
const app = express();
const request = require('request');

require('dotenv').config();

const http = require('http').Server(app);
const path = require('path');
const io = require('socket.io')(http);

// get the public files
app.use(express.static('public'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 404
app.get('*', (req, res) => {
	res.render('error');
});

// run the app
http.listen(4000, () => {
	console.log('Running on http://localhost:4000');
});
