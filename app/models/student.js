const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema ({
    email: {type: String, required:true},
    password: {type: String, required:true},
    name: {type: String, required: true},
    profile_photo: {type: String},
    createdAt: {type: Date, default: Date.now()}
});

module.exports = mongoose.model('Student', StudentSchema);