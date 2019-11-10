// get dependencies
const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
const app = express();

const AppController = require("./src/controllers/AppController");

// parse requests
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
 
//app.use(cors(corsOptions));
//Enable CORS for all HTTP methods
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, withCredentials"
  );
  next();
});

// All OPTIONS requests return a simple status: 'OK'
app.options("*", (req, res) => {
  res.json({
    status: "OK"
  });
});

// default route
app.get('/',(req, res) => {
      res.json({ message: "Welcome to Punch..."});
});
 
// Connecting to Database...
const mongoClient = require('mongodb').MongoClient;
mongoClient.connect("mongodb://localhost:27017/punch_db", (err, client) =>  {

  if( err ) return console.log(err);
  var db = client.db("punch");
  new AppController( app, db);
   
  app.listen(6500, () => {
    console.log("Server started and listening on port 6500");
  });
  
});
