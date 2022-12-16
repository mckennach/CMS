const express = require("express");
 
// albumRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /album.
const albumRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn.ts");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 
 
// This section will help you get a list of all the albums.
albumRoutes.route("/album").get(function (req, res) {
 let db_connect = dbo.getDb("employees");
 db_connect
   .collection("albums")
   .find({})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
// This section will help you get a single album by id
albumRoutes.route("/album/:id").get(function (req, res) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect
   .collection("albums")
   .findOne(myquery, function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
// This section will help you create a new album.
albumRoutes.route("/album/add").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myobj = {
   name: req.body.name,
   position: req.body.position,
   level: req.body.level,
 };
 db_connect.collection("albums").insertOne(myobj, function (err, res) {
   if (err) throw err;
   response.json(res);
 });
});
 
// This section will help you update a album by id.
albumRoutes.route("/update/:id").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 let newvalues = {
   $set: {
     name: req.body.name,
     position: req.body.position,
     level: req.body.level,
   },
 };
 db_connect
   .collection("albums")
   .updateOne(myquery, newvalues, function (err, res) {
     if (err) throw err;
     console.log("1 document updated");
     response.json(res);
   });
});
 
// This section will help you delete a album
albumRoutes.route("/:id").delete((req, response) => {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect.collection("albums").deleteOne(myquery, function (err, obj) {
   if (err) throw err;
   console.log("1 document deleted");
   response.json(obj);
 });
});
 
module.exports = albumRoutes;