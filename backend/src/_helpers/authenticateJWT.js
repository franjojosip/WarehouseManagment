const jwt = require("jsonwebtoken");

function authenticateJWT(req, res, next) {
  const token = req.body.accessToken;
  const refreshToken = req.body.refreshToken;
  if (token == null || refreshToken == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
      if (err) {
        return res.sendStatus(401);
      } else {
        delete req.body.accessToken;
        delete req.body.refreshToken;

        req.body.userId = data.user.id;
        
        next();
      }
    });
  });
}

module.exports = authenticateJWT;
