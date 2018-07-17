var express = require('express');
var firebase = require('firebase');
var app = express();
var path = require('path');
var bodyParser = require("body-parser");
var server = require('http').createServer(app);
var port = process.env.PORT || 3000;

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

router.post("/getNewRequest", function(req, res) {
  console.log(req.body.req);
  var currReq = req.body.req;
  var ref = firebase.database().ref('/requests');

  ref.once("value")
    .then(function(snapshot) {
      var request = snapshot.child("3").val();
      if (request == null) {
        console.log("NULL");
      } else {
        var requestID = ref.child("3");
        requestID.set(currReq);
      }
    });
});


router.get("/requestStatus",function(req,res){
  res.render("requestStatus");
});


router.get("/requestStatusExample",function(req,res){

  var id = req.param('id');

  var adding = firebase.database().ref('/requests');
  console.log(adding);

  adding.once("value")
    .then(function(snapshot) {
      var request = snapshot.child(id).val();
      console.log(request);
      res.render('requestStatusExample', {request: request, id: id});
    });
});


//
// router.get("/createRequest",function(req,res){
//   res.sendFile(path.join(__dirname, '') + "/createRequest.html");
// });
//
// router.get("/editRequest",function(req,res){
//   res.sendFile(path.join(__dirname, '') + "/editRequest.html");
// });
//
// router.get("/exampleEditRequest",function(req,res){
//   res.sendFile(path.join(__dirname, '') + "/exampleEditRequest.html");
// });
//
// router.get("/form",function(req,res){
//   res.sendFile(path.join(__dirname, '') + "/form.html");
// });
//
// router.get("/requestList",function(req,res){
//   res.sendFile(path.join(__dirname, '') + "/requestList.html");
// });
//
// router.get("/quests",function(req,res){
//   res.sendFile(path.join(__dirname, '') + "/viewRequests.html");
// });
//
// router.get("/waferStatus",function(req,res){
//   res.sendFile(path.join(__dirname, '') + "/waferStatus.html");
// });
//
// router.get("/waferStatusExample",function(req,res){
//     res.sendFile(path.join(__dirname, '') + "/waferStatusExample.html");
// });
//
// router.get("/viewRequestsByTools",function(req,res){
//     res.sendFile(path.join(__dirname, '') + "/viewRequestsByTools.html");
// });
