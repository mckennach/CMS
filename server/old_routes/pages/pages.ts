const express = require("express");
 
// pageRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /page.
const pageRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../../db/conn.ts");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 
 
// This section will help you get a list of all the pages.
pageRoutes.route("/pages").get(function (req, res) {
 let db_connect = dbo.getDb("content_mgmt");
 db_connect
   .collection("pages")
   .find({})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
// This section will help you get a single page by id
pageRoutes.route("/pages/:id").get(function (req, res) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect
   .collection("pages")
   .findOne(myquery, function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
// This section will help you create a new page.
pageRoutes.route("/pages/add").post(function (req, response) {
 let db_connect = dbo.getDb();
 console.log(req.body);
 const { body } = req;
 let myobj = {
   ...body
 };
 db_connect.collection("pages").insertOne(myobj, function (err, res) {
   if (err) throw err;
   response.json(res);
 });
});
 
// This section will help you update a page by id.
pageRoutes.route("/update/:id").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 const { body } = req;
 let newvalues = {
   $set: {
     ...body
   },
 };
 db_connect
   .collection("pages")
   .updateOne(myquery, newvalues, function (err, res) {
     if (err) throw err;
     console.log("1 document updated");
     response.json(res);
   });
});
 
// This section will help you delete a page
pageRoutes.route("/:id").delete((req, response) => {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect.collection("pages").deleteOne(myquery, function (err, obj) {
   if (err) throw err;
   console.log("1 document deleted");
   response.json(obj);
 });
});
 
module.exports = pageRoutes;