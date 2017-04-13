var express = require('express');
var MongoClient=require('mongodb').MongoClient;
var mongo = require('mongoskin');

function DBConnect()
{
    MongoClient.connect('mongodb://127.0.0.1:27017/Lab8',function(err,db){
 db.restaurants.find().toArray(function(err,docsarr){
    if(err)throw err;
    console.log(docsarr)
 });
    });

    var db=mongo.db('mongodb://127.0.0.1:27017/Lab8',{native_parser:true});
    db.bind("restaurants");
    db.restaurants.findOne({},function(err,doc){
        if(err)console.log(err);
        console.log(doc);
        db.close();
    });

}