const { default: mongoose } = require('mongoose');
const asyncHandler = require('express-async-handler');

const connectDB = asyncHandler(async () => {
  mongoose.connect(process.env.DATABASE_URL);
});

module.exports = connectDB;
