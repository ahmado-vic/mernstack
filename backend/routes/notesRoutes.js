const express = require('express');
const router = express.Router();
const verifyJWT = require('../middleware/verifyJWT');

const {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
} = require('../controller/noteController');

router.use(verifyJWT);

router
  .route('/')
  .get(getNotes)
  .post(createNote)
  .patch(updateNote)
  .delete(deleteNote);

module.exports = router;
