var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var port = process.env.PORT || 3000;

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

router.get("/waferStatusExample",function(req,res){
    res.sendFile(path.join(__dirname, '') + "/waferStatusExample.html");
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
