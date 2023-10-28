var express = require('express');
var fs = require('fs');
var data = require('./data.json');

var app = express();


app.listen(3000, function() {
  console.log('Server is listening on port 3000');
});

app.get('/', function(req, res) {
    res.send(data);
});


app.get('/users', function(req, res) {
    var result = []
    data.users.forEach(user => {result.push(user.name)})
    res.send(result);
});

app.get('/userfile/:user/:filename', function(req, res) {
    data.users.forEach(user => {
        if (user.name === req.params.user) {
            user.files.forEach(file => {
                if (file.name === req.params.filename) {
                    res.send(file);
                }
            })
        }
    })
});

app.get('/file/:filename', function(req, res) {
    data.users.forEach(user => {
        user.files.forEach(file => {
            if (file.name === req.params.filename) {
                res.send({"user" : user.name, "file" : file});
            }
        })
    })
    res.send({"error" : "file not found"});
});

app.post('/user/:username/:peerID', function(req, res) {
    for (var i = 0; i < data.users.length; i++) {
        if (data.users[i].name == req.params.username) {
            res.send(data.users[i]);
        }
    }
    var user = {"name" : req.params.username, "peerID": req.params.peerID, "files" : []}
    data.users.push(user);
    res.send(user);
});

// path: 'a&b&c&file.txt'
app.post('/file/:username/:filepath', function(req, res) {
    var path = req.params.filepath.split('&');
    var file = {"name" : path[path.length-1], "path" : path.join('/')}
    data.users.forEach(user => {
        if (user.name === req.params.username) {
            user.files.push(file);
            res.send(file);
        }
    })
    res.send({"error" : "user not found"});
});

setInterval(function() {
    fs.writeFile('./data.json', JSON.stringify(data), function(err) {
        if (err) {
            console.log(err);
        }
    })
}, 10000);


