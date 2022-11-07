const expressJwt = require("express-jwt");
function authJwt() {
  const secret = process.env.JWT_SECRET;
  const api = process.env.API_URL;

  return expressJwt({
    secret,
    algorithms: ["HS256"],
  }).unless({
    path: [`${api}/account/login`, `${api}/account/create`],
  });
}

module.exports = authJwt;
