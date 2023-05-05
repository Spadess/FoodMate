import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization"); //were sending bearer token inside the auth header

    if (!token) {
      return res.status(403).send("Access Denied");
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft(); //token starts with "Bearer "
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET); //verify token using the jwt secret string
    req.user = verified;
    next();
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
};
