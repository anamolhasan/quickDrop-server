require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const bcrypt = require('bcrypt')
const port = process.env.PORT || 5000
const { MongoClient, ServerApiVersion } = require('mongodb');



// middleware
app.use(cors())
app.use(express.json())



const uri = process.env.DB_URL

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    
    const db = client.db('QdropDB');
    const usercollection = db.collection('users')


   app.post("/users", async (req, res) => {
      try {
        const { name, email, password, photo } = req.body; // photo is URL from frontend
        
        if (!name || !email || !password) {
          return res.status(400).send({ error: "name, email, password required" });
        }

        // Check if user already exists
        const existingUser = await usercollection.findOne({ email });
        if (existingUser) {
          return res.status(400).send({ error: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {
          name,
          email,
          password: hashedPassword,
          photo: photo || null, // Photo URL from ImgBB (or null)
          createdAt: new Date()
        };

        const result = await usercollection.insertOne(newUser);
        
        res.status(201).send({
          success: true,
          userId: result.insertedId,
          message: "User created successfully"
        });
        
      } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send({ error: 'Failed to create user' });
      }
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
  

 


}
run().catch(console.dir);




app.get('/', (req, res) => {
  res.send('Assalamu alaikum quick drop server developer team!')
})

app.listen(port, () => {
  console.log(`Server is listening on port http://localhost:${port}`)
})

// DB_URL=mongodb+srv://copyvai1998_db_user:VBzzl32BahwwIfBQ@quickdrop.ocbtvpx.mongodb.net/?retryWrites=true&w=majority&appName=QuickDrop

//  copyvai1998_db_user
//  VBzzl32BahwwIfBQ