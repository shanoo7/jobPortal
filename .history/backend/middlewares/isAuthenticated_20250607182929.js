
import jwt from "jsonwebtoken";

const verifyToken = (token, secret) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) return reject(err);
      resolve(decoded);
    });
  });

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log("token", token)
    if (!token) {
      return res.status(401).json({
        message: "User not authenticated...",
        success: false,
      });
    }

    const decode = await verifyToken(token, process.env.SECRET_KEY);
    req.id = decode.userId;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
      success: false,
    });
  }
};

export default isAuthenticated;
