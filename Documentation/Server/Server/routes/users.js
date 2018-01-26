var express = require('express');
var router = express.Router();

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
router.get('/me/meetings', function(req, res, next){
    const result = DummyDataService.getUserMeetings('jue123456');
    if(result === undefined ||result.length < 1){
        return status(204).send('No meetings found!');
    }
    res.status(200).send(result);
});


module.exports = router;