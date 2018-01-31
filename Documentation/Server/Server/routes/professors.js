const _ = require('lodash');
const Moment = require('moment');
const MomentRange = require('moment-range');
const moment = MomentRange.extendMoment(Moment);

var express = require('express');
var router = express.Router();

const WEEKDAYS = {
    "monday": 1,
    "tuesday": 2,
    "wednesday": 3,
    "thursday": 4,
    "friday": 5
};


const WEEKS_LOOKAHEAD_OFFICE_HOURS = 4;


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

/**
 * Return all meetings of a professor (planned meetings, also free office hours)
 */
router.get('/:id/meetings',
    addProfessorDetail,
    addProfessorMeetings,
    addCurrentFreeOfficeHours,
    function(req, res){
        res.status(200).send(res.meetings);
    }
);

/**
 * Update the office hours of a certain professor
 */
router.patch('/me/officehours', function(req, res, next){
    var newOfficeHours = {};
    var lastTime = new Date(req.body.startTime);
    newOfficeHours.weekday = req.body.weekday;
    newOfficeHours.slots = [];
    newOfficeHours.startTime = req.body.startTime;
    newOfficeHours.slotNumber = req.body.slotNumber;
    newOfficeHours.slotLength = req.body.slotLength;

    // TODO: move this to helper class
    for (let i = 0 ; i < parseInt(req.body.slotNumber); i++) {
        var newTime = moment(lastTime).add(parseInt(req.body.slotLength), 'minutes')._d;
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

router.patch('/:id/officehours', function(req, res, next){
    var newOfficeHours = {};
    var lastTime = new Date(req.body.startTime);
    newOfficeHours.weekday = req.body.weekday;
    newOfficeHours.slots = [];
    newOfficeHours.startTime = req.body.startTime;
    newOfficeHours.slotNumber = req.body.slotNumber;
    newOfficeHours.slotLength = req.body.slotLength;

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
    DummyDataService.updateOfficeHoursForProfessor(req.params.id, newOfficeHours);
    return res.status(200).send(DummyDataService.getProfessorDetail(req.params.id));
});


/*
===========================================
===== MIDDLEWARE FUNCTIONS
===========================================
*/

function addProfessorDetail(req, res, next){
    console.log("add prof detail");
    // TODO replace with real database query
    const prof = DummyDataService.getProfessorDetail(req.params.id);
    if(prof === undefined) return sendProfessorNotFound(req, res);
    req.officeHours = prof.officeHours;
    next();
}

function addProfessorMeetings(req, res, next){
    console.log("add prof meetings");
    // TODO replace with real database query
    // TODO restrict attribute access
    const meetings = DummyDataService.getProfessorMeetings(req.params.id);
    if(meetings === undefined) return sendProfessorNotFound(req, res);
    res.meetings = meetings;
    next();
}

function addCurrentFreeOfficeHours(req, res, next){
    const officeHours = req.officeHours.slots;
    const incomingMeetings = res.meetings;
    const weekdayIndex = WEEKDAYS[req.officeHours.weekday];
    if(officeHours === undefined) return sendInternalServerError(req, res);
    console.log("add free off hours");
    for(var week = 0; week < WEEKS_LOOKAHEAD_OFFICE_HOURS; week++){
        const currOfficeDay = moment().day(weekdayIndex + week*7);
        const meetingsForDay = _.filter(incomingMeetings, function(element){
            const startDate = new Date(element.start);
/*            console.log(moment(startDate));
            console.log(moment(currOfficeDay));
            console.log(moment(element.start).isSame(moment(currOfficeDay), "days"));
            if(moment(element.start).diff(moment(currOfficeDay), "days") == 0)console.log("\n\n\nWORKS. DAB!");*/
            return (moment(element.start).diff(moment(currOfficeDay), "days") == 0);
        });
        //console.log(meetingsForDay);
        //console.log(officeHours);
        for(let j = 0; j < officeHours.length; j++) {
            const currSlot = officeHours[j];
            let startTime = currOfficeDay.clone();
            startTime .hour(currSlot.startTime.hours);
            startTime.minute(currSlot.startTime.minutes);
            let endTime = currOfficeDay.clone();
            endTime.hour(currSlot.endTime.hour);
            endTime.minute(currSlot.endTime.minutes);
            const range = moment().range(startTime, endTime);
            const isSlotTaken = (_.filter(meetingsForDay, function(element){
                console.log("startTime endTime");
                console.log(element);
                return (range.contains(element.start) ||range.contains(element.end))
            }) > 0);
            if(!isSlotTaken || meetingsForDay.length == 0){
                console.log("create new item!");
                res.meetings.push({
                    type: "office hour",
                    status: "open",
                    start:  startTime.toISOString(),
                    end:    endTime.toISOString(),
                    professor: req.params.id
                });
            }
        }

    }
    next();
}

function sendProfessorNotFound(req, res) {
    res.status(404).send('Prof was not found.');
}

function sendInternalServerError(req, res){
    res.status(500).send('Somewhere, something has terrible gone wrong.')
}

/*
===========================================
=====
===========================================
 */



module.exports = router;
