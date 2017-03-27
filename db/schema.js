const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const BarSchema = new Schema({
  name: String,
  address: {
    street: String,
    city: String,
    state: String
  }
});

const PubcrawlSchema = new Schema({
  name: String,
  theme: String,
  date: Date,
  startTime: Date,
  startBar: BarSchema,
  bars: [BarSchema],
  specialInstructions: String,
  timestamps: {
    createdAt: Date,
    updatedAt: Date
  }
});

PubcrawlSchema.pre('save', function(next) {
  let now = new Date();
  this.timestamps.updatedAt = now;

  if (!this.timestamps.createdAt) {
    this.timestamps.createdAt = now
  }
  next()
});

const UserSchema = new Schema({
  username: String,
  passwordDigest: String,
  favoriteBars: [BarSchema],
  pubcrawls: [PubcrawlSchema],
  timestamps: {
    createdAt: Date,
    updatedAt: Date
  }
});

UserSchema.pre('save', function(next) {
  let now = new Date();
  this.timestamps.updatedAt = now;

  if (!this.timestamps.createdAt) {
    this.timestamps.createdAt = now
  }
  next()
});



const UserModel = mongoose.model('User', UserSchema);
const BarModel = mongoose.model('Bar', BarSchema);
const PubcrawlModel = mongoose.model('Pubcrawl', PubcrawlSchema);

module.exports = {
  User: UserModel,
  Bar: BarModel,
  Pubcrawl: PubcrawlModel
}
