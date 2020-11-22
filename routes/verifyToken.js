const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('Auth-Token');
  if (!token) return res.status(401).send('Access denied!');

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send('Invalid token!');
  }
};
/*
function authenticationToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);
}
*/
