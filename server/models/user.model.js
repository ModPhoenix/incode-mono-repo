const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: String,
  email: {type: String, required: true, unique: true},
  password: String,
  fullName: String,
  dateOfBirth: String,
  gender: String,
  address: String,
  phone: String,
  avatar: { type: String, default: 'https://www.irishtimes.com/polopoly_fs/1.3170107.1501253408!/image/image.jpg_gen/derivatives/box_620_330/image.jpg' },
  skills: String,
  experience: String,
  isSuperuser: { type: Boolean, default: false },
});

mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');
