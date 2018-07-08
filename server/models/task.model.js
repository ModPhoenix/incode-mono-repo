const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TaskSchema = new Schema({
  title: {type: String, required: true, max: 255},
  description: {type: String, required: true},
  status: {type: String, required: true, default: 'To do'},
});


module.exports = mongoose.model('Task', TaskSchema);
