<h1 align="center">
  Rating pics with Instagram
  <img width="50%" src="media/demo.png" alt="demo">
  <br>
  <br>
</h1>
<br>

## Live version
<a href="https://murmuring-retreat-41407.herokuapp.com">Live demo here</a>

## Features
-  [x] the app remembers who you are by using <a href="https://www.mongodb.com/">MongoDB</a>!
-  [x] adding Instagram pictures real-time using <a href="https://socket.io/">socket.io</a> everytime you make a picture!
-  [x] delete pictures from anyone you want, make some enemies!
  
## Using MongoDB/Mongoose
To make sure data is stored I decided to use <a href="https://www.mongodb.com/">MongoDB</a> as my database because the documents are saved as JSON. To use this in Node.js I used the <a href="http://mongoosejs.com/">Mongoose</a> package. This package provides an OOP way of using your MongoDB database.  
  
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
Create a new user with an id and a name and save it to the database

  
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

<br>
Finally, to use the app you need to run the following commands:  
```bash
npm install
```
To install the Node dependencies.
```bash
npm start
```  
To start the server.

## TODO
-  [x] getting the oauth to work
-  [x] saving images to the database
-  [x] showing individual users from the database
-  [x] add a judge-system which blurs out bad pictures
-  [ ] one like per user
-  [ ] styling

## Wishlist
-  [ ] loading indicator for new images
-  [ ] profile pages where you can check how your photo's are holding up
-  [ ] categories
