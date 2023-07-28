const express = require('express');
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require('../controller/userController');
const verifyJWt = require('../middleware/verifyJWT');
const router = express.Router();

router.use(verifyJWt);

router
  .route('/')
  .get(getUsers)
  .post(createUser)
  .patch(updateUser)
  .delete(deleteUser);

module.exports = router;
