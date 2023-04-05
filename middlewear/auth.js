const jwt = require('jsonwebtoken');

const validationToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const secretKey = process.env.SECRET_KEY;
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded.id;
    console.log(req.user);
    next();
  } catch (err) {
    return res.status(403).json({
      message: 'INVALID_TOKEN',
    });
  }
};

module.exports = validationToken;