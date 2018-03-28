/* global require */
var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
    date: { type: Date, required: true, default: Date.now },
    //user: { type: Schema.Types.ObjectId, ref: 'User' },
    user: { type: String, ref: 'User' },
    text: {type: String, required: true}
})

var fileSchema = new mongoose.Schema({
    date: { type: Date, required: true, default: Date.now },
    //user: { type: Schema.Types.ObjectId, ref: 'User' },
    user: { type: String, ref: 'User' },
    file: {type: String, required: true}
})

var conversationSchema = new mongoose.Schema({
    start: { type: Date, required: true, default: Date.now },
    //lecturer: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    //student: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    lecturer: { type: String, required: true, ref: 'User' },
    student: { type: String, required: true, ref: 'User' },
    comments: [commentSchema],
    files: [fileSchema]
});


mongoose.model("Conversation", conversationSchema);