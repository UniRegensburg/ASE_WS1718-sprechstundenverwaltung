const _ = require('lodash');

var express = require('express');
var router = express.Router();

const demo = [
    {
        id: "abc12345",
        prename: "Christoph",
        name: "Fuchs",
        position: "Professor",
        email: "christoph.fuchs@uni-regensburg.de",
        officeHours: {
            weekday: "monday",
            startTime: {
                hours: "12",
                minutes: "00"
            },
            slots: [
                {
                    startTime:  "12:00",
                    endTime:    "12:05"
                },
                {
                    startTime:  "12:05",
                    endTime:    "12:10"
                },
                {
                    startTime:  "12:10",
                    endTime:    "12:15"
                }
            ]
        }
    },
    {
        id: "abc2345",
        prename: "Alfred",
        name: "Schwarz",
        position: "M.A.",
        email: "alfred.schwarz@uni-regensburg.de",
        officeHours: {
            weekday: "monday",
            startTime: {
                hours: "12",
                minutes: "00"
            },
            slots: [
                {
                    startTime:  "12:00",
                    endTime:    "12:05"
                },
                {
                    startTime:  "12:05",
                    endTime:    "12:10"
                },
                {
                    startTime:  "12:10",
                    endTime:    "12:15"
                }
            ]
        }
    },
    {
        id: "abc12346",
        prename: "Peter",
        name: "Kiesmann",
        position: "Professor",
        email: "peter.kiesmann@uni-regensburg.de",
        officeHours: {
            weekday: "monday",
            startTime: "12:00",
            slots: [
                {
                    startTime:  "12:00",
                    endTime:    "12:05"
                },
                {
                    startTime:  "12:05",
                    endTime:    "12:10"
                },
                {
                    startTime:  "12:10",
                    endTime:    "12:15"
                }
            ]
        }
    }
]


/* GET users listing. */
router.get('/', function(req, res, next) {
    // TODO get professorData
    res.send(JSON.stringify(demo));
});

router.get('/:id', function(req, res, next ) {
    // TODO get real data
    var result = _.find(demo, {id:req.params.id});

    if(result !== undefined){
        return res.status(200).send(result);
    } else {
        return res.status(404).send();
    }
});

module.exports = router;
