//const MongoClient = require('mongodb').MongoClient;
const URI = require('../config/security').uriMongo;
var User = require('../models/models').User;
var  Meeting = require('../models/models').Meeting;
var Professor = require('../models/models').Professor;

const mongoose = require('mongoose', function(err){
    console.log(err);
});
mongoose.connect(URI);

module.exports = {
    testDatabase: function(req, res, next){
        /*MongoClient.connect(URI, function(err, db) {
            if(err) this.sendDatabaseError(res, err);
            var dbo = db.db("ASE1718");
            dbo.collection("users").find({"role":"professor"}).toArray(function(err, result){
                if(err) throw err;
                res.data = result;
                db.close();
                next();
            })
        });
    },

    getProfessors: function(req, res, next){
        MongoClient.connect(URI, function(err, db){
            if(err) throw err;
            var dbo = db.db("ASE1718");
            dbo.users.find({"role":"professor"}, function(err, result){
                console.log(result.toArray());
            });
        })
    }
}