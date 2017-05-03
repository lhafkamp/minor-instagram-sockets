# minor-instagram-sockets
Assignments for the course Real-Time Web. For this assignment I used the <a href="https://www.instagram.com/developer/">Instagram API</a>.

_for now I only got the oauth working, more coming this week_

## Build
To run the application:
```bash
git clone
```

Fill in the following <a href="https://www.npmjs.com/package/dotenv">dotenv</a> variables:  

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
  
To use the app you need to run the following commands:  
```bash
npm install
```
To install the Node dependencies.
```bash
npm start
```  
To start the server on port `4000`  

## TODO
-  [x] getting the oauth to work
-  [x] saving images to the database
-  [ ] showing individual users from the database
-  [ ] styling
-  [ ] add a judge-system which blurs out bad pictures
-  [ ] proper routing
-  [ ] complete the README

## Wishlist
-  [ ] loading indicator for new images
-  [ ] profile pages where you can check how your photo's are holding up
-  [ ] categories

