const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    employee_id: { type: String, unique: true, required: true },
    organization: { type: String, required: true },
    createdDate: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Employee', schema);