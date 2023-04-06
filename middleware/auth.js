const jwt = require('jsonwebtoken');

const checkLogInToken = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization;
    const secretKey = process.env.SECRET_KEY;

    if (!accessToken) {
      const error = new Error('NEED_ACCESS_TOKEN');
      error.statusCode = 401;

      return res.status(error.statusCode).json({ message: error.message });
    }

    const decoded = jwt.verify(accessToken, secretKey);

    req.user = await decoded.id;

    next();
  } catch (err) {
    return res.status(403).json({
      message: 'INVALID_TOKEN',
    });
  }
};

module.exports = checkLogInToken;
