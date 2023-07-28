const jwt = require('jsonwebtoken');

const verifyJWt = (req, res, next) => {
  //check sent access token in authorization headers from client side
  const authHeaders = req.headers.authorization || req.headers.Authorization;
  if (!authHeaders?.startsWith('Bearer '))
    return res.status(403).json({ message: 'Forbidden' });

  //get accessToken from authorization headers
  const accessToken = authHeaders.split(' ')[1];

  //verify accessToken
  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
    if (error) return res.sendStatus(401);

    req.id = decoded.id;
    req.username = decoded.username;
    req.roles = decoded.roles;
    next();
  });
};

module.exports = verifyJWt;
