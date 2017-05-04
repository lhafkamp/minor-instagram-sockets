<h1 align="center">
  <img width="50%" src="media/demo.png" alt="demo">
  <br>
  <br>
  Rating pics with Instagram
</h1>
<br>

## Live version
<a href="https://murmuring-retreat-41407.herokuapp.com">Live demo here</a>

## Features
-  [x] the app remembers who you are by using <a href="https://www.mongodb.com/">MongoDB</a>!
-  [x] adding Instagram pictures real-time using <a href="https://socket.io/">socket.io</a> everytime you make a picture!
-  [x] delete pictures from anyone you want, make some enemies!

## Build
To run the application:
```bash
git clone
```

In order to get this app working you need to fill in the following <a href="https://www.npmjs.com/package/dotenv">dotenv</a> variables:  

```bash
CLIENT_ID={your client id here}
```  
```bash
CLIENT_SECRET={your client secret here}
```  
```bash
REDIRECT_URI={your redirect uri here}
```  

You can receive theses variables by making a new "Sandbox" on the Instagram development site:  
<a href="https://www.instagram.com/developer/authentication/">https://www.instagram.com/developer/authentication/</a>  
  
Now you only have to make sure to pass in your <a href="https://www.mongodb.com/">MongoDB</a> database. Simply place your database link inside the mongoose.connect braces:

```javascript
mongoose.connect({your link here});
```  

Finally, to use the app you need to run the following commands:  
```bash
npm install
```
To install the Node dependencies.

```bash
npm start
```  

To start the server.
  
## Using MongoDB & Mongoose
To make sure data is stored I decided to use <a href="https://www.mongodb.com/">MongoDB</a> as my database because the documents are saved as JSON. To use this in Node.js I used the <a href="http://mongoosejs.com/">Mongoose</a> package. This package provides a more straight-forward OOP way of using MongoDB.  
  
Here is how I set up my user schema:  
```javascript
mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASS}@ds131041.mlab.com:31041/instabase`);
```
To connect to my database.

```javascript
const Schema = mongoose.Schema;
```

```javascript
const userSchema = new Schema({
	user_id: String,
	name: String
});
```
The schema maps to the MongoDB collection and defines the shape of the documents within that collection.

```javascript
const User = mongoose.model('User', userSchema);
```

Create an instance of that model for easier use.  

```javascript
const newUser = new User({
	user_id: '2309482309',
	name: 'Luuk'
});

newUser.save((err) => {
	if (err) throw err;
	console.log('new user saved succesfully!');
});
```
Create a new user with an id and a name and save it to the database.

## OAuth with Instagram
In order to use the <a href="https://www.instagram.com/developer/">Instagram API</a> you need to set up an OAuth.

Once you start up the app I make a link with the following URL:  
```javascript
const auth_url = `https://api.instagram.com/oauth/authorize/?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=${response_type}&scope=${scope}`;
```

This URL needs the following variables to redirect properly:
```javascript
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = process.env.REDIRECT_URI;
const response_type = 'code';
const scope = 'basic+public_content';
```javascript

Once you accept to the terms I use a POST request:
```javascript
request.post({
	uri: 'https://api.instagram.com/oauth/access_token',
	form: {
		client_id: client_id,
		client_secret: client_secret,
		grant_type: 'authorization_code',
		redirect_uri: redirect_uri,
		code: req.query.code
	}
}, (err, response, body) => {
	data = JSON.parse(body);
}
```
Which will return an acces token that I can use to make calls to the API.

## Tooling
In order to use 'require' client side I used <a href="http://browserify.org/">Browserify</a> to make 1 bundle.js which combines all the Javascript files.

For example, in a random.js file you can use:  
`const random = 'wow this is random';`  
`module.exports = random;`  

And in the app.js file you require the exported file:

```js  
require('./random');  
```
  
```js 
console.log(random);
``` 
Here you can use the const made in the random.js file.
  
To complete this you run `npm run build` which compiles the app.js (with all the required files) file into the bundle.js.

## TODO
-  [x] getting the oauth to work
-  [x] saving images to the database
-  [x] showing individual users from the database
-  [x] add a judge-system which blurs out bad pictures
-  [ ] one button press per user for every image
-  [ ] styling

## Wishlist
-  [ ] loading indicator for new images
-  [ ] profile pages where you can check how your photo's are holding up
-  [ ] categories
