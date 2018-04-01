/* global require, module */
var express = require("express");
var router = express.Router();

var ctrlUser = require("../controllers/user");
var ctrlOfficehour = require("../controllers/officehour");
var ctrlConversation = require("../controllers/conversation");


// ****user api routes****
router.get("/user/:id", ctrlUser.getUser);  // get user with specific id
router.get('/lecturers', ctrlUser.getLecturers);    // get all lecturers

router.post("/user", ctrlUser.createUser);  // create new user

router.delete("/user/:id", ctrlUser.deleteUser);    // delete user with specific id

// ****office hour api routes****
router.get("/officehours", ctrlOfficehour.getAllOfficehours);   // get all officehours
router.get('/user/:id/officehours', ctrlOfficehour.getAllOfficehoursOfLecturer); // get all officehours of specific lecturer
router.get('/user/:id/officehourslot', ctrlOfficehour.getAllOfficehourslotsOfStudent); // get all officehourslots of specific student
router.get("/officehours/:id", ctrlOfficehour.getOfficehour);    // get specific officehour
router.get('/officehourslot/:id', ctrlOfficehour.getOfficehourSlot);    // get specific officehourslot

router.post("/officehours", ctrlOfficehour.createOfficehour);    // create officehour
router.patch('/officehourslot/:id', ctrlOfficehour.updateOfficehourSlot);    // update slot with new data

router.delete('/user/:id/officehours', ctrlOfficehour.deleteAllOfficehours);  // delete all officehours of specific lecturer
router.delete("/officehours/:id", ctrlOfficehour.deleteOfficehour);  // delete specific officehour
router.delete('/officehourslot/:id', ctrlOfficehour.deleteOfficehourSlot);   // delete specific slot of specific lecturer


//  ****conversation api routes****
router.get('/conversation/lecturer/:id', ctrlConversation.getAllConversationsForLecturer);  // get all conversations for lecturer with specific id
router.get('/conversation/student/:id', ctrlConversation.getAllConversationsForStudent);  // get all conversations for student with specific id
router.get('/conversation/:id', ctrlConversation.getConversationByID);  // get conversation with specific id

router.post('/conversation', ctrlConversation.createConversation);  // create new conversation
router.patch('/conversation/:id', ctrlConversation.updateConversation); // update existing conversation with new notes

router.delete('/conversation/:id', ctrlConversation.deleteConversation);    // delete conversation with specific id



module.exports = router;