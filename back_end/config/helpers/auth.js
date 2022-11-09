const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.header("x-access-token");
  const token = authHeader;
  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "The user is not authorized !" });
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decode.userId;
    next();
  } catch (error) {
    console.log(error.message);
    res.status(403).json({ success: false, message: "Invalid Token" });
  }
};

module.exports = verifyToken;
