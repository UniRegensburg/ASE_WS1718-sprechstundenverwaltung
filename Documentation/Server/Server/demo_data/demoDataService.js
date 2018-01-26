const _ = require('lodash');

exports.getUserMeetings = function(userId)  {
    return _.filter(exports.meetings, {student:userId});
}

exports.getUserDetail = function(userid) {
    return _.find(exports.users, {id: userId});
}

exports.getProfessorMeetings = function(professorId) {
    return _.filter(exports.meetings, {professor:professorId});
}

exports.getProfessorDetail = function(professorId) {
    return _.find(exports.professors, {id:professorId});
}

exports.updateOfficeHoursForProfessor = function(professorId, newOfficeHours){
    // TODO: validate, if me is no prof!
    (_.find(exports.professors, {id: professorId}))
        .officeHours = newOfficeHours;
}

exports.getMeetingById = function(meetingId){
    return _.find(exports.meetings, {id: meetingId});
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

exports.meetings = [
    {
        id: "123456754",
        start:  new Date(2018, 01, 03, 8, 30).toISOString(),
        end:    new Date(2018, 01, 03, 8, 35).toISOString(),
        title:  "Bachelorarbeit besprechen 1",
        professor: "abc12345",
        student:   "jue123322",
        description: "asdköleölkfölkadlkjwlkjd alsdkjasdlkajsdl asdlk ajsdlkaj dlwiajdsalk jalkwjd"
    }, {
    id: "12312313123",
        start:  new Date(2018, 01, 03, 8, 35).toISOString(),
        end:    new Date(2018, 01, 03, 8, 40).toISOString(),
        title:  "Bachelorarbeit besprechen",
        professor: "abc12346",
        student:   "def12345",
        description: "asdköleölkfölkadlkjwlkjd alsdkjasdlkajsdl asdlk ajsdlkaj dlwiajdsalk jalkwjd"
    },    {
    id: "323123123",
        start:  new Date(2018, 01, 03, 8, 30).toISOString(),
        end:    new Date(2018, 01, 03, 8, 35).toISOString(),
        title:  "Bachelorarbeit besprechen",
        professor: "abc12345",
        student:   "jue123456",
        description: "asdköleölkfölkadlkjwlkjd alsdkjasdlkajsdl asdlk ajsdlkaj dlwiajdsalk jalkwjd"
    }, {
    id: "12313421",
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