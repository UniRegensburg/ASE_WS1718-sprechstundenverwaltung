/* global require */
var mongoose = require("mongoose");

var officehourSlotSchema = new mongoose.Schema({
    start: {type: Date, required: true},
    end: {type: Date, required: true},
    //student: { type: Schema.Types.ObjectId, ref: 'User' },
    studentID: { type: String, ref: 'User' },
    title: {type: String},
    description: {type: String},
    slotTaken: {type: Boolean}
});

var officehourSchema = new mongoose.Schema({
    start: {type: Date, required: true},
    slotLength: {type: String, required: true},
    slotCount: {type: String, required: true},
    // lecturer: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    lecturerID: {type: String, required: true},
    descriptionNeeded: {type: Boolean, required: true},
    slots: [officehourSlotSchema]
});

//mongoose.model("OfficehourSlot", officehourSlotSchema);
mongoose.model('Officehour', officehourSchema);