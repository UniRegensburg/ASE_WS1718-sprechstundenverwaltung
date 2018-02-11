//const MongoClient = require('mongodb').MongoClient;
const URI = require('../config/security').uriMongo;
var User = require('../models/models').User;
var  Meeting = require('../models/models').Meeting;

const mongoose = require('mongoose', function(err){
    console.log(err);
});
mongoose.connect(URI);

module.exports = {
    testDatabase: function(req, res, next){
        var newProf = new User({
            username:"abc12345",
            prename:"Christopher ",
            name:"Fuchs",
            role:"professor",
            email:"chrisopher.fuchs@fakeur.de",
            rank:"Professor"
        });
        newProf.save(function (err, fluffy) {
            if (err) return console.error(err);
            next();
        });
    },

    getProfessors: function(req, res, next){
        User.find({"role":"professor"}, function(err, result){
            if(err) throw err;
            console.log(result);
            res.result = result;
            next();
        });
    },

    getMeetingsForUser: function(req, res, next){
            Meeting.find({$or:[{"student":req.params.id},{"professor":req.params.id}]}, function(err, result){
                if(err) throw err;
                console.log(result);
                res.result = result;
                next();
        });
    }
}