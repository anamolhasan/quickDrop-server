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
// import Stripe from "stripe";
// const stripe = new Stripe(process.env.PAYMENT_GATEWAY_KEY);
const stripe = require("stripe")(process.env.PAYMENT_GATEWAY_KEY);
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
const { default: Stripe } = require("stripe");

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
    const chatbotCollection = db.collection('chatbot_conversations');
    const notificationsCollection = db.collection('notifications');
    const offersCollection = db.collection('offers');

    /** =================== PUBLIC ROUTES =================== **/

    // ✅ TEST ROUTE - Public
    app.get("/", (req, res) => {
      res.json({ 
        message: "Assalamu alaikum QuickDrop server is running!",
        status: "Active",
        version: "No-JWT"
      });
    });


  



    // ✅ ADVANCED CHATBOT LOGIC
app.post("/api/chatbot/message", async (req, res) => {
  try {
    const { message, userId, userEmail, conversationContext = {} } = req.body;
    
    if (!message) {
      return res.status(400).json({ 
        success: false, 
        error: "Message is required" 
      });
    }

    const userMessage = message.toLowerCase().trim();
    let reply = '';
    let context = conversationContext;
    let actions = []; // Frontend-এ actions (buttons, links, etc.)

    // 🔥 SMART ROUTE SUGGESTION
    if (userMessage.includes('send') || userMessage.includes('parcel') || userMessage.includes('পার্সেল') || userMessage.includes('পাঠান')) {
      reply = '🚚 **পার্সেল সেন্ড করতে চান?**\n\nআপনি সরাসরি আমাদের পার্সেল বুকিং পেজে যেতে পারেন:\n\n📦 **Quick & Easy Booking**\n\nঅথবা এখানেই তথ্য দিয়ে শুরু করতে পারেন!';
      
      actions = [
        { type: 'link', text: '📦 পার্সেল বুক করুন', url: '/send-parcel' },
        { type: 'button', text: '💡 দরদাম জানুন', action: 'pricing' },
        { type: 'button', text: '🚗 পিকআপ সার্ভিস', action: 'pickup' }
      ];
    }

    // 🔥 PRICING TABLE
    else if (userMessage.includes('price') || userMessage.includes('cost') || userMessage.includes('দর') || userMessage.includes('কত') || context.showPricing) {
      reply = `💰 **QuickDrop Pricing Table**\n
📊 **পার্সেল টাইপ অনুযায়ী দর:**\n
┌──────────────┬──────────┬──────────────┬─────────────────────┐
│ 📦 Type      │ ⚖️ Weight │ 🏙️ Within City │ 🗺️ Outside City     │
├──────────────┼──────────┼──────────────┼─────────────────────┤
│ 📄 Document  │ Any      │ ৳60         │ ৳80                │
│ 📦 Non-Doc   │ Up to 3kg│ ৳110        │ ৳150               │
│ 📦 Non-Doc   │ >3kg     │ +৳40/kg     │ +৳40/kg +৳40 extra │
└──────────────┴──────────┴──────────────┴─────────────────────┘\n
💡 **দ্রুত দর জানতে:**\n• পার্সেল টাইপ\n• ওজন\n• পিকআপ/ডেলিভারি লোকেশন\n\nবলুন!`;

      actions = [
        { type: 'button', text: '📦 পার্সেল বুক করুন', url: '/send-parcel' },
        { type: 'button', text: '🧮 দর ক্যালকুলেট করুন', action: 'calculate_price' },
        { type: 'button', text: '📞 কন্টাক্ট', action: 'contact' }
      ];
      
      context.showPricing = true;
    }

    // 🔥 DATABASE INTERACTION - Real Parcel Tracking
    else if (userMessage.includes('track') || userMessage.includes('ট্র্যাক') || context.awaitingTracking) {
      // Tracking number extract করার logic
      const trackingMatch = userMessage.match(/(QD-)?(\d{6,9})/i);
      
      if (trackingMatch) {
        const trackingNumber = trackingMatch[0].toUpperCase();
        
        // ✅ DATABASE QUERY - Real tracking info
        try {
          const parcel = await parcelsCollection.findOne({ 
            tracking_id: trackingNumber 
          });
          
          if (parcel) {
            reply = `📦 **পার্সেল ট্র্যাকিং: ${trackingNumber}**\n\n` +
                   `👤 **প্রেরক:** ${parcel.sender_name}\n` +
                   `📍 **থেকে:** ${parcel.pickup_location}\n` +
                   `🎯 **প্রতি:** ${parcel.delivery_location}\n` +
                   `📊 **স্ট্যাটাস:** ${parcel.delivery_status || 'Processing'}\n` +
                   `💰 **পেমেন্ট:** ${parcel.payment_status || 'Pending'}\n\n` +
                   `🕒 **আপডেট:** ${new Date(parcel.createdAt).toLocaleDateString('bn-BD')}`;
            
            actions = [
              { type: 'button', text: '🔄 লাইভ ট্র্যাকিং', url: `/tracking/${trackingNumber}` },
              { type: 'button', text: '📞 সাপোর্ট', action: 'contact' }
            ];
          } else {
            reply = `❌ **ট্র্যাকিং নম্বর পাওয়া যায়নি: ${trackingNumber}**\n\n` +
                   'দয়া করে সঠিক ট্র্যাকিং নম্বর দিন (যেমন: QD-123456)';
            context.awaitingTracking = true;
          }
        } catch (dbError) {
          reply = '⚠️ **ডেটাবেসে সমস্যা!**\n\nদয়া করে পরে আবার চেষ্টা করুন।';
        }
      } else {
        reply = '📦 **পার্সেল ট্র্যাকিং**\n\nআপনার ট্র্যাকিং নম্বর দিন:\n(যেমন: **QD-123456** বা **123456**)\n\nআমি বর্তমান স্ট্যাটাস দেখাবো 🔍';
        context.awaitingTracking = true;
      }
    }

    // 🔥 CALCULATE PRICE
    else if (userMessage.includes('calculate') || userMessage.includes('ক্যালকুলেট') || context.calculatingPrice) {
      reply = '🧮 **দর ক্যালকুলেটর**\n\nদর জানতে নিচের তথ্যগুলো দিন:\n\n1️⃣ **পার্সেল টাইপ?** (Document/Non-Document)\n2️⃣ **ওজন কত কেজি?**\n3️⃣ **লোকেশন?** (Within City/Outside City)\n\nপার্সেল টাইপ বলুন:';
      
      actions = [
        { type: 'button', text: '📄 Document', action: 'set_type_document' },
        { type: 'button', text: '📦 Non-Document', action: 'set_type_nondoc' }
      ];
      
      context.calculatingPrice = true;
      context.step = 'type';
    }

    // 🔥 PICKUP SERVICE
    else if (userMessage.includes('pickup') || userMessage.includes('পিকআপ') || context.schedulingPickup) {
      reply = '🚗 **পিকআপ সার্ভিস**\n\nপিকআপ বুক করতে:\n\n📍 **আপনার সম্পূর্ণ ঠিকানা**\n📅 **পছন্দের তারিখ**\n⏰ **সময়**\n📦 **পার্সেল ডিটেইলস**\n\nআপনার ঠিকানা লিখুন:';
      
      actions = [
        { type: 'link', text: '📅 অনলাইন বুকিং', url: '/pickup' },
        { type: 'button', text: '📞 কল করে বুক করুন', action: 'call_pickup' }
      ];
      
      context.schedulingPickup = true;
    }

    // 🔥 CONTACT INFORMATION
    else if (userMessage.includes('contact') || userMessage.includes('কল') || userMessage.includes('ফোন')) {
      reply = `📞 **QuickDrop কন্টাক্ট**\n\n**হেল্পলাইন:** 09678-123456\n**ইমেইল:** support@quickdrop.com\n**ওয়েবসাইট:** www.quickdrop.com\n**ঠিকানা:** ঢাকা, বাংলাদেশ\n\n🕒 **24/7 সাপোর্ট Available**`;
      
      actions = [
        { type: 'button', text: '📞 কল করুন', action: 'call_now' },
        { type: 'link', text: '📧 ইমেইল করুন', url: 'mailto:support@quickdrop.com' },
        { type: 'link', text: '🌐 ওয়েবসাইট', url: 'https://quickdrop.com' }
      ];
    }

    // 🔥 DEFAULT HELP
    else {
      reply = `🤖 **QuickDrop Assistant**\n\nআমি কিভাবে সাহায্য করতে পারি?\n\n📦 **পার্সেল ট্র্যাকিং** - ট্র্যাকিং নম্বর দিয়ে\n💰 **দরদাম** - Pricing table দেখি\n🚚 **পার্সেল সেন্ড** - বুকিং শুরু করুন\n🚗 **পিকআপ** - বাসা থেকে সংগ্রহ\n📞 **সাপোর্ট** - কন্টাক্ট ইনফো`;
      
      actions = [
        { type: 'button', text: '📦 Track Parcel', action: 'track' },
        { type: 'button', text: '💰 Pricing', action: 'pricing' },
        { type: 'button', text: '🚚 Send Parcel', action: 'send_parcel' },
        { type: 'button', text: '📞 Contact', action: 'contact' }
      ];
    }

    // MongoDB-তে conversation সেভ
    try {
      await chatbotCollection.insertOne({
        userId: userId || 'anonymous',
        userEmail: userEmail || '',
        userMessage: message,
        botReply: reply,
        context: context,
        actions: actions,
        timestamp: new Date(),
        ip: req.ip
      });
    } catch (dbError) {
      console.log('Chatbot conversation save failed:', dbError);
    }

    res.json({ 
      success: true, 
      reply,
      context: context,
      actions: actions, // Frontend-এ buttons/links
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Chatbot error:', error);
    res.status(500).json({ 
      success: false, 
      reply: '⚠️ **সিস্টেমে সাময়িক সমস্যা!**\n\nদয়া করে কিছুক্ষণ পর আবার চেষ্টা করুন।',
      context: {},
      actions: []
    });
  }
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




    // ========✅ PARCELS - Public =============== //
       //  POST : create a new parcel
    app.post("/parcels", async (req, res) => {
      try {
        const newParcel = {
          ...req.body,
          createdAt: new Date(),
          payment_status: "unpaid",
          delivery_status: "pending"
        };
        const result = await parcelsCollection.insertOne(newParcel);
        res.status(201).json(result);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create parcel" });
      }
     });

    app.patch("/parcels/:id/assign", async (req, res) => {
            const parcelId = req.params.id;
            const { riderId, riderName, riderEmail } = req.body;

            try {
                // Update parcel
                await parcelsCollection.updateOne(
                    { _id: new ObjectId(parcelId) },
                    {
                        $set: {
                            delivery_status: "rider_assigned",
                            assigned_rider_id: riderId,
                            assigned_rider_email: riderEmail,
                            assigned_rider_name: riderName,
                        },
                    }
                );

                // Update rider
                await ridersCollection.updateOne(
                    { _id: new ObjectId(riderId) },
                    {
                        $set: {
                            work_status: "in_delivery",
                        },
                    }
                );

                res.send({ message: "Rider assigned" });
            } catch (err) {
                console.error(err);
                res.status(500).send({ message: "Failed to assign rider" });
            }
      });

    app.patch("/parcels/:id/status", async (req, res) => {
            const parcelId = req.params.id;
            const { status } = req.body;
            const updatedDoc = {
                delivery_status: status
            }

            if (status === 'in_transit') {
                updatedDoc.picked_at = new Date().toISOString()
            }
            else if (status === 'delivered') {
                updatedDoc.delivered_at = new Date().toISOString()
            }

            try {
                const result = await parcelsCollection.updateOne(
                    { _id: new ObjectId(parcelId) },
                    {
                        $set: updatedDoc
                    }
                );
                res.send(result);
            } catch (error) {
                res.status(500).send({ message: "Failed to update status" });
            }
      });

    app.patch("/parcels/:id/cashout", async (req, res) => {
            const id = req.params.id;
            const result = await parcelsCollection.updateOne(
                { _id: new ObjectId(id) },
                {
                    $set: {
                        cashout_status: "cashed_out",
                        cashed_out_at: new Date()
                    }
                }
            );
            res.send(result);
      });

 // GET: All parcels OR parcels by user (created_by), sorted by latest
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
       // GET: Get a specific parcel by ID
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

   app.get('/parcels/delivery/status-count', async (req, res) => {
              const pipeline = [
                  {
                      $group: {
                          _id: '$delivery_status',
                          count: {
                              $sum: 1
                          }
                      }
                  },
                  {
                      $project: {
                          status: '$_id',
                          count: 1,
                          _id: 0
                      }
                  }
              ];

              const result = await parcelsCollection.aggregate(pipeline).toArray();
              res.send(result);
    })

   app.delete("/parcels/:id", async (req, res) => {
        try {
          const id = req.params.id;

          const result = await parcelsCollection.deleteOne({
            _id: new ObjectId(id),
          });

          res.send(result);
        } catch (error) {
          console.error("Error deleting parcel:", error);
          res.status(500).send({ message: "Failed to delete parcel" });
        }
    });

     // GET: Get pending delivery tasks for a rider

     app.get('/rider/parcels',  async (req, res) => {
        try {
            const email = req.query.email;

            if (!email) {
                return res.status(400).send({ message: 'Rider email is required' });
            }

            const query = {
                assigned_rider_email: email,
                delivery_status: { $in: ['rider_assigned', 'in_transit'] },
            };

            const options = {
                sort: { creation_date: -1 }, // Newest first
            };

            const parcels = await parcelsCollection.find(query, options).toArray();
            res.send(parcels);
        } catch (error) {
            console.error('Error fetching rider tasks:', error);
            res.status(500).send({ message: 'Failed to get rider tasks' });
        }
    });

      // GET: Load completed parcel deliveries for a rider
    app.get('/rider/completed-parcels',  async (req, res) => {
        try {
            const email = req.query.email;

            if (!email) {
                return res.status(400).send({ message: 'Rider email is required' });
            }

            const query = {
                assigned_rider_email: email,
                delivery_status: {
                    $in: ['delivered', 'service_center_delivered']
                },
            };

            const options = {
                sort: { creation_date: -1 }, // Latest first
            };

            const completedParcels = await parcelsCollection.find(query, options).toArray();

            res.send(completedParcels);

        } catch (error) {
            console.error('Error loading completed parcels:', error);
            res.status(500).send({ message: 'Failed to load completed deliveries' });
        }
    });



    // ================ Payment Routes ======================= //
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

    // create payment intent api
    app.post("/create-payment-intent", async (req, res) => {
      const amountInCents = req.body.amountInCents;
      try {
        const paymentIntent = await stripe.paymentIntents.create({
          amount: amountInCents, // Amount in cents
          currency: "usd",
          payment_method_types: ["card"],
        });

        res.json({ clientSecret: paymentIntent.client_secret });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });






    // =========✅ TRACKING - Public ========= //
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

    app.get("/trackings/:trackingId", async (req, res) => {
            const trackingId = req.params.trackingId;

            const updates = await trackingsCollection
                .find({ tracking_id: trackingId })
                .sort({ timestamp: 1 }) // sort by time ascending
                .toArray();

            res.json(updates);
       });

     // tracking api
     app.post("/tracking", async (req, res) => {
          const {
            tracking_id,
            parcel_id,
            status,
            message,
            updated_by = "",
          } = req.body;

          const log = {
            tracking_id,
            parcel_id: parcel_id ? new ObjectId(parcel_id) : undefined,
            status,
            message,
            time: new Date(),
            updated_by,
          };

          const result = await trackingsCollection.insertOne(log);
          res.send({ success: true, insertedId: result.insertedId });
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



   
  
    // =============== Rider Route ================== //
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

   app.get("/riders/available", async (req, res) => {
            const { district } = req.query;

            try {
                const riders = await ridersCollection
                    .find({
                        district,
                        // status: { $in: ["approved", "active"] },
                        // work_status: "available",
                    })
                    .toArray();

                res.send(riders);
            } catch (err) {
                res.status(500).send({ message: "Failed to load riders" });
            }
        });

    app.patch("/riders/:id/status", async (req, res) => {
            const { id } = req.params;
            const { status, email } = req.body;
            const query = { _id: new ObjectId(id) }
            const updateDoc = {
                $set:
                {
                    status
                }
            }

            try {
                const result = await ridersCollection.updateOne(
                    query, updateDoc

                );

                // update user role for accepting rider
                if(status === 'active'){
                  const userQuery = {email}
                  const userUpdateDoc = {
                    $set: {
                      role: 'rider'
                    }
                  }
                  const roleResult = await usersCollection.updateOne(userQuery, userUpdateDoc)
                }
                res.send(result);
            } catch (err) {
                res.status(500).send({ message: "Failed to update rider status" });
            }
        });


    //  writing sharif ahmed siam ====*************/****/
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













  // post a offer by admin--------------------------------------------------


  // ==================== OFFER MANAGEMENT API ====================

// ✅ GET ALL OFFERS
app.get("/api/offers", async (req, res) => {
  try {
    const offers = await offersCollection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    
    res.json({
      success: true,
      offers
    });
  } catch (error) {
    console.error("Get offers error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch offers"
    });
  }
});

// ✅ GET ACTIVE OFFER
app.get("/api/offers/active", async (req, res) => {
  try {
    const activeOffer = await offersCollection.findOne({
      isActive: true,
      isDeleted: { $ne: true }
    });
    
    res.json({
      success: true,
      offer: activeOffer || null
    });
  } catch (error) {
    console.error("Get active offer error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch active offer"
    });
  }
});

// ✅ CREATE NEW OFFER
app.post("/api/offers", async (req, res) => {
  try {
    const { title, description, image, buttonText, buttonLink, expiresAt } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        error: "Title and description are required"
      });
    }

    // Deactivate all other offers
    await offersCollection.updateMany(
      { isActive: true },
      { $set: { isActive: false } }
    );

    const newOffer = {
      title,
      description,
      image: image || "",
      buttonText: buttonText || "Learn More",
      buttonLink: buttonLink || "#",
      expiresAt: expiresAt ? new Date(expiresAt) : null,
      isActive: true,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await offersCollection.insertOne(newOffer);

    res.status(201).json({
      success: true,
      message: "Offer created successfully",
      offerId: result.insertedId
    });
  } catch (error) {
    console.error("Create offer error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to create offer"
    });
  }
});

// ✅ UPDATE OFFER
app.put("/api/offers/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image, buttonText, buttonLink, expiresAt, isActive } = req.body;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid offer ID"
      });
    }

    const updateFields = {
      updatedAt: new Date()
    };

    if (title) updateFields.title = title;
    if (description) updateFields.description = description;
    if (image !== undefined) updateFields.image = image;
    if (buttonText) updateFields.buttonText = buttonText;
    if (buttonLink) updateFields.buttonLink = buttonLink;
    if (expiresAt) updateFields.expiresAt = new Date(expiresAt);

    // If activating this offer, deactivate others
    if (isActive === true) {
      await offersCollection.updateMany(
        { _id: { $ne: new ObjectId(id) }, isActive: true },
        { $set: { isActive: false } }
      );
      updateFields.isActive = true;
    } else if (isActive === false) {
      updateFields.isActive = false;
    }

    const result = await offersCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateFields }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({
        success: false,
        error: "Offer not found"
      });
    }

    res.json({
      success: true,
      message: "Offer updated successfully"
    });
  } catch (error) {
    console.error("Update offer error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to update offer"
    });
  }
});

// ✅ DELETE OFFER (Soft Delete)
app.delete("/api/offers/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid offer ID"
      });
    }

    const result = await offersCollection.updateOne(
      { _id: new ObjectId(id) },
      { 
        $set: { 
          isDeleted: true,
          isActive: false,
          updatedAt: new Date()
        } 
      }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({
        success: false,
        error: "Offer not found"
      });
    }

    res.json({
      success: true,
      message: "Offer deleted successfully"
    });
  } catch (error) {
    console.error("Delete offer error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to delete offer"
    });
  }
});

// ✅ TOGGLE OFFER STATUS
app.patch("/api/offers/:id/toggle", async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid offer ID"
      });
    }

    const offer = await offersCollection.findOne({ _id: new ObjectId(id) });
    if (!offer) {
      return res.status(404).json({
        success: false,
        error: "Offer not found"
      });
    }

    const newStatus = !offer.isActive;

    // If activating, deactivate all other offers
    if (newStatus) {
      await offersCollection.updateMany(
        { _id: { $ne: new ObjectId(id) }, isActive: true },
        { $set: { isActive: false } }
      );
    }

    const result = await offersCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { isActive: newStatus, updatedAt: new Date() } }
    );

    res.json({
      success: true,
      message: `Offer ${newStatus ? 'activated' : 'deactivated'} successfully`,
      isActive: newStatus
    });
  } catch (error) {
    console.error("Toggle offer error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to toggle offer status"
    });
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