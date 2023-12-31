var express = require("express");
var fs = require("fs");
var data = require("./data.json");
var bodyParser = require("body-parser");

var app = express();
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.listen(3000, function () {
  console.log("Server is listening on port 3000");
});

app.get("/", function (req, res) {
  res.send(data);
});

app.get("/users", function (req, res) {
  var reply = { result: [] };
  data.users.forEach((user) => {
    reply.result.push(user.name);
  });
  res.send(reply);
});

app.get("/id/:username", function (req, res) {
  for (var i = 0; i < data.users.length; i++) {
    if (data.users[i].name == req.params.username) {
      res.send({ peerID: data.users[i].peerID });
      return;
    }
  }
  res.send({ peerID: "" });
});

app.get("/userfiles/:username/", function (req, res) {
  for (var i = 0; i < data.users.length; i++) {
    if (data.users[i].name === req.params.username) {
      res.send({ result: data.users[i].files });
      return;
    }
  }
  res.send({ result: "user not found" });
});
app.get("/online/:username/", function (req, res) {
  for (var i = 0; i < data.users.length; i++) {
    if (data.users[i].name === req.params.username) {
      res.send({ online: data.users[i].online, username: data.users[i].name });
      return;
    }
  }
  res.send({ result: "user not found" });
});
app.get("/sharedfiles/:username/", function (req, res) {
  for (var i = 0; i < data.users.length; i++) {
    if (data.users[i].name === req.params.username) {
      res.send({ result: data.users[i].sharedFile });
      return;
    }
  }
  res.send({ result: "user not found" });
});

app.get("/files", function (req, res) {
  reply = { result: [] };
  data.users.forEach((user) => {
    user.files.forEach((file) => {
      reply.result.push({
        username: user.name,
        fname: file.fname,
        lname: file.lname,
      });
    });
  });
  res.send(reply);
});

app.get("/file/:fname", function (req, res) {
  for (var i = 0; i < data.users.length; i++) {
    for (var j = 0; j < data.users[i].files.length; j++) {
      if (data.users[i].files[j].fname == req.params.fname) {
        res.send({
          result: {
            name: data.users[i].name,
            peerID: data.users[i].peerID,
            online: data.users[i].online,
            file: data.users[i].files[j],
          },
        });
        return;
      }
    }
  }
  res.send({ result: "file not found" });
});

app.post("/user", function (req, res) {
  var username = req.body.username;
  var peerID = req.body.peerID;
  for (var i = 0; i < data.users.length; i++) {
    if (data.users[i].name === username) {
      data.users[i].peerID = peerID;
      data.users[i].online = true;
      res.send(data.users[i]);
      return;
    }
  }
  var user = {
    name: username,
    peerID: peerID,
    online: true,
    files: [],
    sharedFile: [],
  };
  data.users.push(user);
  res.send(user);
});

app.post("/logout", function (req, res) {
  var username = req.body.username;
  for (var i = 0; i < data.users.length; i++) {
    if (data.users[i].name === username) {
      data.users[i].online = false;
      data.users[i].files = [];
      data.users[i].sharedFile = [];
      res.send({ message: "Log out successfully!!!" });
      return;
    }
  }
});
app.post("/file", function (req, res) {
  var username = req.body.username;
  var fname = req.body.fname;
  var lname = req.body.lname;
  var file = { fname: fname, lname: lname };
  for (var i = 0; i < data.users.length; i++) {
    if (data.users[i].name == username) {
      data.users[i].files.push(file);
      res.send({
        result: {
          name: data.users[i].name,
          file: file,
        },
      });
      return;
    }
  }
  res.send({ result: "user not found" });
});
app.post("/sharedFile", function (req, res) {
  var username = req.body.username;
  var fname = req.body.fname;
  var sender = req.body.sender;
  var sharedFile = { fname: fname, sender: sender };
  for (var i = 0; i < data.users.length; i++) {
    if (data.users[i].name == username) {
      data.users[i].sharedFile.push(sharedFile);
      res.send({
        message: "Updated sharedFile successfully",
      });
      return;
    }
  }
  res.send({ result: "user not found" });
});
app.delete("/allFile", function (req, res) {
  for (var i = 0; i < data.users.length; i++) {
    data.users[i].files = [];
  }
  res.send({
    result: {
      message: "Delete all files successfully",
    },
  });
  return;
});
app.delete("/allSharedFile", function (req, res) {
  for (var i = 0; i < data.users.length; i++) {
    data.users[i].sharedFile = [];
  }
  res.send({
    result: {
      message: "Delete all files successfully",
    },
  });
  return;
});

app.put("/offline/:username", function (req, res) {
  for (var i = 0; i < data.users.length; i++) {
    if (data.users[i].name == req.params.username) {
      data.users[i].online = false;
      res.send(data.users[i]);
      return;
    }
  }
  res.send({ error: "user not found" });
});

app.delete("/user/:username", function (req, res) {
  for (var i = 0; i < data.users.length; i++) {
    if (data.users[i].name == req.params.username) {
      const deletedUser = data.users[i];
      data.users.splice(i, 1);
      res.send({ result: deletedUser });
      return;
    }
  }
  res.send({ result: "user not found" });
});

//Every 10 seconds, auto-update the json file for back-up.
setInterval(function () {
  fs.writeFile("./data.json", JSON.stringify(data), function (err) {
    if (err) {
      console.log(err);
    }
  });
}, 10000);
