const express = require('express');
const app = express();
const request = require('request');
const mongoose = require('mongoose');

require('dotenv').config();

const http = require('http').Server(app);
const path = require('path');
const io = require('socket.io')(http);

// get the public files
app.use(express.static('public'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



// mongoDB
const MONGO_PASS = process.env.MONGO_PASS;
const MONGO_DATABASE = process.env.MONGO_DATABASE;

mongoose.connect(`mongodb://lhafkamp:${MONGO_PASS}@clusterluuk-shard-00-00-z8jtq.mongodb.net:27017,clusterluuk-shard-00-01-z8jtq.mongodb.net:27017,clusterluuk-shard-00-02-z8jtq.mongodb.net:27017/${MONGO_DATABASE}?ssl=true&replicaSet=ClusterLuuk-shard-0&authSource=admin`);
const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: String,
});

userSchema.methods.dudify = function() {
	this.name = this.name + '-dude';
	return this.name;
};

const User = mongoose.model('User', userSchema);

const luuk = new User({
	name: 'Luuk',
	username: 'toro',
	password: 'password'
});

luuk.dudify(function(err, name) {
	if (err) throw err;
	console.log(`your new name is ${name}`);
});

const peter = User({
	name: 'Peter',
	username: 'notPeter',
	password: 'password',
	admin: true
});

luuk.save(function(err) {
	if (err) throw err;
	console.log('User saved succesfully!');
});

peter.save(function(err) {
	if (err) throw err;
	console.log('new user created!');
})

// find all users
User.find({}, function(err, users) {
	if (err) throw err;
	console.log(users);
})

// find someone specific
User.find({ name: 'Peter' }, function(err, user) {
	if (err) throw err;
	console.log(user);
})

// find someone and update
User.findOneAndUpdate({ name: 'Peter' }, { name: 'Bob' }, function(err, user) {
  if (err) throw err;
  console.log(user);
});

// find and remove the user
User.findOneAndRemove({ name: 'Peter' }, function(err) {
  if (err) throw err;
  console.log('User deleted!');
});


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
	let oldData = {};
	res.render('main');
	setInterval(() => {
		request(`https://api.instagram.com/v1/users/${userId}/media/recent/?access_token=${aToken}`, (error, response, body) => {
			data = JSON.parse(body);

			if (oldData != data.data[0].images.thumbnail.url) {
				oldData = data.data[0].images.thumbnail.url;

				console.log('NEW DATA HEREEEEE', data.data[0].images.thumbnail.url);
				console.log('OLD DATA GOES HERE', oldData);

				imageData = data.data[0];

				io.sockets.emit('welcome', imageData);
			}
		});
	}, 5000);
});

// 404
app.get('*', (req, res) => {
	res.render('error');
});

const connections = [];

io.on('connection', socket => {
  connections.push(socket);
  console.log('Connected: %s sockets', connections.length);

  socket.on('disconnect', () => {
    connections.splice(connections.indexOf(socket), 1);
    console.log('Disconnected: %s sockets connected', connections.length);
  });
});

// run the app
http.listen(4000, () => {
	console.log('Running on http://localhost:4000');
});
