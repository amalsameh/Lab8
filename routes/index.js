var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var mongo = require('mongoskin');
var router = express.Router();

var db = mongo.db('mongodb://127.0.0.1:27017/Lab8', { native_parser: true });

router.get('/index/Add',function(req,res,next){
   var doc = { 'Name': 'Recreation Center', 'Category': 'Sports Club', 'Longitude': -96, 'Latitude': 65 };
  //var projection = { 'name': 1, '_id': 0 };
  //var doc = "{'name':'Don Alex Restaurantt'}";
 //Insert
  db.Locations.insert(doc,function(err,Inserteddoc){
    if(err)console.log(err);
    console.log("Inserted Doc : "+Inserteddoc);
  });
});

router.get('/index/Update',function(req,res,next){
  //update
var Query = {'Name':'Indian Cafe','Category':'Sports Club','Longitude':-96,'Latitude':65};
var operator={'$set':{'Category':'Resturant'}};
var options={'upsert':true};
db.Locations.update(Query,operator,options,function(err,numofRows){
if(err)throw err;
console.log(numofRows);
});
});

router.get('/index/Remove',function(req,res,next){
  //Remove
  var query = { 'Name': 'Indian Hills' };
  db.Locations.remove(query, function (err, removed) {
    if (err) throw err;
    console.log(removed + " document removed");
  });
});

router.get('/index/createIndexes',function(req,res,next){
//Create Indexes
db.Locations.createIndex({'Name':1},function(err){
if(err)throw err;
console.log("Index Created Successfully");
db.Locations.createIndex({'Category':1},{sparse: true},function(err){
if(err)throw err;
console.log("Second Index Created Successfully");
db.Locations.createIndex({'Longitude':1,'Latitude':1},{unique:true,background:true},function(err){
if(err)throw err;
console.log("Third Index Created Successfully");
});
});
});
})

router.get('/', function (req, res, next) {
  db.bind('Locations');
});
module.exports = router;
