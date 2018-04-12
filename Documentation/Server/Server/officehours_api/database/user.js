/* global require */
var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    email: {type: String, required: true},
    userName: {type: String, required: true},
    password: {type: String, required: true},
    foreName: {type: String, required: true},
    lastName: {type: String, required: true},
    role: {type: String,
        enum: ['lecturer','student'],
        required: true}
});


mongoose.model("User", userSchema);