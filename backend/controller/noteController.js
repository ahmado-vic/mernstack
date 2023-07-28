const User = require('../model/User');
const Note = require('../model/Note');
const asyncHandler = require('express-async-handler');

//@desc fetch notes from database
//@path GET /notes
//@access Private
const getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find().populate('author');
  if (!notes) return res.status(204).json({ message: 'something went wrong' });

  return res.status(200).json(notes);
});

//@desc create note
//@path POST /notes
//@access Private
const createNote = asyncHandler(async (req, res) => {
  const { author, title, body } = req.body;
  if (!author || !title || !body)
    return res.status(400).json({ message: 'all fields are required.' });

  const foundNote = await Note.findOne({ title }).exec();
  if (foundNote)
    return res.status(400).json({ message: 'note is already there.' });

  const note = await Note.create({
    author,
    title,
    body,
  });

  return res.status(201).json({ note });
});

//@desc update note
//@path PATCH /notes
//@access Private
const updateNote = asyncHandler(async (req, res) => {
  const { id, title, body, completed } = req.body;
  if (!id)
    return res.status(400).json({ message: 'id is required for updating' });

  const note = await Note.findById(id).exec();

  if (!note)
    return res.status(400).json({ message: 'note is not found to update' });

  const duplicated = await Note.findOne({ title }).lean().exec();

  if (duplicated && duplicated?._id.toString() !== id)
    return res.status(409).json({ message: 'Duplicate note title' });

  note.title = title;
  note.body = body;
  note.completed = completed;
  await note.save();

  return res.status(201).json({ note });
});

//@desc delete note
//@path DELETE /notes
//@access Private
const deleteNote = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ message: 'id is required' });

  const note = await Note.findById(id).exec();
  if (!note) return res.status(400).json({ message: 'note is note found' });

  await note.deleteOne();
  return res
    .status(200)
    .json({ message: 'note has been deleted successfully' });
});

module.exports = { getNotes, createNote, updateNote, deleteNote };
