var express = require('express');
var firebase = require('firebase');
var app = express();
var path = require('path');
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


function test(val) {
  console.log(val);
}


router.get("/waferStatusExample",function(req,res){

  var adding = firebase.database().ref('/requests');
  console.log(adding);

  adding.once("value")
    .then(function(snapshot) {
      var name = snapshot.child("1").val(); // {first:"Ada",last:"Lovelace"}
      console.log(name)
      // var firstName = snapshot.child("name/first").val(); // "Ada"
      // var lastName = snapshot.child("name").child("last").val(); // "Lovelace"
      // var age = snapshot.child("age").val(); // null
    });

  // adding.on('value', function(snapshot) {
  //   adding.once('value', function(snapshot) {
  //     snapshot.forEach(function(childSnapshot) {
  //       var childKey = childSnapshot.key;
  //       var childData = childSnapshot.val();
  //       console.log("hi")
  //       if (childKey == "requests") {
  //         test(childData);
  //       }
  //     });
  //   });
  // });


  var hash = req.param('hash');
  console.log(hash)
  res.render('waferStatusExample', {hash: hash});
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
