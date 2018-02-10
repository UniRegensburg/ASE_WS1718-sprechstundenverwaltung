const Schema = require("mongoose").Schema;
const mongoose = require("mongoose");

// ============================
// Office Hour Schemas
// ============================
var TimeSlotSchema = new Schema({
    startTime: String,
    endTime: String
});
var TimeSlot =  mongoose.model("TimeSlot", TimeSlotSchema);

var OfficeHourSchema = new Schema({
    startDate: Date,
    endDate: Date,
    weekday: String,
    slots:[TimeSlotSchema]
});
var OfficeHour =  mongoose.model("OfficeHour", OfficeHourSchema);

// ============================
// User and Professor Schemas
// ============================
var configUserSchema = {
    //_id: ObjectId,
    username: String,
    name: String,
    prename: String,
    role: String,
    email: String,
    officehours: [OfficeHourSchema]
};
var UserSchema = new Schema(configUserSchema);
var User =  mongoose.model("User", UserSchema);

// Professor Schema extends inherited attributes by own attributes
var ProfessorSchema = new Schema(configUserSchema);
ProfessorSchema.add({rank:String});
ProfessorSchema.add({officehours:Object})
var Professor = mongoose.model("Professor", ProfessorSchema);



// ============================
// Meeting Schemas
// ============================

var MeetingSchema = new Schema({
   //_id: ObjectId,
   type: String,
   status: String,
   start: Date,
   end: Date,
   title: String,
   professor: String,
   student: String,
   description: String
});
var Meeting=  mongoose.model("Meeting", MeetingSchema);

module.exports = {
    User: User,
    Professor: Professor,
    Meeting: Meeting
}