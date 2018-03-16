var express = require('express');
var router = express.Router();
var mongodb = require('../middleware/mongodb');

// TODO: replace dummy data with real mongoose connection
var DummyDataService = require('../demo_data/demoDataService.js');


/* Get all users. TODO: protect access, risky method!*/
router.get('/', function(req, res, next) {
    res.send(DummyDataService.users);
});

/**
 * Route for returning the profile data of the currently logged in user.
 */
router.get('/me', function(req, res, next) {
    res.status(200).send(DummyDataService.users[0]);
});

/**
 * Route for returning all meetings of the currently logged in user.
 */
router.get('/me/meetings',
    /*TODO replace this with own user id*/
    function(req, res, next){
        req.params.id = 'jue12345';
        next();
    },
    mongodb.getMeetingsForUser,
    function(req, res, next){
    console.log(res.result);
    //const result = DummyDataService.getUserMeetings('jue123456');
    if(res.result === undefined ||res.result.length < 1){
        return res.status(204).send('No meetings found!');
    }
    res.status(200).send(res.result);
});


module.exports = router;