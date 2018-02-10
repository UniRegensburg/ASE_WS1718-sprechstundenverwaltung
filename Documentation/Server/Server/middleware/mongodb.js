const MongoClient = require('mongodb').MongoClient;
const URI = require('../config/security').uriMongo;

module.exports = {
    testDatabase: function(req, res, next){
        MongoClient.connect(URI, function(err, db) {
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