// // middleware/auth.js
// const jwt = require("jsonwebtoken");

// function verifyToken(req, res, next) {
//   const authHeader = req.headers.authorization;
//   if (!authHeader) return res.status(401).json({ error: "Unauthorized" });

//   const token = authHeader.split(" ")[1]; // Bearer token
//   if (!token) return res.status(401).json({ error: "Unauthorized" });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // attach user info to request
//     next();
//   } catch (err) {
//     return res.status(403).json({ error: "Invalid token" });
//   }
// }

// function authorizeRoles(...roles) {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return res.status(403).json({ error: "Forbidden: Permission denied" });
//     }
//     next();
//   };
// }

// module.exports = { verifyToken, authorizeRoles };



// middleware/auth.js - UPDATED (No JWT)
const { MongoClient, ObjectId } = require('mongodb');

const uri = process.env.DB_URL;
const client = new MongoClient(uri);

async function verifyToken(req, res, next) {
  try {
    const userId = req.headers['user-id'];
    
    // TEMPORARY: যদি user-id না থাকে, temporary user create করো
    if (!userId) {
      req.user = { 
        id: "temp_id", 
        role: "user", 
        email: "guest@email.com" 
      };
      req.decoded = req.user; // backward compatibility
      return next();
    }

    // Database connection
    await client.connect();
    const db = client.db("QdropDB");
    const userCollection = db.collection("users");

    // Database থেকে user verify করো
    const user = await userCollection.findOne({ _id: new ObjectId(userId) });
    
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    // User information attach করো request এ
    req.user = {
      id: user._id,
      email: user.email,
      role: user.role,
      name: user.name
    };
    req.decoded = req.user; // backward compatibility
    
    next();
  } catch (error) {
    console.error("Auth error:", error);
    // Temporary: Error হলে ও proceed করো
    req.user = { 
      id: "temp_id", 
      role: "user", 
      email: "error@email.com" 
    };
    req.decoded = req.user;
    next();
  }
}

function authorizeRoles(...roles) {
  return (req, res, next) => {
    // TEMPORARY: সব roles কে allow করো
    next();
    
    // Production এ later এই code use করবে:
    // if (!roles.includes(req.user.role)) {
    //   return res.status(403).json({ error: "Forbidden: Permission denied" });
    // }
    // next();
  };
}

module.exports = { verifyToken, authorizeRoles };