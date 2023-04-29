import jwt from 'jsonwebtoken';

export const verifyToken = async(req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(403).json({mesage: "Token not found"});
  }
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch(error){
    res.status(500).json({Error: error.message});
  }
};
