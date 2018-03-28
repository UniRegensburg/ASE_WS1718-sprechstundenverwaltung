var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

require("./officehours_api/database/db");
var routes = require('./officehours_api/routes/index');

var app = express();


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    console.log(err);
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send("error");
});

var port = process.env.PORT || "3000";
app.listen(port);
//app.listen(8080);
