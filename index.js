
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const port = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

const uri = process.env.DB_URL;
const client = new MongoClient(uri, {
  serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true },
});

const { verifyToken, authorizeRoles } = require("./middleware/auth");

async function run() {
  try {
    await client.connect();
    const db = client.db("QdropDB");
    const userCollection = db.collection("users");
    const feedbackCollection = db.collection("feedback");
    const ridersCollection = db.collection("riders");

    /** ------------------ USERS ------------------ **/

    // Create user
    app.post("/users", async (req, res) => {
      try {
        const { name, email, password, photo } = req.body;
        if (!name || !email) return res.status(400).send({ error: "name and email are required" });

        const existingUser = await userCollection.findOne({ email });
        if (existingUser) return res.status(200).send({ success: true, user: existingUser, message: "User already exists" });

        let hashedPassword = password ? await bcrypt.hash(password, 10) : null;

        const newUser = {
          name,
          email,
          password: hashedPassword,
          photo: photo || "https://i.ibb.co/2n8qPkw/default-avatar.png",
          role: "user",
          createdAt: new Date(),
        };

        const result = await userCollection.insertOne(newUser);
        res.status(201).send({ success: true, userId: result.insertedId, message: "User created successfully" });
      } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Failed to create user" });
      }
    });

    // Login
    app.post("/login", async (req, res) => {
      try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).send({ error: "Email and password required" });

        const user = await userCollection.findOne({ email });
        if (!user) return res.status(400).send({ error: "Invalid email or password" });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).send({ error: "Invalid email or password" });

        // JWT token
        const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.send({
          success: true,
          message: "Login success",
          token,
          user: { id: user._id, name: user.name, email: user.email, role: user.role },
        });
      } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Login failed" });
      }
    });


    // POST /login/social




app.post("/login/social", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userCollection.findOne({ email });
    if (!user) return res.status(404).send({ error: "User not found" });

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.send({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Server error" });
  }
});




    // Update user role (Admin only)
    app.patch("/users/:id/role", verifyToken, authorizeRoles("admin"), async (req, res) => {
      const { id } = req.params;
      const { role } = req.body;
      if (!role) return res.status(400).send({ error: "Role is required" });

      try {
        const result = await userCollection.updateOne({ _id: new ObjectId(id) }, { $set: { role } });
        if (result.modifiedCount === 0) return res.status(404).send({ error: "User not found or role unchanged" });
        res.send({ success: true, message: "User role updated successfully" });
      } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Failed to update role" });
      }
    });

    // Get all users (Admin only)
    app.get("/users", verifyToken, authorizeRoles("admin"), async (req, res) => {
      const users = await userCollection.find({}).toArray();
      res.send(users);
    });


    // GET single user by email
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
      },
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Server error" });
  }
});


    /** ------------------ FEEDBACK ------------------ **/

// GET all feedback
app.get("/feedback", async (req, res) => {
  try {
    const result = await feedbackCollection.find().toArray();
    res.send(result);
  } catch (err) {
    console.error("Error fetching feedback:", err);
    res.status(500).send({ error: "Failed to fetch feedback" });
  }
});

// POST new feedback
app.post("/feedback", async (req, res) => {
  try {
    const newFeedback = req.body;
    const result = await feedbackCollection.insertOne(newFeedback);
    res.send({ success: true, insertedId: result.insertedId });
  } catch (err) {
    console.error("Error inserting feedback:", err);
    res.status(500).send({ error: "Failed to add feedback" });
  }
});

// DELETE feedback
app.delete("/feedback/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) return res.status(400).send({ error: "Invalid feedback ID" });

    const result = await feedbackCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) return res.status(404).send({ error: "Feedback not found" });

    res.send({ success: true, message: "Feedback deleted" });
  } catch (err) {
    console.error("Error deleting feedback:", err);
    res.status(500).send({ error: "Failed to delete feedback" });
  }
});



    /** ------------------ RIDERS ------------------ **/

    // Rider application (Anyone can apply)
    app.post("/riders", verifyToken, authorizeRoles("user"), async (req, res) => {
      const newRider = { ...req.body, status: "pending", createdAt: new Date() };
      const result = await ridersCollection.insertOne(newRider);
      res.status(201).json({ success: true, riderId: result.insertedId, message: "Rider application submitted successfully" });
    });

    // Get all riders (Admin only)
    app.get("/riders", verifyToken, authorizeRoles("admin"), async (req, res) => {
      const riders = await ridersCollection.find().toArray();
      res.json(riders);
    });

    // Get active riders (Any logged-in user)
    app.get("/riders/active", verifyToken, async (req, res) => {
      const activeRiders = await ridersCollection.find({ status: "accepted" }).toArray();
      res.json(activeRiders);
    });

    // Update rider status (Admin only)
    app.put("/riders/:id", verifyToken, authorizeRoles("admin"), async (req, res) => {
      const { id } = req.params;
      const { status } = req.body;
      const result = await ridersCollection.updateOne({ _id: new ObjectId(id) }, { $set: { status, updatedAt: new Date() } });
      if (result.modifiedCount === 0) return res.status(404).json({ success: false, message: "Rider not found" });
      res.json({ success: true, message: "Rider status updated successfully" });
    });

    // Delete rider (Admin only)
    app.delete("/riders/:id", verifyToken, authorizeRoles("admin"), async (req, res) => {
      const { id } = req.params;
      const result = await ridersCollection.deleteOne({ _id: new ObjectId(id) });
      if (result.deletedCount === 0) return res.status(404).json({ success: false, message: "Rider not found" });
      res.json({ success: true, message: "Rider deleted successfully" });
    });

    // Get single rider (Any logged-in user)
    app.get("/riders/:id", verifyToken, async (req, res) => {
      const { id } = req.params;
      const rider = await ridersCollection.findOne({ _id: new ObjectId(id) });
      if (!rider) return res.status(404).json({ success: false, message: "Rider not found" });
      res.json(rider);
    });

    console.log("Backend connected to MongoDB successfully!");
  } finally {
    // do not close client, server will keep running
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Assalamu alaikum QuickDrop server is running!");
});

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
