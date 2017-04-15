var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var mongo = require('mongoskin');
var router = express.Router();

var db = mongo.db('mongodb://127.0.0.1:27017/Lab8', { native_parser: true });
db.bind('Locations');

router.get('/', function (req, res, next) {
  var cursor= db.restaurants.find();
   cursor.skip(1000);
   cursor.limit(30);
   cursor.sort('name',1);
   cursor.toArray(function (err, docArray) {
           if (err) console.log("err :" + err);
        console.log(JSON.stringify(docArray));
        res.render('index.ejs', {Locations: docArray})
    });
});
router.post('/index',function(req,res,next){
   var doc = { 'Name': req.body.Name, 'Category': req.body.Category, 'Longitude': -96, 'Latitude': 65 };
   db.Locations.insert(doc,function(err,Inserteddoc){
    if(err)console.log(err);
    console.log("Inserted Doc : "+Inserteddoc+" Successfully");
    res.redirect('/');
  });
});

router.put('/index',function(req,res,next){
  //update
var Query = {'Name':'Indian Cafe','Category':'Sports Club','Longitude':-96,'Latitude':65};
var operator={'$set':{'Category':req.body.Category,'Name':req.body.Name}};
var options={'upsert':true};
db.Locations.update(Query,operator,options,function(err,numofRows){
if(err)throw err;
console.log(numofRows);
});
});

router.delete('/index',function(req,res,next){
  //Remove
  var query = { 'Name': req.body.Name};
  db.Locations.remove(query, function (err, removed) {
    if (err) throw err;
    console.log(removed + " document removed");
  });
});

router.post('/index/createIndexes',function(req,res,next){
//Create Indexes
//add check box for items to be indexed
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


module.exports = router;
