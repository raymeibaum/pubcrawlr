const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  }
  passwordDigest: {
    type: String,
    required: true
  }
  favoriteBars: [BarSchema]
  timestamps: Date
});

// UserSchema.pre('save', function(next) {
//   let now = new Date();
//   this.timestamps.updatedAt = now;
//
//   if (!this.timestamps.createdAt) {
//     this.timestamps.createdAt = now
//   }
//   next()
// });

const UserModel = mongoose.model('User', UserSchema);

module.exports = {
  User: UserModel
}
