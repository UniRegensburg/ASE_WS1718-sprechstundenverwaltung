var express = require('express');
var router = express.Router();

// TODO: replace dummy data with real mongoose connection
var DummyDataService = require('../demo_data/demoDataService.js');

/* GET all meetings. TODO: risky operation, restrict access to certain user groups*/
router.get('/', function(req, res, next) {
    // TODO: implement
    res.send(demo);
});
    
module.exports = router;
