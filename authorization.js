const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
    const token = req.headers.authorization;
    if (!token) throw new Error("Access Denied");
    const decoded = jwt.decode(token, { complete: true });
    const expireTime = decoded.payload.exp;
    const currentTime = Math.floor(Date.now() / 1000);
    if (currentTime >= expireTime) throw new Error("Token is expired");
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
  next();
};
