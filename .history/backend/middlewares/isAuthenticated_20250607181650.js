
import jwt from "jsonwebtoken";

// const verifyToken = (token, secret) =>
//   new Promise((resolve, reject) => {
//     jwt.verify(token, secret, (err, decoded) => {
//       if (err) return reject(err);
//       resolve(decoded);
//     });
//   });

// const isAuthenticated = async (req, res, next) => {
//   try {
//     const token = req.cookies.token;
//     console.log("token", token)
//     if (!token) {
//       return res.status(401).json({
//         message: "User not authenticated...",
//         success: false,
//       });
//     }

//     const decode = await verifyToken(token, process.env.SECRET_KEY);
//     req.id = decode.userId;
//     next();
//   } catch (error) {
//     return res.status(401).json({
//       message: "Invalid token",
//       success: false,
//     });
//   }
// };

const isAuthenticated = async (req, res, next) => {
  try {
    console.log('Raw cookies:', req.cookies); // Debug line
    
    // Check multiple token sources
    const token = req.cookies?.token || 
                 req.headers?.authorization?.split(' ')[1] || 
                 req.query?.token;

    if (!token) {
      console.error('No token found in:', {
        cookies: req.cookies,
        headers: req.headers,
        query: req.query
      });
      return res.status(401).json({
        message: "Authentication required",
        success: false,
      });
    }

    console.log('Token found:', token); // Debug line
    const decode = await verifyToken(token, process.env.SECRET_KEY);
    req.user = decode;
    next();
  } catch (error) {
    console.error("Auth Error:", error.message);
    return res.status(401).json({
      message: "Invalid or expired token",
      success: false,
      requiresReauth: true
    });
  }
};
export default isAuthenticated;
