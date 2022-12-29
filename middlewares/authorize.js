const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

module.exports = (roles = []) => {
  if (typeof roles === "string") {
    roles = [roles];
  }

  return (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) {
      return res.status(400).json({
        jsonapi: {
          version: "1.0",
        },
        meta: {
          author: "Muhammad Umar Mansyur",
          copyright: "2022 ~ BE JavaScript Binar Academy",
        },
        status: 401,
        message: "You're not authorized!",
      });
    }

    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;

    if (roles.length > 0 && !roles.includes(payload.role)) {
      return res.status(401).json({
        jsonapi: {
          version: "1.0",
        },
        meta: {
          author: "Muhammad Umar Mansyur",
          copyright: "2022 ~ BE JavaScript Binar Academy",
        },
        status: 401,
        message: "You're not authorized!",
      });
    }

    next();
  };
};
