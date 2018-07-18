var express = require('express');
var firebase = require('firebase');
var app = express();
var path = require('path');
var bodyParser = require("body-parser");
var server = require('http').createServer(app);
var port = process.env.PORT || 3000;
var mailer = require('nodemailer');

var areas = ["IM", "Anelva", "Photo", "MR", "Metro", "Insp", "CMP", "NiFe/Etch", "Metals"];

var config = {
    apiKey: "AIzaSyAyXT6uOdnaUbVFFiFgrx15cRVqXlg36U8",
    authDomain: "devuirequests.firebaseapp.com",
    databaseURL: "https://devuirequests.firebaseio.com",
    projectId: "devuirequests",
    storageBucket: "devuirequests.appspot.com",
    messagingSenderId: "998440297406"
  };
firebase.initializeApp(config);

app.use(bodyParser.json({							// support JSON-encoded request bodies
	strict: true
}));
app.use(bodyParser.urlencoded({						// support URL-encoded request bodies
	extended: true
}));



server.listen(port, () => {
  console.log('Server listening at port %d', port);
});

// set the view engine to ejs
app.set('view engine', 'ejs');

// Routing
var router = express.Router();

app.use(express.static(__dirname + '/public'));
app.use("/",router);


router.get("/",function(req,res){
  res.render("index");
});

router.get("/createRequest",function(req,res){
  res.render("createRequest");
});

router.get("/requestStatus",function(req,res){
  res.render("requestStatus");
});

router.get("/editRequest",function(req,res){
  res.render("editRequest");
});

router.get("/exampleEditRequest",function(req,res){
  res.render("exampleEditRequest");
});

function generateID() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 7; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

router.post("/getNewRequest", function(req, res) {
  console.log(req.body.req);
  var currReq = req.body.req;
  var ref = firebase.database().ref('/requests');

  ref.once("value")
    .then(function(snapshot) {

      var newID = generateID();
      var request = snapshot.child(newID).val();
      while(request != null) {
        newID = generateID();
        request = snapshot.child(newID).val();
      }

      var requestID = ref.child(newID);
      requestID.set(currReq);
      SendAutomatedEmail(currReq.area, newID);
    });
});

function SendAutomatedEmail(area, id){
  var emails = [];
  switch(area){
    case areas[0]:
      emails = ["kevin.zeng@wdc.com", "huanze.shu@wdc.com", "jeffrey.li@wdc.com"];
      break;
    case areas[1]:
      emails = ["kevin.zeng@wdc.com", "huanze.shu@wdc.com", "jeffrey.li@wdc.com"];
      break;
    case areas[2]:
      emails = ["kevin.zeng@wdc.com", "huanze.shu@wdc.com", "jeffrey.li@wdc.com"];
      break;
    case areas[3]:
      emails = ["kevin.zeng@wdc.com", "huanze.shu@wdc.com", "jeffrey.li@wdc.com"];
      break;
    case areas[4]:
      emails = ["kevin.zeng@wdc.com", "huanze.shu@wdc.com", "jeffrey.li@wdc.com"];
      break;
    case areas[5]:
      emails = ["kevin.zeng@wdc.com", "huanze.shu@wdc.com", "jeffrey.li@wdc.com"];
      break;
    case areas[6]:
      emails = ["kevin.zeng@wdc.com", "huanze.shu@wdc.com", "jeffrey.li@wdc.com"];
      break;
    case areas[7]:
      emails = ["kevin.zeng@wdc.com", "huanze.shu@wdc.com", "jeffrey.li@wdc.com"];
      break;
    case areas[8]:
      emails = ["kevin.zeng@wdc.com", "huanze.shu@wdc.com", "jeffrey.li@wdc.com"];
      break;
  }

  var transporter = mailer.createTransport({
    service: "gmail",
    auth: {
     user: "test3243245@gmail.com",
     pass: "1234abcd!@#$"
    }
  });

  for(i = 0; i < emails.length; i++){
    var mailOptions = {
      from: "test3243245@gmail.com",
      to: emails[i],
      subject: "A request has been posted in your area",
      text: "https://devcontrolcenter.herokuapp.com/requestStatusExample?id=" + id;
    };
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      }else {
        console.log('Email sent: ' + info.response);
      }
    });
  }
}


router.get("/viewRequests",function(req,res){

  var adding = firebase.database().ref('/');
  adding.once("value")
    .then(function(snapshot) {
      var request = snapshot.child("requests").val();
      console.log(request);

      returnObj = {"All": {}, "Queued": {}, "In Progress": {}, "On Hold": {}, "Done": {}};
      areaObj = {"IM": [], "Anelva": [], "Photo": [], "MR": [], "Metro": [], "Insp": [], "CMP": [], "NiFe/Etch": [], "Metals": []};

      Object.keys(returnObj).forEach(function(key) {
        returnObj[key] = JSON.parse(JSON.stringify(areaObj));
      });

      Object.keys(request).forEach(function(key) {
        // console.log(key, request[key]);
        console.log(returnObj);
        var currObj = request[key];
        var currArea = currObj["area"];
        var currStatus = currObj["status"];
        currObj["id"] = key;

        returnObj["All"][currArea].push(currObj);
        returnObj[currStatus][currArea].push(currObj);
      });

      console.log(returnObj);

      res.render("viewRequests",  {returnObj: returnObj});

    });

  // res.render("viewRequests");
});


router.get("/requestStatusExample",function(req,res){

  var id = req.param('id');
  var adding = firebase.database().ref('/requests');

  adding.once("value")
    .then(function(snapshot) {
      var request = snapshot.child(id).val();
      console.log(request);
      res.render('requestStatusExample', {request: request, id: id});
    });
});
