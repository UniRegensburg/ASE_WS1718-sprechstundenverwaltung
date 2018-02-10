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

router.get('/:id', function(req, res, next) {
    const result = DummyDataService.getMeetingById(req.params.id);
    if(result === undefined) res.status(404).send('No meeting with this id found');
    else res.status(200).send(result);
});

router.post('/', function(req, res, next) {
    // TODO: validate
    DummyDataService.addMeeting(req.body);
    res.status(201).send(req.body);
});

router.delete('/:id', function(req, res, next){
    if(DummyDataService.getMeetingById(req.params.id) === undefined ) res.status(404).send('Meeting was not found');
    else{
        DummyDataService.removeMeetingWithId(req.params.id);
        res.status(202).send('Meeting deleted successfully');
    }
});

router.patch('/:id', function(req, res, next){
    if(DummyDataService.getMeetingById(req.params.id) === undefined) res.status(404).send('Meeting not found');
    else {
        DummyDataService.replaceMeetingWithId(req.params.id, req.body);
        res.status(200).send(req.body);
    }
});

module.exports = router;
