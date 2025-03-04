// const jwt = require("jsonwebtoken");

// module.exports = (req, res, next) => {
//     const token = req.header("Authorization")?.split(" ")[1]; // Extract token

//     if (!token) {
//         return res.status(401).json({ message: "No token, authorization denied." });
//     }

//     try {
//         const verified = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = verified;
//         next();
//     } catch (err) {
//         if (err.name === "TokenExpiredError") {
//             return res.status(401).json({ message: "Session expired. Please log in again." });
//         res.status(400).json({ message: "Invalid token." });
//     }
// };
