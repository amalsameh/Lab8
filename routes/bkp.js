var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var mongo = require('mongoskin');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  var db = mongo.db('mongodb://127.0.0.1:27017/Lab8', { native_parser: true });
  db.bind('restaurants');
  /*db.restaurants.findOne({},function(err,data){
    if(err)console.log("Error Happened");
    console.log("Done Perfectly");
  });*/
  var query = "{'restaurant_id':'40356731'}";
  var projection = { 'name': 1, '_id': 0 };
  var doc = "{'name':'Don Alex Restaurantt'}";

  /*
  //Insert
  db.restaurants.insert(doc,function(err,Inserteddoc){
    if(err)console.log(err);
    console.log("Inserted Doc : "+Inserteddoc);
  });*/


  /*
    //Find Using Cursor
     var cursor= db.restaurants.find({},projection);
   cursor.skip(1000);
   cursor.limit(30);
   cursor.sort('name',1);
   cursor.each(function (err, doc) {
           if (err) console.log("err :" + err);
        console.log(JSON.stringify(doc));
    });*/

  /*
  //Find One and update
   var cursor= db.restaurants.findOne(query,function(err,doc){
     if(err)throw err;
query['_id']=doc['_id'];
doc['name']="Taste The Tropics Ice Cream from Mongo";
var operator={'$set':{'name':'Taste The Tropics Ice Cream from Mongo'}};
var options={'Multi':true};
//db.restaurants.update(query,operator,function(err,numofRows){
//db.restaurants.update(query,operator,options,function(err,numofRows){
  //db.restaurants.save(doc,function(err,numofRows){
db.restaurants.update(query,doc,function(err,numofRows){
  if(err)throw err;
  console.log(numofRows);
});
   });*/

  /*
//Find and Modify
var operator={'$set':{'name':'Taste The Tropics Ice Cream from Mongo'}};
var sort=[];
var options={'new':true};//return modified document rather than original
//db.restaurants.findAndModify(query,sort,operator,options,function(err,doc){
if(err)throw err;
console.log(doc);
});
});*/

  /*
//Remove
//db.restaurants.remove(query,function(err,removed){
if(err)throw err;
console.log(removed+" document removed");
});
});*/

});
module.exports = router;
