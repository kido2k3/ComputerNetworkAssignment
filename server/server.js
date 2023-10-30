var express = require('express');
var fs = require('fs');
var data = require('./data.json');

var app = express();
app.use(express.json())


app.listen(3000, function() {
  console.log('Server is listening on port 3000');
});

app.get('/', function(req, res) {
    res.send(data)
});

app.get('/users', function(req, res) {
    var result = []
    data.users.forEach(user => {result.push(user.name)})
    res.send(result)
});

app.get('/id/:username', function(req, res) {
    data.users.forEach(user => {
        if (user.name == req.params.username) {
            res.send(user.peerID)
        }
    })
    res.send({"error" : "user not found"})
});

app.get('/userfiles/:username/', function(req, res) {
    data.users.forEach(user => {
        if (user.name === req.params.username) {
            res.send(user.files)
        }
    })
    res.send({"error" : "user not found"})
});

app.get('/file/:filename', function(req, res) {
    data.users.forEach(user => {
        user.files.forEach(file => {
            if (file.name === req.params.filename) {
                res.send({"user" : user.name, "peerID" : user.peerID, "file" : file});
            }
        })
    })
    res.send({"error" : "file not found"});
});


app.post('/user', function(req, res) {
    var username = req.body.name
    var peerID = req.body.peerID
    for (var i = 0; i < data.users.length; i++) {
        if (data.users[i].name == username) {
            res.send(data.users[i]);
            return
        }
    }
    var user = {"name" : username, "peerID": peerID, "files" : []}
    data.users.push(user)
    res.send(user)
});

app.post('/file', function(req, res) {
    var username = req.body.name
    var filepath = req.body.path
    var pathsplit = filepath.split('/')
    var file = {"name" : pathsplit[pathsplit.length-1], "path" : filepath}
    for (var i = 0; i < data.users.length; i++) {
        if (data.users[i].name == username) {
            data.users[i].files.push(file)
            res.send(file)
            return
        }
    }
    res.send({"error" : "user not found"});
});


app.delete('/user/:username', function(req, res) {
    for (var i = 0; i < data.users.length; i++) {
        if (data.users[i].name == req.params.username) {
            const deletedUser = data.users[i]
            data.users.splice(i,1)
            res.send(deletedUser)
            return
        }
    }
    res.send({"error" : "user not found"})
});

//Every 10 seconds, auto-update the json file for back-up.
setInterval(function() {
    fs.writeFile('./data.json', JSON.stringify(data), function(err) {
        if (err) {
            console.log(err);
        }
    })
}, 10000);


