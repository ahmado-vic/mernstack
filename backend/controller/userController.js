const User = require('../model/User');
const Note = require('../model/Note');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');

//@desc get all users
//@path GET /users
//@access Private
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password');

  if (!users) return res.status(400).json({ message: 'server error' }); // server error

  return res.status(200).json(users);
});

//@desc create user
//@path POST /users
//@access Private
const createUser = asyncHandler(async (req, res) => {
  const { username, password, roles } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: 'all fields are required' });

  //check user existence
  const foundUser = await User.findOne({ username }).exec();
  if (foundUser) return res.status(409).json({ message: 'user duplicated!' });

  //hash password
  const hashPassword = await bcrypt.hash(password, 10);

  //create user
  const user = await User.create({ username, password: hashPassword, roles });
  if (!user) return res.status(400).json({ message: 'something went wrong!' });

  await user.save();
  return res.status(201).json({ user });
});

//@desc update user
//@path Patch /user
//access Private
const updateUser = asyncHandler(async (req, res) => {
  const { id, username, password, roles, active } = req.body;
  if (!id)
    return res.status(400).json({ message: 'user id is required for update' });

  //check user existence
  const foundUser = await User.findById(id).exec();
  if (!foundUser) return res.status(400).json({ message: 'user not found' });

  const duplicated = await User.findOne({ username }).lean().exec();

  if (duplicated && duplicated?._id.toString() !== id)
    return res.status(409).json({ message: 'Duplicate user' });

  foundUser.username = username;
  if (password) foundUser.password = password;
  foundUser.roles = roles;
  foundUser.active = active;
  await foundUser.save();

  return res.status(201).json({ foundUser });
});

//@desc delete user
//@path DELETE /user
//@access Private
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ message: 'user id is required' });

  const user = await User.findById(id).exec();
  if (!user) return res.status(400).json({ message: 'user is not found' });

  //check users' notes
  const notes = await Note.find().where({ author: id });
  if (notes.length > 0) {
    return res.status(400).json({
      message: `${
        notes.length > 1
          ? `user cannot be deleted he has ${notes.length} notes`
          : `user cannot be deleted he has ${notes.length} note`
      }`,
    });
  }
  await user.deleteOne();
  return res.status(200).json({ message: `user id ${id} has been deleted.` });
});

module.exports = { getUsers, createUser, updateUser, deleteUser };
