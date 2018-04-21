/* global require */
var mongoose = require("mongoose");

var fileSchema = new mongoose.Schema({
    date: { type: Date, required: true, default: Date.now },
    user: { type: String, ref: 'User' },
    file: {type: String, required: true}
});

var conversationSchema = new mongoose.Schema({
    lecturer: { type: String, required: true, ref: 'User' },
    student: { type: String, required: true, ref: 'User' },
    notes: { type: Array, required: true},
    files: [fileSchema]
});


mongoose.model("Conversation", conversationSchema);