const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  email: {
    type: String,
    validate: [{ validator: isEmail }],
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

function toJSON() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
}
userSchema.methods.toJSON = toJSON;

module.exports = mongoose.model('user', userSchema);
