const mongoose = require('mongoose');
const { Schema } = mongoose;

const noteSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'note title is required'],
    },
    body: {
      type: String,
      required: [true, 'note body is required'],
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Note', noteSchema);
