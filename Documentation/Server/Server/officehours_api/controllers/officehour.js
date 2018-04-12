/* global require, module */
var mongoose = require("mongoose");
var Officehour = mongoose.model("Officehour");
//var OfficehourSlot = mongoose.model('OfficehourSlot');

// using moment for date calculation
const Moment = require('moment');
const MomentRange = require('moment-range');
const moment = MomentRange.extendMoment(Moment);

// Gives back all officehours
module.exports.getAllOfficehours = function (req, res) {
    Officehour
        .find({})
        .exec(function (err, officehours) {
            readResponseHandler(err, officehours, res, "no officehour found");
        });
};

// Gives back all officehours of lecturer with specified id
module.exports.getAllOfficehoursOfLecturer = function (req, res) {
    var id;
    if (req.params && req.params.id) {
        id = req.params.id;
    } else {
        sendJSONresponse(res, 404, {
            "message": "id is required"
        });
        return;
    }
    Officehour
        .find({'lecturerID': id})
        .exec(function (err, officehours) {
            readResponseHandler(err, officehours, res, "id not found");
        });
};

// Gives back all officehourslots of student with specified id
module.exports.getAllOfficehourslotsOfStudent = function (req, res) {
    var id;
    var slotsArray = [];
    if (req.params && req.params.id) {
        id = req.params.id;
    } else {
        sendJSONresponse(res, 404, {
            "message": "id is required"
        });
        return;
    }
    Officehour
        .find({'slots.studentID': id})
        .exec(function (err, officehour) {
            for(var i in officehour){
                for(var j in officehour[i].slots) {
                    if(officehour[i].slots[j].studentID == id){
                        slotsArray.push(officehour[i].slots[j]);
                    }
                }
            }
            readResponseHandler(err, slotsArray, res, "id not found");
        });
};

// Gives back officehour with specified id
module.exports.getOfficehour = function (req, res) {
    var id;
    if (req.params && req.params.id) {
        id = req.params.id;
    } else {
        sendJSONresponse(res, 404, {
            "message": "id is required"
        });
        return;
    }
    Officehour
        .findById(id)
        .exec(function (err, officehours) {
            readResponseHandler(err, officehours, res, "id not found");
        });
};

// Creates officehour
module.exports.createOfficehour = function (req, res) {
    Officehour
        .create({
            start: req.body.start,
            slotLength: req.body.slotLength,
            slotCount: req.body.slotCount,
            lecturerID: req.body.lecturerID, //mongoose.Types.ObjectId(req.body.lecturerId),
            descriptionNeeded: req.body.descriptionNeeded,
            slots: calculateSlots(req.body.start, req.body.slotLength, req.body.slotCount)  // fill slotsarray with slots
        }, function (err, officehour) {
            if (err) {
                console.log(err);
                if (err.name = "ValidationError") {
                    sendJSONresponse(res, 400, {"message": "missing or wrong properties"})
                } else {
                    sendInternalErrorResponse(res);
                }
            } else {
                sendJSONresponse(res, 201, officehour);
            }
        });
};

// Calculates slots for officehour
calculateSlots = function(startDate, slotLength, slotCount) {
    var startTime = new Date(startDate);
    var slotsArray = [];
    //var slot = new OfficehourSlot;
    var slot = {};
    for (var i = 0; i < parseInt(slotCount); i++){
        var endTime = moment(startTime).add(slotLength, 'minutes');
        slot = {
            start: startTime,
            end: endTime,
            studentID: '',
            title: '',
            description: '',
            slotTaken: false
        };
        slotsArray.push(slot);
        startTime = endTime;
    }
    return slotsArray;
};

// Finds officehour with specified id and removes it
module.exports.deleteOfficehour = function (req, res) {
    var id;
    if (req.params && req.params.id) {
        id = req.params.id;
    } else {
        sendJSONresponse(res, 404, {
            "message": "id is required"
        });
        return;
    }
    Officehour
        .findByIdAndRemove(id)
        .exec(function (err, officehours) {
            readResponseHandler(err, officehours, res, "id not found");
        });
};

// Finds all officehours of lecturer with specified id and removes them
module.exports.deleteAllOfficehours = function (req, res) {
    var id;
    if (req.params && req.params.id) {
        id = req.params.id;
    } else {
        sendJSONresponse(res, 404, {
            "message": "id is required"
        });
        return;
    }
    Officehour
        .find({'lecturerID': id}).remove()
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

// Find and give back slot with specified id
module.exports.getOfficehourSlot = function (req, res) {
    var id;
    if (req.params && req.params.id) {
        id = req.params.id;
    } else {
        sendJSONresponse(res, 404, {
            "message": "id is required"
        });
        return;
    }
    Officehour
        .findOne({'slots._id': mongoose.Types.ObjectId(id)})
        .exec(function (err, officehour) {
            readResponseHandler(err, officehour.slots.id(id), res, "id not found");
        });
};

// Find and update slot with specified id
module.exports.updateOfficehourSlot = function (req, res) {
    var id;
    if (req.params && req.params.id) {
        id = req.params.id;
    } else {
        sendJSONresponse(res, 404, {
            "message": "id is required"
        });
        return;
    }
    Officehour
        .findOne({'slots._id': mongoose.Types.ObjectId(id)})
        .exec(function (err, officehour) {
            officehour.slots.id(id).set({
                studentID: req.body.studentID,
                title: req.body.title,
                description: req.body.description,
                slotTaken: req.body.slotTaken
                });
            officehour.save(function(err, officehour) {
                readResponseHandler(err, officehour.slots.id(id), res, "id not found");
            });
        });
};

// Find and delete slot with specified id
module.exports.deleteOfficehourSlot = function (req, res) {
    var id;
    if (req.params && req.params.id) {
        id = req.params.id;
    } else {
        sendJSONresponse(res, 404, {
            "message": "id is required"
        });
        return;
    }
    Officehour
        .findOne({'slots._id': mongoose.Types.ObjectId(id)})
        .exec(function (err, officehour) {
            //console.log(officehour);
            officehour.slots.id(id).remove();
            officehour.save(function(err, officehour) {
                readResponseHandler(err, officehour, res, "id not found");
            });
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