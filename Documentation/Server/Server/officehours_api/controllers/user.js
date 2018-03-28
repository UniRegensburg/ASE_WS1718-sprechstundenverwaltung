/* global require, module */
var mongoose = require("mongoose");
var User = mongoose.model("User");

// Gives back user with specified id
module.exports.getUser = function (req, res) {
    var id;
    if (req.params && req.params.id) {
        id = req.params.id;
    } else {
        sendJSONresponse(res, 404, {
            "message": "id is required"
        });
        return;
    }
    User
        .findById(id)
        .exec(function (err, user) {
            readResponseHandler(err, user, res, "id not found");
        });
};

// Gives back all lecturers
module.exports.getLecturers = function (req, res) {
    User
        .find({'role': 'lecturer'})
        .exec(function (err, user) {
            readResponseHandler(err, user, res, 'no lecturer found');
        });
};

// Creates user
module.exports.createUser = function (req, res) {
    User
        .create({
            email: req.body.email,
            password: req.body.password,
            name: req.body.name,
            lastName: req.body.lastName,
            role: req.body.role,
        }, function (err, user) {
            if (err) {
                console.log(err);
                if (err.name = "ValidationError") {
                    sendJSONresponse(res, 400, {"message": "missing or wrong properties"})
                } else {
                    sendInternalErrorResponse(res);
                }
            } else {
                sendJSONresponse(res, 201, user);
            }
        });
};

// Deletes user with specified id
module.exports.deleteUser = function (req, res) {
    var id;
    if (req.params && req.params.id) {
        id = req.params.id;
    } else {
        sendJSONresponse(res, 404, {
            "message": "id is required"
        });
        return;
    }
    User
        .findByIdAndRemove(id)
        .exec(function (err, user) {
            if (err) {
                sendInternalErrorResponse(res);
            } else {
                if (!user) {
                    sendJSONresponse(res, 404, {"message": "id not found"});
                } else {
                    sendJSONresponse(res, 204, null);
                }
            }
        });
};


var readResponseHandler = function (err, dbObject, res, noDataMessage) {
    var data = true;
    if (!dbObject || (dbObject instanceof Array && dbObject.length == 0)) {
        data = false;
    }
    if (err) {
        sendInternalErrorResponse(res);
    } else {
        if (!data) {
            sendJSONresponse(res, 404, {"message": noDataMessage});
        } else {
            sendJSONresponse(res, 200, dbObject);
        }
    }
};

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};
var sendInternalErrorResponse = function (res) {
    res.writeHead(500, {"Content-Type" : "text/plain"});
    res.end("Internal server error");
};