/* global require, module */
var mongoose = require("mongoose");
var Conversation = mongoose.model('Conversation');

// Creates new conversation
module.exports.createConversation = function (req, res) {
    Conversation
        .create({
            lecturer: req.body.lecturer,
            student: req.body.student,
            notes: req.body.notes,
            files: []
        }, function (err, conversation) {
            if (err) {
                console.log(err);
                if (err.name = "ValidationError") {
                    sendJSONresponse(res, 400, {"message": "missing or wrong properties"})
                } else {
                    sendInternalErrorResponse(res);
                }
            } else {
                sendJSONresponse(res, 201, conversation);
            }
        });
};

// Gets all conversations for lecturer with specified id
module.exports.getAllConversationsForLecturer = function (req, res) {
    var id;
    if (req.params && req.params.id) {
        id = req.params.id;
    } else {
        sendJSONresponse(res, 404, {
            "message": "id is required"
        });
        return;
    }
    Conversation
        .find({'lecturer': id})
        .exec(function(err, conversation){
            readResponseHandler(err, conversation, res, "id not found");
        });
};

// Gets all conversations for student with specified id
module.exports.getAllConversationsForStudent = function (req, res) {
    var id;
    if (req.params && req.params.id) {
        id = req.params.id;
    } else {
        sendJSONresponse(res, 404, {
            "message": "id is required"
        });
        return;
    }
    Conversation
        .find({'student': id})
        .exec(function(err, conversation){
            readResponseHandler(err, conversation, res, "id not found");
        });
};

// Gives back conversation with specified id
module.exports.getConversationByID = function (req, res) {
    var id;
    if (req.params && req.params.id) {
        id = req.params.id;
    } else {
        sendJSONresponse(res, 404, {
            "message": "id is required"
        });
        return;
    }
    Conversation
        .findById(id)
        .exec(function(err, conversation){
            readResponseHandler(err, conversation, res, "id not found");
        });
};

// Updates existing conversation with new notes
module.exports.updateConversation = function (req, res) {
    var id;
    if (req.params && req.params.id) {
        id = req.params.id;
    } else {
        sendJSONresponse(res, 404, {
            "message": "id is required"
        });
        return;
    }
    Conversation
        .findById(id)
        .exec(function (err, conversation) {
            conversation.set({'notes': req.body.notes});
            conversation.save(function(err, conversation) {
                readResponseHandler(err, conversation.notes, res, "id not found");  // gives back updated notes-array, alternatively give back whole conversation
            });
        });
};

// Deletes conversation with specified id
module.exports.deleteConversation = function (req, res) {
    var id;
    if (req.params && req.params.id) {
        id = req.params.id;
    } else {
        sendJSONresponse(res, 404, {
            "message": "id is required"
        });
        return;
    }
    Conversation
        .findByIdAndRemove(id)
        .exec(function (err, conversation) {
            readResponseHandler(err, conversation, res, "id not found");
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