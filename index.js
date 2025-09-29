require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt");
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");


// middleware
app.use(cors());
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000", // your Next.js frontend
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

const uri = process.env.DB_URL;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const db = client.db("QdropDB");
    const userCollection = db.collection("users");
    const usersFeedbackCollection = db.collection("feedback");

    // app.post("/users", async(req,res)=>{
    //   const newUser = req.body
    //   const result = await userCollection.insertOne(newUser)
    //   res.send(result)
    // })

    // user Feedback -----------
    // feedback (GET)
    app.get("/feedback", async (req, res) => {
      const result = await usersFeedbackCollection.find().toArray();
      res.send(result);
    });

    // feedback (POST)
    app.post("/feedback", async (req, res) => {
      const newFeedback = req.body;
      const result = await usersFeedbackCollection.insertOne(newFeedback);

      res.send(result);
    });

    app.post("/users", async (req, res) => {
  try {
    const { name, email, password, photo } = req.body;

    // Require only name & email (password is optional for social login)
    if (!name || !email) {
      return res
        .status(400)
        .send({ error: "name and email are required" });
    }

    // Check if user already exists
    const existingUser = await userCollection.findOne({ email });
    if (existingUser) {
      return res
        .status(200)
        .send({ success: true, user: existingUser, message: "User already exists" });
    }

    let hashedPassword = null;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const newUser = {
      name,
      email,
      password: hashedPassword, // will be null for social login
      photo: photo || "https://i.ibb.co/2n8qPkw/default-avatar.png",
      role: "user",
      createdAt: new Date(),
    };

    const result = await userCollection.insertOne(newUser);

    res.status(201).send({
      success: true,
      userId: result.insertedId,
      message: "User created successfully",
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send({ error: "Failed to create user" });
  }
});


    app.get("/users", async (req, res) => {
      const users = await userCollection.find({}).toArray();
      res.send(users);
    });

    app.post("/login", async (req, res) => {
      try {
        const { email, password } = req.body;

        if (!email || !password) {
          return res.status(400).send({ error: "Email and password required" });
        }

        const user = await userCollection.findOne({ email });

        if (!user) {
          return res.status(400).send({ error: "Invalid email or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          return res.status(401).send({ error: "Invalid email or password" });
        }

        res.send({
          success: true,
          message: "Login success",
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            photo: user.photo || "https://i.ibb.co/2n8qPkw/default-avatar.png",
            role: user.role,
          },
        });
      } catch (error) {
        console.error("Login error:", error);
        res.status(500).send({ error: "Login failed" });
      }
    });


    // PATCH /users/:id/role
app.patch("/users/:id/role", async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  if (!role) return res.status(400).send({ error: "Role is required" });

  try {
    const result = await userCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { role } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).send({ error: "User not found or role unchanged" });
    }

    res.send({ success: true, message: "User role updated successfully" });
  } catch (error) {
    console.error("Error updating user role:", error);
    res.status(500).send({ error: "Failed to update role" });
  }
});





    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Assalamu alaikum quick drop server developer team!");
});

app.listen(port, () => {
  console.log(`Server is listening on port http://localhost:${port}`);
});

// DB_URL=mongodb+srv://copyvai1998_db_user:VBzzl32BahwwIfBQ@quickdrop.ocbtvpx.mongodb.net/?retryWrites=true&w=majority&appName=QuickDrop

//  copyvai1998_db_user
//  VBzzl32BahwwIfBQ
