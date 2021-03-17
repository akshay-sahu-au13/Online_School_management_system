const mongoose = require('mongoose');

const BatchSchema = new mongoose.Schema({
    name: {type: String, required: true},
    created_by: {type: mongoose.Schema.Types.ObjectId, ref: Teacher, required:true},
    deleted: {type: Boolean, default:false},
    createdAt: {type: Date, default: Date.now()}
});

module.exports = mongoose.model('Batch', BatchSchema);