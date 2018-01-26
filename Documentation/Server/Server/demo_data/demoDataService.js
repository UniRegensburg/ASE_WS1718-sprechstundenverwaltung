const _ = require('lodash');

exports.getUserMeetings = function(userId)  {
    return _.find(exports.meetings, {student:userId});
}

exports.meetings = [
    {
        start:  new Date(2018, 01, 03, 8, 30).toISOString(),
        end:    new Date(2018, 01, 03, 8, 35).toISOString(),
        title:  "Bachelorarbeit besprechen",
        professor: "abc12345",
        student:   "jue123456",
        description: "asdköleölkfölkadlkjwlkjd alsdkjasdlkajsdl asdlk ajsdlkaj dlwiajdsalk jalkwjd"
    }, {
        start:  new Date(2018, 01, 03, 8, 35).toISOString(),
        end:    new Date(2018, 01, 03, 8, 40).toISOString(),
        title:  "Bachelorarbeit besprechen",
        professor: "abc12346",
        student:   "def12345",
        description: "asdköleölkfölkadlkjwlkjd alsdkjasdlkajsdl asdlk ajsdlkaj dlwiajdsalk jalkwjd"
    }
];

exports.users = [{
    id:      "jue123456",
    prename: "Justus",
    name:    "Eberhard",
    role:    "student",
    email:   "justus.eberhard@stud.uni-regensburg.de"
}];

exports.professors = [
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
];