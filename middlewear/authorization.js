const jwt = require("jsonwebtoken");

module.exports = async function (req, res, next) {
  const token = req.headers.authorization;

  let payload;
  try {
    payload = jwt.verify(token, process.env.SECRET);
    if (!token) throw new Error("Access Denied");
  } catch (e) {
    return res.status(403).json({ error: e.message });
  }

  res.locals.id = payload.id;
  next();
};
