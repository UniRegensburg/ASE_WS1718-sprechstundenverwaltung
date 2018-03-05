var express = require('express');
var router = express.Router();

// TODO: replace dummy data with real mongoose connection
var DummyDataService = require('../demo_data/demoDataService.js');
var mongoDb = require('../middleware/mongodb');

/* GET all meetings. TODO: risky operation, restrict access to certain user groups*/
router.get('/', function(req, res, next) {
    // TODO: implement
    res.send(DummyDataService.meetings);
});

router.get('/testdb',
    mongoDb.testDatabase,
    function(req, res, next){
    res.status(200).send(res.data);
});

router.get('/:id',
    mongoDb.getMeetingById,
    function(req, res, next) {
    if(res.result === undefined) res.status(404).send('No meeting with this id found');
    else res.status(200).send(res.result);
});

router.post('/',
    mongoDb.postMeeting,
    function(req, res, next) {
    res.status(201).send(req.body);
});

router.delete('/:id',
    mongoDb.removeMeeting,
    function(req, res, next){
    res.status(202).send('Meeting deleted successfully');
});

router.patch('/:id',
    mongoDb.replaceMeeting,
    function(req, res, next){
        res.status(200).send(res.result);
});

module.exports = router;
