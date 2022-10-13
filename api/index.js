import "dotenv/config";
import fetch from 'node-fetch';
import express from "express";
import { ObjectId } from "mongodb";
import { initClient } from "./db/mongo.js";
import { registerMiddleware } from "./middleware/index.js";

const app = express();
const port = process.env.PORT || 80;


// register middleware
registerMiddleware(app);

// init MongoDB
const client = await initClient();
const db = client.db();

app.get('/', (req,res) => {
  res.send(process.env.VARIABLE_ONE);
});

//Import 100 entries to database 1 time by /import
app.get('/import', (req, res) => {
  fetch('https://random-data-api.com/api/food/random_food?size=100')
      .then(res=>res.json())
      .then((json) => {
          db.collection('foods').insertMany(json);
          console.log('imported');
      })
})


app.post("/login", async (req, res) => {
  const username = req.body.username;
  let user = await db.collection("users").findOne({ username });
  if (!user) {
    await db.collection("users").insertOne({ username });
    await db.collection("users").updateMany(
      { "username" : username },
      { $set: { "likes" : [] ,"dislikes": []} }
   );
    user = await db.collection("users").findOne({ username });
  }

  res.json(user);
});

const authRouter = express.Router();

authRouter.get("/foods", async (req, res) => {
  const foods = await db.collection("foods").find().skip(parseInt(req.query.skip)).limit(10).toArray()
  res.json(foods);
});

authRouter.get("/likes", async(req,res) => {
  const id = req.user._id;

  const likes = await db
    .collection("users")
    .findOne({ _id: ObjectId(id) });
  
    res.json(likes);
})

authRouter.patch("/likedDish", async(req,res) => {
  
  const id = req.user._id;

  

  const userFind = await db
    .collection("users")
    .findOne({ _id: ObjectId(id) });

  if (userFind) {
    
    const [...data ] = req.body;
    
    // // or updateOne
    const newData = data;
    await db.collection("users").findOneAndUpdate({ _id: ObjectId(id) }, {$set : { "likes": data}} );

    res.json(newData);
  } else {
    res.status(404).json({ error: "Not found" });
  }
})

authRouter.patch("/dislikedDish", async(req,res) => {
  
  const id = req.user._id;

  

  const userFind = await db
    .collection("users")
    .findOne({ _id: ObjectId(id) });

  if (userFind) {
    
    const [...data ] = req.body;
    
    // // or updateOne
    const newData = data;
    await db.collection("users").findOneAndUpdate({ _id: ObjectId(id) }, {$set : { "dislikes": data}} );

    res.json(newData);
  } else {
    res.status(404).json({ error: "Not found" });
  }
})

app.patch('/delete', async (req, res) => {
  const userId = req.body._id;
  const foodId = req.body.id;
  

  await db.collection("users").updateOne(
    { '_id': ObjectId(userId) }, 
    { $pull: { likes: { id: foodId } } },
    false, // Upsert
    true, // Multi
);

  res.json({});
})

app.use(async (req, res, next) => {
  if (req.headers.authorization) {
    // check if user with id exists
    const user = await db
      .collection("users")
      .findOne({ _id: ObjectId(req.headers.authorization) });
    // exists? pass user to request
    if (user) {
      req.user = user;
      return next();
    }
  }
  res.status(401).json({
    error: "Unauthorized",
  });
}, authRouter);

app.listen(port, () => {
  console.log(`App listening http://localhost:${port}`);
});

// make sure database is closed when server crashes
const closeServer = () => {
  // default
  process.exit();
};

process.on("SIGINT", () => closeServer());
process.on("SIGTERM", () => closeServer());