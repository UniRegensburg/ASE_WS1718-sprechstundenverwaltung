const _ = require('lodash');

exports.getUserDetail = function(userid) {
    return _.find(exports.users, {id: userId});
}

exports.getProfessorMeetings = function(professorId) {
    return [].concat(_.filter(exports.meetings, {professor:professorId})).concat(exports.officeHourDummies);;
}

exports.getProfessorDetail = function(professorId) {
    return _.find(exports.professors, {id:professorId});
}

exports.updateOfficeHoursForProfessor = function(professorId, newOfficeHours){
    // TODO: validate, if me is no prof!
    (_.find(exports.professors, {id: professorId}))
        .officeHours = newOfficeHours;
}

exports.addMeeting = function(data){
    var newEntry = data;
    newEntry.id = '' + Math.abs((Math.random() * (9999999999 - 0) )|0);
    exports.meetings.push(newEntry);
}

exports.replaceMeetingWithId = function (meetingId, data){
    const index = _.indexOf(exports.meetings, {id: meetingId});
    //exports.meetings[index] = data;
    exports.meetings.splice(index, 1);
    let newItem = exports.meetings.push(data);
    newItem.id = meetingId;
}

exports.removeMeetingWithId = function(meetingId){
    exports.meetings.splice(_.indexOf(exports.meetings, {id: meetingId}), 1);
}

exports.officeHourDummies = [
    // These are empty office hour objects.
    // TODO: replace with functioning algorithm

    {
        id: "123456755",
        type: "office hour",
        status: "open",
        start:  new Date(2018, 01, 02, 8, 35).toISOString(),
        end:    new Date(2018, 01, 02, 8, 40).toISOString(),
        professor: "abc12345"
    },       {
        id: "123456756",
        type: "office hour",
        status: "open",
        start:  new Date(2018, 01, 02, 8, 40).toISOString(),
        end:    new Date(2018, 01, 02, 8, 45).toISOString(),
        professor: "abc12345"
    },    {
        id: "123456757",
        type: "office hour",
        status: "open",
        start:  new Date(2018, 01, 02, 8, 50).toISOString(),
        end:    new Date(2018, 01, 02, 8, 55).toISOString(),
        professor: "abc12345"
    },
];


exports.meetings = [
    {
        id: "123456754",
        type: "office hour",
        status: "closed",
        start:  new Date(2018, 01, 02, 8, 30).toISOString(),
        end:    new Date(2018, 01, 02, 8, 35).toISOString(),
        title:  "Bachelorarbeit besprechen 1",
        professor: "abc12345",
        student:   "jue123322",
        description: "asdköleölkfölkadlkjwlkjd alsdkjasdlkajsdl asdlk ajsdlkaj dlwiajdsalk jalkwjd"
    },

    {
        id: "12312313123",
        type: "office hour",
        status: "closed",
        start:  new Date(2018, 1, 5, 8, 35).toISOString(),
        end:    new Date(2018, 1, 5, 8, 40).toISOString(),
        title:  "Bachelorarbeit besprechen",
        professor: "abc12345",
        student:   "def12345",
        description: "asdköleölkfölkadlkjwlkjd alsdkjasdlkajsdl asdlk ajsdlkaj dlwiajdsalk jalkwjd"
    },    {
        id: "323123123",
        type: "individual",
        start:  new Date(2018, 01, 05, 8, 30).toISOString(),
        end:    new Date(2018, 01, 05, 8, 35).toISOString(),
        title:  "Bachelorarbeit besprechen",
        professor: "abc12345",
        student:   "jue123456",
        description: "asdköleölkfölkadlkjwlkjd alsdkjasdlkajsdl asdlk ajsdlkaj dlwiajdsalk jalkwjd"
    }, {
        id: "12313421",
        type: "individual",
        start:  new Date(2018, 02, 19, 8, 35).toISOString(),
        end:    new Date(2018, 02, 19, 8, 40).toISOString(),
        title:  "Bachelorarbeit besprechen",
        professor: "abc12345",
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