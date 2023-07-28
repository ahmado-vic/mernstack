const User = require('../model/User');
const Note = require('../model/Note');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

//@desc login user
//@path POST /auth
//@access Public
const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: 'all fields are required.' });

  const userExist = await User.findOne({ username }).exec();
  if (!userExist)
    return res.status(401).json({ message: 'user is not found.' });

  if (userExist && userExist.active) {
    const matchedPWD = await bcrypt.compare(password, userExist.password);
    if (!matchedPWD)
      return res.status(401).json({ message: 'wrong password.' });

    //create JWT tokens
    const accessToken = jwt.sign(
      {
        id: userExist.id,
        username: userExist.username,
        roles: userExist.roles,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '15m',
      }
    );

    const refreshToken = jwt.sign(
      {
        id: userExist.id,
        username: userExist.username,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: '7d',
      }
    );

    //stores accessToken in cookies 'httpOnly'
    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      SameSite: 'None',
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ accessToken });
  } else {
    return res.status(400).json({ message: 'user not active!' });
  }
});

//@desc refresh token
//@path GET /auth/refresh
//@access Private
const refresh = asyncHandler(async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' });

  const refreshToken = cookies.jwt;

  //verify refreshToken
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) return res.sendStatus(401);

      //get signed-user
      const user = await User.findById(decoded.id).exec();

      //create a new accessToken
      const accessToken = jwt.sign(
        {
          id: user.id,
          username: user.username,
          roles: user.roles,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
      );
      return res.json({ accessToken });
    }
  );
});

//@desc logout user
//@path POST /auth/logout
//@access Private
const logout = asyncHandler(async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //no content

  res.clearCookie('jwt', {
    httpOnly: true,
    SameSite: 'None',
    secure: true,
  });
  res.json({ message: 'Cookie Cleared' });
});

module.exports = { login, refresh, logout };
