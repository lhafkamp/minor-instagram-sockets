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

// set up all variables needed for oauth
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = process.env.REDIRECT_URI;
const response_type = 'code';
const scope = 'basic+public_content';

// will be filled with the access token and userId for testing
let aToken = '';
let userId = '';

// url with all the needed variables
const auth_url = `https://api.instagram.com/oauth/authorize/?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=${response_type}&scope=${scope}`;

// render the index page
app.get('/', (req, res) => {
	res.render('index', {
		auth_url: auth_url
	});
});

// get the token once the auth is complete and render succes
app.get('/succes', (req, res) => {
	request.post({
		uri: 'https://api.instagram.com/oauth/access_token',
		form: {
			client_id: client_id,
			client_secret: client_secret,
			grant_type: 'authorization_code',
			redirect_uri: redirect_uri,
			code: req.query.code
		}
	}, (error, response, body) => {
		if (error) {
			console.error('auth error, everything sucks');
		} else {
			data = JSON.parse(body);
			aToken = data.access_token;
			userId = data.user.id;
			res.render('succes');
		}
	});
});

// render the main page with instagram data
app.get('/main', (req, res) => {
	request(`https://api.instagram.com/v1/users/${userId}/media/recent/?access_token=${aToken}`, (error, response, body) => {
		data = JSON.parse(body);
		res.render('main');

		imageData = data.data[0];

		io.on('connection', (socket) => {
			socket.emit('welcome', imageData);
		});
	});
});

// 404
app.get('*', (req, res) => {
	res.render('error');
});


// run the app
http.listen(4000, () => {
	console.log('Running on http://localhost:4000');
});
