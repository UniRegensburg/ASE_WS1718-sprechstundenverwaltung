/* global require */
var mongoose = require("mongoose");

var officehourSlotSchema = new mongoose.Schema({
    start: {type: Date, required: true},
    end: {type: Date, required: true},
    lecturerID: { type: String, ref: 'User' },
    studentID: { type: String, ref: 'User' },
    title: {type: String},
    description: {type: String},
    slotTaken: {type: Boolean}
});

var officehourSchema = new mongoose.Schema({
    start: {type: Date, required: true},
    slotLength: {type: String, required: true},
    slotCount: {type: String, required: true},
    lecturerID: {type: String, required: true},
    descriptionNeeded: {type: Boolean, required: true},
    slots: [officehourSlotSchema]
});

mongoose.model('Officehour', officehourSchema);