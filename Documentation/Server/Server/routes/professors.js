const _ = require('lodash');
const moment = require('moment');

var express = require('express');
var router = express.Router();

// TODO: replace dummy data with real mongoose connection
var DummyDataService = require('../demo_data/demoDataService.js');

/* GET professors listing. TODO restrict access, risky route */
router.get('/', function(req, res, next) {
    // TODO get professorData
    res.send(DummyDataService.professors);
});


/**
 * Get detail data for the professor.
 */
router.get('/:id', function(req, res, next ) {
    var result = DummyDataService.getProfessorDetail(req.params.id);

    if(result !== undefined){
        return res.status(200).send(result);
    } else {
        return res.status(404).send('The professor you are looking for does not exist');
    }
});

router.get('/:id/meetings', function(req, res, next) {
    const prof = DummyDataService.getProfessorDetail(req.params.id);

    if(prof === undefined){
        return res.status(404).send('Prof was not found. Sorry.');
    }

    const result = DummyDataService.getProfessorMeetings(req.params.id);


    if(result !== undefined){
        return res.status(200).send(result);
    } else {
        return res.status(204).send('No meetings for this one.');
    }
});

/**
 * Update the office hours of a certain professor
 */
router.patch('/me/officehours', function(req, res, next){
    var newOfficeHours = {};
    var lastTime = new Date(req.body.startTime);
    newOfficeHours.weekday = req.body.weekday;
    newOfficeHours.slots = [];

    // TODO: move this to helper class
    for (let i = 0 ; i < parseInt(req.body.slotNumber); i++) {
        var newTime = moment(lastTime).add(5, 'minutes')._d;
        currSlot = {
            startTime: {
                hours: lastTime.getHours(),
                minutes: lastTime.getMinutes()
            },
            endTime: {
                hours: newTime.getHours(),
                minutes: newTime.getMinutes()
            }
        };
        newOfficeHours.slots.push(currSlot);
        lastTime = newTime;
    }
    DummyDataService.updateOfficeHoursForProfessor('abc12345', newOfficeHours);
    return res.status(200).send(DummyDataService.getProfessorDetail('abc12345'));
});



module.exports = router;
