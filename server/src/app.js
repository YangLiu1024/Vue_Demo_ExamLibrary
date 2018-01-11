const bodyParser = require('body-parser')
const express = require('express')
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res) {
    res.send(categories);
})

app.post('/login', function(req, res) {
    res.setHeader('Content-Type', 'application/json')
    let users = require('./users.js').users;
    let username = req.body.username
    let password = req.body.password
    console.log(username, password)
    let matchedUser = users.find(user => username.localeCompare(user.username) === 0)
    if (!matchedUser) {
        console.log('not found')
        res.status(201).send(username + ' does not exit')
    } else if (matchedUser.password.localeCompare(password) !== 0) {
        console.log('password wrong')
        res.status(202).send('passoword is invalid')
        // res.status(500).send({message: 'not valid'})
       // res.send(JSON.stringify({message: 'password is invalid'}))
    } else {
        console.log('login success')
        res.status(200).send('login success')
    }
})

app.get('/exam/:id', function(req, res) {
    var id = req.params.id;
    console.log(id)
    var examItem = require('./exam/' + id + '.js');
    res.status(200)
    res.json(examItem);
})
// app.get('/exam/two-sum', function(req, res) {
//     res.status(200);
//     res.json(exam1);
// })
// app.get('/exam/zigzag-conversion', function(req, res) {
//     res.status(200);
//     res.json(exam2);
// })

// app.get('/exam/category', function(req, res) {
//     res.status(200);
//     res.json(categories);
// })

app.get('/exam', function(req, res) {
    var examlist = require('./examList.js');
    res.status(200);
    res.json(examlist);
})
var server = app.listen(3000, function() {
    // var host = server.address().address;
    // var port = server.address.port;
    console.log('Server start listenning at 3000');
})