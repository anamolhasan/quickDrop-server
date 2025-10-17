// require("dotenv").config();
// const express = require("express");
// const app = express();
// const cors = require("cors");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
// // const stripe = require("stripe")(process.env.PAYMENT_GATEWAY_KEY);
// const port = process.env.PORT || 5000;

// // Middleware
// // app.use(cors({ origin: "http://localhost:3000", credentials: true }));
// app.use(express.json());

// app.use(cors({
//     origin: ["http://localhost:3000",
//       "https://quick-drop-black.vercel.app",
//       "https://quick-drop-*.vercel.app",
//       "https://quick-drop-bwek4q6t0-siamahmeddhks-projects.vercel.app, "
//       ],
//     methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
//     credentials: true,
//   })
// );

// // const uri = process.env.DB_URL

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version

// const uri = process.env.DB_URL;

// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// const { verifyToken, authorizeRoles } = require("./middleware/auth");

// async function run() {
//   try {
//     // await client.connect();

//     let clientPromise;

// async function connectDB() {
//   if (!clientPromise) {
//     clientPromise = client.connect();
//   }
//   await clientPromise;
// }
// await connectDB();
//     const db = client.db("QdropDB");
//     const userCollection = db.collection("users");
//     const feedbackCollection = db.collection("feedback");
//     const ridersCollection = db.collection("riders");
//     const paymentsCollection = db.collection('payments')
//     const parcelsCollection = db.collection('parcels')
//     const trackingsCollection = db.collection('trackings')

   

   

//     /** ------------------ USERS ------------------ **/

//     // Create user
//     // app.post("/users", async (req, res) => {
//     //   try {
//     //     const { name, email, password, photo } = req.body;
//     //     if (!name || !email)
//     //       return res.status(400).send({ error: "name and email are required" });

//     //     const existingUser = await userCollection.findOne({ email });
//     //     if (existingUser)
//     //       return res
//     //         .status(200)
//     //         .send({
//     //           success: true,
//     //           user: existingUser,
//     //           message: "User already exists",
//     //         });

//     //     let hashedPassword = password ? await bcrypt.hash(password, 10) : null;

//     //     const newUser = {
//     //       name,
//     //       email,
//     //       password: hashedPassword,
//     //       photo: photo || "https://i.ibb.co/2n8qPkw/default-avatar.png",
//     //       role: "user",
//     //       createdAt: new Date(),
//     //     };

//     //     const result = await userCollection.insertOne(newUser);
//     //     res
//     //       .status(201)
//     //       .send({
//     //         success: true,
//     //         userId: result.insertedId,
//     //         message: "User created successfully",
//     //       });
//     //   } catch (error) {
//     //     console.error(error);
//     //     res.status(500).send({ error: "Failed to create user" });
//     //   }
//     // });






//     app.post("/users", async (req, res) => {
//   try {
//     const { name, email, password, photo } = req.body;

//     if (!name || !email) {
//       return res.status(400).json({ error: "name and email are required" });
//     }

//     const existingUser = await userCollection.findOne({ email });
//     if (existingUser) {
//       return res.status(200).json({
//         success: true,
//         user: existingUser,
//         message: "User already exists",
//       });
//     }

//     // যদি password থাকে তাহলে hash করো, না থাকলে null
//     let hashedPassword = password ? await bcrypt.hash(password, 10) : null;

//     const newUser = {
//       name,
//       email,
//       password: hashedPassword,
//       photo: photo || "https://i.ibb.co/2n8qPkw/default-avatar.png",
//       role: "user", // ডিফল্ট role
//       createdAt: new Date(),
//     };

//     const result = await userCollection.insertOne(newUser);

//     // ✅ Insert করার পর ইউজার আবার খুঁজে বের করো যাতে পুরো data return হয়
//     const createdUser = await userCollection.findOne({ _id: result.insertedId });

//     res.status(201).json({
//       success: true,
//       user: createdUser, // ✅ এখন পুরো user অবজেক্ট রিটার্ন করো
//       message: "User created successfully",
//     });
//   } catch (error) {
//     console.error("Error creating user:", error);
//     res.status(500).json({ error: "Failed to create user" });
//   }
// });









//     // Login
//     app.post("/login", async (req, res) => {
//       try {
//         const { email, password } = req.body;
//         if (!email || !password)
//           return res.status(400).send({ error: "Email and password required" });

//         const user = await userCollection.findOne({ email });
//         if (!user)
//           return res.status(400).send({ error: "Invalid email or password" });

//         const isPasswordValid = await bcrypt.compare(password, user.password);
//         if (!isPasswordValid)
//           return res.status(401).send({ error: "Invalid email or password" });

//         // JWT token
//         const token = jwt.sign(
//           { id: user._id, email: user.email, role: user.role },
//           process.env.JWT_SECRET,
//           { expiresIn: "7d" }
//         );

//         res.send({
//           success: true,
//           message: "Login success",
//           token,
//           user: {
//             id: user._id,
//             name: user.name,
//             email: user.email,
//             role: user.role,
//           },
//         });
//       } catch (error) {
//         console.error(error);
//         res.status(500).send({ error: "Login failed" });
//       }
//     });

//     // POST /login/social




// app.post("/login/social", async (req, res) => {
//   try {
//     const { email } = req.body;
//     const user = await userCollection.findOne({ email });
//     if (!user) return res.status(404).send({ error: "User not found" });

//     const token = jwt.sign(
//       { id: user._id, email: user.email, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );
//     res.send({ token });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send({ error: "Server error" });
//   }
// });



//   // Update user profile (logged-in user)


// //   app.patch("/users/profile", verifyToken, async (req, res) => {
// //   const { name, email, phone, address } = req.body;
// //   const userEmail = req.user.email; // from your verifyToken middleware

// //   try {
// //     const updateFields = {};
// //     if (name) updateFields.name = name;
// //     if (email) updateFields.email = email;
// //     if (phone) updateFields.phone = phone;
// //     if (address) updateFields.address = address;

// //     const result = await userCollection.updateOne(
// //       { email: userEmail }, // use email instead of ObjectId
// //       { $set: updateFields }
// //     );

// //     if (result.modifiedCount === 0)
// //       return res.status(404).json({ success: false, message: "User not found or no changes made" });

// //     const updatedUser = await userCollection.findOne({ email: userEmail });

// //     res.json({ success: true, message: "Profile updated successfully", user: updatedUser });
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ success: false, message: "Failed to update profile" });
// //   }
// // });

















//     // Update user role (Admin only)
//     // app.patch("/users/:id/role", verifyToken, authorizeRoles("admin"), async (req, res) => {
//     //   const { id } = req.params;
//     //   const { role } = req.body;
//     //   if (!role) return res.status(400).send({ error: "Role is required" });

//     //   try {
//     //     const { email } = req.body;
//     //     const user = await userCollection.findOne({ email });
//     //     if (!user) return res.status(404).send({ error: "User not found" });

//     //     const token = jwt.sign(
//     //       { id: user._id, email: user.email, role: user.role },
//     //       process.env.JWT_SECRET,
//     //       { expiresIn: "7d" }
//     //     );
//     //     res.send({ token });
//     //   } catch (err) {
//     //     console.error(err);
//     //     res.status(500).send({ error: "Server error" });
//     //   }
//     // });

//     // Update user role (Admin only)
//     app.patch(
//       "/users/:id/role",
//       verifyToken,
//       authorizeRoles("admin"),
//       async (req, res) => {
//         const { id } = req.params;
//         const { role } = req.body;
//         if (!role) return res.status(400).send({ error: "Role is required" });

//         try {
//           const result = await userCollection.updateOne(
//             { _id: new ObjectId(id) },
//             { $set: { role } }
//           );
//           if (result.modifiedCount === 0)
//             return res
//               .status(404)
//               .send({ error: "User not found or role unchanged" });
//           res.send({
//             success: true,
//             message: "User role updated successfully",
//           });
//         } catch (error) {
//           console.error(error);
//           res.status(500).send({ error: "Failed to update role" });
//         }
//       }
//     );

//     // Get all users (Admin only)
//     app.get(
//       "/users",
//       verifyToken,
//       authorizeRoles("admin"),
//       async (req, res) => {
//         const users = await userCollection.find({}).toArray();
//         res.send(users);
//       }
//     );

//     // GET single user by email
//     app.get("/users/:email", async (req, res) => {
//       try {
//         const { email } = req.params;
//         const user = await userCollection.findOne({ email });

//         if (!user) {
//           return res.status(404).json({ error: "User not found" });
//         }

//         res.json({
//           success: true,
//           user: {
//             id: user._id,
//             name: user.name,
//             email: user.email,
//             role: user.role,
//             photo: user.photo,
//           },
//         });
//       } catch (error) {
//         console.error("Error fetching user:", error);
//         res.status(500).json({ error: "Server error" });
//       }
//     });




// // DELETE user (Admin only)
// app.delete("/users/:id", verifyToken, authorizeRoles("admin"), async (req, res) => {
//   try {
//     const { id } = req.params;

//     if (!ObjectId.isValid(id)) {
//       return res.status(400).json({ success: false, error: "Invalid user ID" });
//     }

//     const result = await userCollection.deleteOne({ _id: new ObjectId(id) });

//     if (result.deletedCount === 0) {
//       return res.status(404).json({ success: false, error: "User not found" });
//     }

//     res.json({ success: true, message: "User deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting user:", error);
//     res.status(500).json({ success: false, error: "Failed to delete user" });
//   }
// });







//     /** ------------------ FEEDBACK ------------------ **/

//     // GET all feedback
//     app.get("/feedback", async (req, res) => {
//       try {
//         const result = await feedbackCollection.find().toArray();
//         res.send(result);
//       } catch (err) {
//         console.error("Error fetching feedback:", err);
//         res.status(500).send({ error: "Failed to fetch feedback" });
//       }
//     });

//     // POST new feedback
//     app.post("/feedback", async (req, res) => {
//       try {
//         const newFeedback = req.body;
//         const result = await feedbackCollection.insertOne(newFeedback);
//         res.send({ success: true, insertedId: result.insertedId });
//       } catch (err) {
//         console.error("Error inserting feedback:", err);
//         res.status(500).send({ error: "Failed to add feedback" });
//       }
//     });

//     // DELETE feedback
//     app.delete("/feedback/:id", async (req, res) => {
//       try {
//         const { id } = req.params;
//         if (!ObjectId.isValid(id))
//           return res.status(400).send({ error: "Invalid feedback ID" });

//         const result = await feedbackCollection.deleteOne({
//           _id: new ObjectId(id),
//         });

//         if (result.deletedCount === 0)
//           return res.status(404).send({ error: "Feedback not found" });

//         res.send({ success: true, message: "Feedback deleted" });
//       } catch (err) {
//         console.error("Error deleting feedback:", err);
//         res.status(500).send({ error: "Failed to delete feedback" });
//       }
//     });

//     /** ------------------ RIDERS ------------------ **/

//     // Rider application (Anyone can apply)
//     app.post(
//       "/riders",
//       verifyToken,
//       authorizeRoles("user"),
//       async (req, res) => {
//         const newRider = {
//           ...req.body,
//           status: "pending",
//           createdAt: new Date(),
//         };
//         const result = await ridersCollection.insertOne(newRider);
//         res
//           .status(201)
//           .json({
//             success: true,
//             riderId: result.insertedId,
//             message: "Rider application submitted successfully",
//           });
//       }
//     );



//     // Get all riders (Admin only)
//     app.get(
//       "/riders",
//       verifyToken,
//       authorizeRoles("admin"),
//       async (req, res) => {
//         const riders = await ridersCollection.find().toArray();
//         res.json(riders);
//       }
//     );




//     // Get active riders (Any logged-in user)
//     app.get("/riders/active", verifyToken, async (req, res) => {
//       const activeRiders = await ridersCollection
//         .find({ status: "accepted" })
//         .toArray();
//       res.json(activeRiders);
//     });




//     // Update rider status (Admin only)
//     app.put(
//       "/riders/:id",
//       verifyToken,
//       authorizeRoles("admin"),
//       async (req, res) => {
//         const { id } = req.params;
//         const { status } = req.body;
//         const result = await ridersCollection.updateOne(
//           { _id: new ObjectId(id) },
//           { $set: { status, updatedAt: new Date() } }
//         );
//         if (result.modifiedCount === 0)
//           return res
//             .status(404)
//             .json({ success: false, message: "Rider not found" });
//         res.json({
//           success: true,
//           message: "Rider status updated successfully",
//         });
//       }
//     );



//     // Delete rider (Admin only)

//     app.delete("/riders/:id", verifyToken, authorizeRoles("admin"), async (req, res) => {
//       const { id } = req.params;
//       const result = await ridersCollection.deleteOne({ _id: new ObjectId(id) });
//       if (result.deletedCount === 0) return res.status(404).json({ success: false, message: "Rider not found" });
//       res.json({ success: true, message: "Rider deleted successfully" });
//     });



//     // Get single rider (Any logged-in user)
  
//     app.get("/riders/:id", verifyToken, async (req, res) => {
//       const { id } = req.params;
//       const rider = await ridersCollection.findOne({ _id: new ObjectId(id) });
//       if (!rider)
//         return res
//           .status(404)
//           .json({ success: false, message: "Rider not found" });
//       res.json(rider);
//     });



//     // --------- PAYMENT------------------------
//     // payments api
//     app.get("/payments",verifyToken, async (req, res) => {
//       try {
//         const userEmail = req.query.email;

//         if(req.decoded.email !== userEmail){
//            return res.status(403).send({message: 'forbidden access'})
//         }

//         const query = userEmail ? { email: userEmail } : {};
//         const options = { sort: { paid_at: -1 } }; // Latest first

//         const payments = await paymentsCollection
//           .find(query, options)
//           .toArray();
//         res.send(payments);
//       } catch (error) {
//         console.error("Error fetching payment history:", error);
//         res.status(500).send({ message: "Failed to get payments" });
//       }
//     });

   

//     // POST: Record payment and update parcel status
//     app.post("/payments", async (req, res) => {
//       try {
//         const { parcelId, email, amount, paymentMethod, transactionId } =
//           req.body;

//         // 1. Update parcel's payment_status
//         const updateResult = await parcelsCollection.updateOne(
//           { _id: new ObjectId(parcelId) },
//           {
//             $set: {
//               payment_status: "paid",
//             },
//           }
//         );

//         if (updateResult.modifiedCount === 0) {
//           return res
//             .status(404)
//             .send({ message: "Parcel not found or already paid" });
//         }

//         // 2. Insert payment record
//         const paymentDoc = {
//           parcelId,
//           email,
//           amount,
//           paymentMethod,
//           transactionId,
//           paid_at_string: new Date().toISOString(),
//           paid_at: new Date(),
//         };

//         const paymentResult = await paymentsCollection.insertOne(paymentDoc);

//         res.status(201).send({
//           message: "Payment recorded and parcel marked as paid",
//           insertedId: paymentResult.insertedId,
//         });
//       } catch (error) {
//         console.error("Payment processing failed:", error);
//         res.status(500).send({ message: "Failed to record payment" });
//       }
//     });

//     // create payment intent api
//     app.post("/create-payment-intent", async (req, res) => {
//       const amountInCents = req.body.amountInCents;
//       try {
//         const paymentIntent = await stripe.paymentIntents.create({
//           amount: amountInCents, // Amount in cents
//           currency: "usd",
//           payment_method_types: ["card"],
//         });

//         res.json({ clientSecret: paymentIntent.client_secret });
//       } catch (error) {
//         res.status(500).json({ error: error.message });
//       }
//     });


//     // -------- Parcel -----------
//   //  POST : create a new parcel
//     app.post("/parcels", async (req, res) => {
//       try {
//         const newParcel = req.body;
//         const result = await parcelsCollection.insertOne(newParcel);
//         res.status(201).send(result);
//       } catch (error) {
//         console.error(error);
//         res.status(500).send({ message: "Failed to create parcel" });
//       }
//     });


//       // GET: All parcels OR parcels by user (created_by), sorted by latest
//     app.get("/parcels", async (req, res) => {
//       try {
//         const {email, payment_status, delivery_status} = req.query

//         let query = {}

//         if(email){
//           query = {created_by: email}
//         }

//         if(payment_status){
//           query.payment_status = payment_status
//         }

//         if(delivery_status){
//           query.delivery_status = delivery_status
//         }

//         const options = {
//           sort: { createdAt: -1 }, // Newest first
//         };

//         const parcels = await parcelsCollection.find(query, options).toArray();
//         res.send(parcels)

//       } catch (error) {
//         console.error("Error fetching parcels:", error);
//         res.status(500).send({ message: "Failed to get parcels" });
//       }
//     });

//     // GET: Get a specific parcel by ID
//     app.get("/parcels/:id", async (req, res) => {
//       try {
//         const id = req.params.id;

//         const parcel = await parcelsCollection.findOne({
//           _id: new ObjectId(id),
//         });

//         if (!parcel) {
//           return res.status(404).send({ message: "Parcel not found" });
//         }

//         res.send(parcel);
//       } catch (error) {
//         console.error("Error fetching parcel:", error);
//         res.status(500).send({ message: "Failed to fetch parcel" });
//       }
//     });




//     // ======== tracking -----------
//     app.post("/trackings", async (req, res) => {
//   try {
//     const update = req.body;

//     if (!update || typeof update !== "object") {
//       return res.status(400).json({ message: "Invalid payload" });
//     }

//     if (!update.tracking_id || !update.status) {
//       return res.status(400).json({ message: "tracking_id and status are required." });
//     }

//     update.timestamp = new Date();

//     const result = await trackingsCollection.insertOne(update);
//     res.status(201).json(result);
//   } catch (error) {
//     console.error("Failed to insert tracking:", error);
//     res.status(500).json({ message: "Internal server error", error: error.message });
//   }
// });




//     console.log("Backend connected to MongoDB successfully!");
//   } finally {
//     // do not close client, server will keep running
//   }
// }

// run().catch(console.dir);

// app.get("/", (req, res) => {
//   res.send("Assalamu alaikum QuickDrop server is running!");
// });

// // Only start server if not in Vercel environment
// if (require.main === module) {
//   app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
//   });
// }

// module.exports = app;


require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken"); // JWT REMOVED
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());

app.use(cors({
    origin: [
        "http://localhost:3000",
        "https://quick-drop-black.vercel.app", 
        "https://quick-drop-*.vercel.app",
        "https://quick-drop-bwek4q6t0-siamahmeddhks-projects.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
}));

const uri = process.env.DB_URL;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// NEW SIMPLE MIDDLEWARE (NO JWT)
const { verifyToken, authorizeRoles } = require("./middleware/auth");

async function run() {
  try {
    let clientPromise;

    async function connectDB() {
      if (!clientPromise) {
        clientPromise = client.connect();
      }
      await clientPromise;
    }
    await connectDB();
    
    const db = client.db("QdropDB");
    const userCollection = db.collection("users");
    const feedbackCollection = db.collection("feedback");
    const ridersCollection = db.collection("riders");
    const paymentsCollection = db.collection('payments');
    const parcelsCollection = db.collection('parcels');
    const trackingsCollection = db.collection('trackings');

    /** =================== PUBLIC ROUTES =================== **/

    // ✅ TEST ROUTE - Public
    app.get("/", (req, res) => {
      res.json({ 
        message: "Assalamu alaikum QuickDrop server is running!",
        status: "Active",
        version: "No-JWT"
      });
    });

    // ✅ CREATE USER - Public  
    app.post("/users", async (req, res) => {
      try {
        const { name, email, password, photo } = req.body;

        if (!name || !email) {
          return res.status(400).json({ error: "Name and email are required" });
        }

        const existingUser = await userCollection.findOne({ email });
        if (existingUser) {
          return res.status(200).json({
            success: true,
            user: existingUser,
            message: "User already exists",
          });
        }

        let hashedPassword = password ? await bcrypt.hash(password, 10) : null;

        const newUser = {
          name,
          email,
          password: hashedPassword,
          photo: photo || "https://i.ibb.co/2n8qPkw/default-avatar.png",
          role: "user",
          phone: "",
          address: "",
          createdAt: new Date(),
        };

        const result = await userCollection.insertOne(newUser);
        const createdUser = await userCollection.findOne({ _id: result.insertedId });

        res.status(201).json({
          success: true,
          user: createdUser,
          message: "User created successfully",
        });
      } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Failed to create user" });
      }
    });

    // ✅ LOGIN - Public (NO JWT)
    app.post("/login", async (req, res) => {
      try {
        const { email, password } = req.body;
        if (!email || !password) {
          return res.status(400).json({ error: "Email and password required" });
        }

        const user = await userCollection.findOne({ email });
        if (!user) {
          return res.status(400).json({ error: "Invalid email or password" });
        }

        // Check if user has password
        if (!user.password) {
          return res.status(400).json({ error: "Please use social login for this account" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return res.status(401).json({ error: "Invalid email or password" });
        }

        // ✅ NO JWT TOKEN - Just return user info
        res.json({
          success: true,
          message: "Login success",
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            photo: user.photo,
            phone: user.phone,
            address: user.address
          },
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Login failed" });
      }
    });

    // ✅ SOCIAL LOGIN - Public (NO JWT)
    // app.post("/login/social", async (req, res) => {
    //   try {
    //     const { email, name, photo } = req.body;
        
    //     if (!email) {
    //       return res.status(400).json({ error: "Email is required" });
    //     }

    //     let user = await userCollection.findOne({ email });
        
    //     if (!user) {
    //       // Create new user
    //       const newUser = {
    //         name: name || "User",
    //         email,
    //         password: null,
    //         photo: photo || "https://i.ibb.co/2n8qPkw/default-avatar.png",
    //         role: "user",
    //         phone: "",
    //         address: "",
    //         createdAt: new Date(),
    //       };
          
    //       const result = await userCollection.insertOne(newUser);
    //       user = await userCollection.findOne({ _id: result.insertedId });
    //     }

    //     // ✅ NO JWT TOKEN - Just return user info
    //     res.json({ 
    //       success: true,
    //       user: {
    //         id: user._id,
    //         name: user.name,
    //         email: user.email,
    //         role: user.role,
    //         photo: user.photo,
    //         phone: user.phone,
    //         address: user.address
    //       }
    //     });
    //   } catch (err) {
    //     console.error(err);
    //     res.status(500).json({ error: "Server error" });
    //   }
    // });


// ✅ SOCIAL LOGIN - Public (NO JWT)
// app.post("/login/social", async (req, res) => {
//   try {
//     const { email, name, photo } = req.body;
    
//     if (!email) {
//       return res.status(400).json({ error: "Email is required" });
//     }

//     let user = await userCollection.findOne({ email });
    
//     if (!user) {
//       // Create new user
//       const newUser = {
//         name: name || "User",
//         email,
//         password: null,
//         photo: photo || "https://i.ibb.co/2n8qPkw/default-avatar.png",
//         role: "user",
//         phone: "",
//         address: "",
//         createdAt: new Date(),
//       };
      
//       const result = await userCollection.insertOne(newUser);
//       user = await userCollection.findOne({ _id: result.insertedId });
//     }

//     // ✅ JSON response with redirect URL
//     res.json({ 
//       success: true,
//       redirectTo: process.env.NODE_ENV === 'production' 
//         ? 'https://quick-drop-black.vercel.app'
//         : 'http://localhost:3000',
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//         photo: user.photo
//       }
//     });
    
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ 
//       success: false,
//       error: "Social login failed",
//       redirectTo: `${process.env.NODE_ENV === 'production' 
//         ? 'https://quick-drop-black.vercel.app'
//         : 'http://localhost:3000'}/login?error=social_login_failed`
//     });
//   }
// });
    

app.post("/login/social", async (req, res) => {
  try {
    const { email, name, photo } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    let user = await userCollection.findOne({ email });
    
    if (!user) {
      // ✅ NEW USER - always create as "user" role
      const newUser = {
        name: name || "User",
        email,
        password: null,
        photo: photo || "https://i.ibb.co/2n8qPkw/default-avatar.png",
        role: "user", // New users always get "user" role
        phone: "",
        address: "",
        createdAt: new Date(),
      };
      
      const result = await userCollection.insertOne(newUser);
      user = await userCollection.findOne({ _id: result.insertedId });
    } else {
      // ✅ EXISTING USER - preserve their original role (admin/user)
      // No need to update role, keep whatever they had before
      // Optional: Update name/photo if needed
      await userCollection.updateOne(
        { email: email },
        { 
          $set: { 
            name: name || user.name,
            photo: photo || user.photo
          } 
        }
      );
      user = await userCollection.findOne({ email }); // Refresh user data
    }

    // ✅ JSON response with redirect URL
    res.json({ 
      success: true,
      redirectTo: process.env.NODE_ENV === 'production' 
        ? 'https://quick-drop-black.vercel.app'
        : 'http://localhost:3000',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role, // ✅ Now it will preserve existing role (admin/user)
        photo: user.photo
      }
    });
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ 
      success: false,
      error: "Social login failed",
      redirectTo: `${process.env.NODE_ENV === 'production' 
        ? 'https://quick-drop-black.vercel.app'
        : 'http://localhost:3000'}/login?error=social_login_failed`
    });
  }
});






    // ✅ GET USER BY EMAIL - Public
    app.get("/users/:email", async (req, res) => {
      try {
        const { email } = req.params;
        const user = await userCollection.findOne({ email });

        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }

        res.json({
          success: true,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            photo: user.photo,
            phone: user.phone,
            address: user.address
          },
        });
      } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: "Server error" });
      }
    });

    // ✅ FEEDBACK - Public
    app.get("/feedback", async (req, res) => {
      try {
        const result = await feedbackCollection.find().toArray();
        res.json(result);
      } catch (err) {
        console.error("Error fetching feedback:", err);
        res.status(500).json({ error: "Failed to fetch feedback" });
      }
    });

    app.post("/feedback", async (req, res) => {
      try {
        const newFeedback = req.body;
        const result = await feedbackCollection.insertOne(newFeedback);
        res.json({ success: true, insertedId: result.insertedId });
      } catch (err) {
        console.error("Error inserting feedback:", err);
        res.status(500).json({ error: "Failed to add feedback" });
      }
    });

    // ✅ PARCELS - Public
    app.post("/parcels", async (req, res) => {
      try {
        const newParcel = {
          ...req.body,
          createdAt: new Date(),
          payment_status: "pending",
          delivery_status: "pending"
        };
        const result = await parcelsCollection.insertOne(newParcel);
        res.status(201).json(result);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create parcel" });
      }
    });

    app.get("/parcels", async (req, res) => {
      try {
        const { email, payment_status, delivery_status } = req.query;
        let query = {};

        if (email) {
          query.created_by = email;
        }
        if (payment_status) {
          query.payment_status = payment_status;
        }
        if (delivery_status) {
          query.delivery_status = delivery_status;
        }

        const options = { sort: { createdAt: -1 } };
        const parcels = await parcelsCollection.find(query, options).toArray();
        res.json(parcels);
      } catch (error) {
        console.error("Error fetching parcels:", error);
        res.status(500).json({ message: "Failed to get parcels" });
      }
    });

    app.get("/parcels/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const parcel = await parcelsCollection.findOne({ _id: new ObjectId(id) });

        if (!parcel) {
          return res.status(404).json({ message: "Parcel not found" });
        }

        res.json(parcel);
      } catch (error) {
        console.error("Error fetching parcel:", error);
        res.status(500).json({ message: "Failed to fetch parcel" });
      }
    });

    // ✅ PAYMENTS - Public (for payment creation)
    app.post("/payments", async (req, res) => {
      try {
        const { parcelId, email, amount, paymentMethod, transactionId } = req.body;

        const updateResult = await parcelsCollection.updateOne(
          { _id: new ObjectId(parcelId) },
          { $set: { payment_status: "paid" } }
        );

        if (updateResult.modifiedCount === 0) {
          return res.status(404).json({ message: "Parcel not found or already paid" });
        }

        const paymentDoc = {
          parcelId,
          email,
          amount,
          paymentMethod,
          transactionId,
          paid_at_string: new Date().toISOString(),
          paid_at: new Date(),
        };

        const paymentResult = await paymentsCollection.insertOne(paymentDoc);
        res.status(201).json({
          message: "Payment recorded and parcel marked as paid",
          insertedId: paymentResult.insertedId,
        });
      } catch (error) {
        console.error("Payment processing failed:", error);
        res.status(500).json({ message: "Failed to record payment" });
      }
    });

    // ✅ TRACKING - Public
    app.post("/trackings", async (req, res) => {
      try {
        const update = req.body;
        if (!update || typeof update !== "object") {
          return res.status(400).json({ message: "Invalid payload" });
        }
        if (!update.tracking_id || !update.status) {
          return res.status(400).json({ message: "tracking_id and status are required." });
        }

        update.timestamp = new Date();
        const result = await trackingsCollection.insertOne(update);
        res.status(201).json(result);
      } catch (error) {
        console.error("Failed to insert tracking:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
      }
    });

    /** =================== PROTECTED ROUTES =================== **/

    // ✅ UPDATE USER PROFILE - Protected
    app.patch("/users/profile", verifyToken, async (req, res) => {
      try {
        const { name, email, phone, address } = req.body;
        const userId = req.user.id;

        const updateFields = {};
        if (name) updateFields.name = name;
        if (email) updateFields.email = email;
        if (phone) updateFields.phone = phone;
        if (address) updateFields.address = address;

        const result = await userCollection.updateOne(
          { _id: new ObjectId(userId) },
          { $set: updateFields }
        );

        if (result.modifiedCount === 0) {
          return res.status(404).json({ 
            success: false, 
            message: "User not found or no changes made" 
          });
        }

        const updatedUser = await userCollection.findOne({ _id: new ObjectId(userId) });
        res.json({ 
          success: true, 
          message: "Profile updated successfully", 
          user: updatedUser 
        });
      } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Failed to update profile" });
      }
    });

    // ✅ GET PAYMENTS - Protected
    app.get("/payments", verifyToken, async (req, res) => {
      try {
        const userEmail = req.query.email;
        // ✅ FIXED: req.decoded → req.user
        if (req.user.email !== userEmail) {
          return res.status(403).json({ message: 'Forbidden access' });
        }

        const query = userEmail ? { email: userEmail } : {};
        const options = { sort: { paid_at: -1 } };
        const payments = await paymentsCollection.find(query, options).toArray();
        res.json(payments);
      } catch (error) {
        console.error("Error fetching payment history:", error);
        res.status(500).json({ message: "Failed to get payments" });
      }
    });

    // ✅ RIDERS - Protected
    app.post("/riders",  async (req, res) => {
      try {
        const newRider = {
          ...req.body,
          status: "pending",
          createdAt: new Date(),
        };
        const result = await ridersCollection.insertOne(newRider);
        res.status(201).json({
          success: true,
          riderId: result.insertedId,
          message: "Rider application submitted successfully",
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to submit rider application" });
      }
    });

    app.get("/riders/active",  async (req, res) => {
      try {
        const activeRiders = await ridersCollection.find({ status: "accepted" }).toArray();
        res.json(activeRiders);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch active riders" });
      }
    });

    app.get("/riders/:id",  async (req, res) => {
      try {
        const { id } = req.params;
        const rider = await ridersCollection.findOne({ _id: new ObjectId(id) });
        if (!rider)
          return res.status(404).json({ success: false, message: "Rider not found" });
        res.json(rider);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch rider" });
      }
    });

    /** =================== ADMIN ROUTES =================== **/

    // ✅ GET ALL USERS - Admin only
    app.get("/admin/users",  authorizeRoles("admin"), async (req, res) => {
      try {
        const users = await userCollection.find({}).toArray();
        res.json(users);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch users" });
      }
    });

    // ✅ UPDATE USER ROLE - Admin only
    app.patch("/admin/users/:id/role",  authorizeRoles("admin"), async (req, res) => {
      const { id } = req.params;
      const { role } = req.body;
      if (!role) return res.status(400).json({ error: "Role is required" });

      try {
        const result = await userCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: { role } }
        );
        if (result.modifiedCount === 0)
          return res.status(404).json({ error: "User not found or role unchanged" });
        res.json({
          success: true,
          message: "User role updated successfully",
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update role" });
      }
    });

    // ✅ DELETE USER - Admin only
    app.delete("/admin/users/:id",  authorizeRoles("admin"), async (req, res) => {
      try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
          return res.status(400).json({ success: false, error: "Invalid user ID" });
        }

        const result = await userCollection.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
          return res.status(404).json({ success: false, error: "User not found" });
        }

        res.json({ success: true, message: "User deleted successfully" });
      } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ success: false, error: "Failed to delete user" });
      }
    });

    // ✅ RIDER MANAGEMENT - Admin only
    app.get("/admin/riders",  authorizeRoles("admin"), async (req, res) => {
      try {
        const riders = await ridersCollection.find().toArray();
        res.json(riders);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch riders" });
      }
    });

    app.put("/admin/riders/:id",  authorizeRoles("admin"), async (req, res) => {
      try {
        const { id } = req.params;
        const { status } = req.body;
        const result = await ridersCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: { status, updatedAt: new Date() } }
        );
        if (result.modifiedCount === 0)
          return res.status(404).json({ success: false, message: "Rider not found" });
        res.json({
          success: true,
          message: "Rider status updated successfully",
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update rider status" });
      }
    });

    app.delete("/admin/riders/:id",  authorizeRoles("admin"), async (req, res) => {
      try {
        const { id } = req.params;
        const result = await ridersCollection.deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 0) return res.status(404).json({ success: false, message: "Rider not found" });
        res.json({ success: true, message: "Rider deleted successfully" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to delete rider" });
      }
    });

    // ✅ DELETE FEEDBACK - Admin only
    app.delete("/feedback/:id", async (req, res) => {
      try {
        const { id } = req.params;
        if (!ObjectId.isValid(id))
          return res.status(400).json({ error: "Invalid feedback ID" });

        const result = await feedbackCollection.deleteOne({
          _id: new ObjectId(id),
        });

        if (result.deletedCount === 0)
          return res.status(404).json({ error: "Feedback not found" });

        res.json({ success: true, message: "Feedback deleted" });
      } catch (err) {
        console.error("Error deleting feedback:", err);
        res.status(500).json({ error: "Failed to delete feedback" });
      }
    });

    console.log("✅ Backend connected to MongoDB successfully!");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
  }
}

run().catch(console.dir);

// Only start server if not in Vercel environment
if (require.main === module) {
  app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
  });
}

module.exports = app;