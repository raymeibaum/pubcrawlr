const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const UserSchema = new Schema({
  email: String,
  password_digest: String,
  created_at: Date,
  updated_at: Date
});

UserSchema.pre('save', function(next) {
  now = new Date();
  this.updated_at = now;

  if (!this.created_at) { this.created_at = now }
  next()
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = {
  User: UserModel
}
