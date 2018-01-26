var express = require('express');
var router = express.Router();

var demo = [
    {
        start:  new Date(2018, 01, 03, 8, 30).toISOString(),
        end:    new Date(2018, 01, 03, 8, 35).toISOString(),
        title:  "Bachelorarbeit besprechen",
        professor: "abc12345",
        student:   "def12345",
        description: "asdköleölkfölkadlkjwlkjd alsdkjasdlkajsdl asdlk ajsdlkaj dlwiajdsalk jalkwjd"
    }, {
        start:  new Date(2018, 01, 03, 8, 35).toISOString(),
        end:    new Date(2018, 01, 03, 8, 40).toISOString(),
        title:  "Bachelorarbeit besprechen",
        professor: "abc12346",
        student:   "def12345",
        description: "asdköleölkfölkadlkjwlkjd alsdkjasdlkajsdl asdlk ajsdlkaj dlwiajdsalk jalkwjd"
    }
]

/* GET all meetings. */
router.get('/', function(req, res, next) {
    // TODO: implement
    res.send(demo);
});

router.get('/:professorId', function(req, res, next) {
    // TODO: implement
    res.send(demo[1]);
});

router.put('/:professorId', function(req, res, next){
    var item = req.body;
    item.professor = req.params.professorId;

    // TODO: implement
    demo.push(item);
    res.status(200).send(req.body);
});

router.get('/')

module.exports = router;
