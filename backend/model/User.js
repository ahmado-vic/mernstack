const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'name is required'],
    },
    password: {
      type: String,
      required: [true, 'password id required'],
    },
    roles: {
      type: Array,
      default: 'Employee',
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
