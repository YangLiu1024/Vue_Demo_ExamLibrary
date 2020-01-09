# Vue_Demo_ExamLibrary
A example of Vue

This demo show the usage of Vue + vue-router + Vuex + iView + axios + express

## Build Setup
   vue init webpack examlibrary
   npm install
   npm run dev
   
## Development

### Database
  1. Download MongoDB
  2. Add mongo bin to system PATH
  3. start mongo db: mongod --dbpath ${db-path}
  
Normally, mongo db service will listen to http://localhost:27017.
You can use Studio 3T to visualize mongo db

### Back-End

Choose Express to implement back-end.

```bash
#install express-generator
npm install -g express-generator

#create express project
express ${project-name}

```
To access mongo db, choose middleware mongoose
```bash
#install mongoose
npm install -save mongoose
```bash
Generally, define db.js in util folder to centralized management\
```js
var mongoose = require('mongoose')
var url = 'mongodb://localhost/${db-dataset-name}'
mongoose.connect(url);
module.exports = mongoose;
```
To add/delete/update data in db, define the data schema first
```js
var mongoose = require('../util/db')

var user = new mongoose.Schema({
    userName: String,
    password: String,
    userMail: String,
    userPhone: String,
    isAdmin: Boolean,
    permissionLevel: Number,
    isBanned: Boolean
})

user.statics.findAll = function(callBack) {
    //"this" is a mongo instance, find is its builtin method, find(filter, callback)
    this.find({}, callBack);
}

user.statics.findByUserName = function(name, callBack) {
    this.find({userName:name}, callBack)
}

//check specified user whether loginable
//1. username and password matched
//2. not banned
user.statics.tryLogin = function(name, password, callBack) {
    this.find({userName:name, password:password, isBanned:false}, callBack)
}

user.statics.findUserPassword = function(name, mail, phone, callBack) {
    this.find({userName:name, userMail:mail, userPhone:phone}, callBack);
}

//regist user model to mongo db
var userModel = mongoose.model('user', user);
module.exports = userModel;
```
back-end service is accessed by route, then need to define the Router
```js
var express = require('express');
var router = express.Router();
var user = require('../models/user')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', function(req, res, next) {
  if (!req.body.userName || !req.body.password || !req.body.userMail || !req.body.userPhone) {
    res.json({status: 1, message: "User name/password/email/phone is empty"})
  }
  user.findByUserName(req.body.userName, function(err, existedUsers) {
    console.log(existedUsers)
    if (existedUsers.length != 0) {
      res.json({status: 1, message: "User name has been registed"})
    } else {
      var newUser = new user({
        userName: req.body.userName,
        password: req.body.password,
        userMail: req.body.userMail,
        userPhone: req.body.userPhone,
        isAdmin: false,
        permissionLevel: 0,
        isBanned: false
      })
      newUser.save(function() {
        res.json({status: 0, message: "Regist successfully"})
      })
    }
  })
})
module.exports = router;
```
when db data and route are defined, need to apply to express
```js
var express = require('express');
var app = express();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

app.use('/', indexRouter);
app.use('/users', usersRouter);
```
Finally, need to start back-end service, normally, back-end service will listen on http://localhost:3000
```bash
npm run start
```
To test HTTP request without front-end, you can use Postman

### Front-End

As for front-end, 

