var express = require('express');
var mongo = require('mongoskin');
var router = express.Router();

router.post('/',function(req,res,next){
var db=mongo.db('mongodb://127.0.0.1:27017/Lab8',{native_parser:true});
db.bind("Locations");
db.Locations.find({Location:{$near:[currentlong,currentlat]}}).limit(3);
})
module.exports router;