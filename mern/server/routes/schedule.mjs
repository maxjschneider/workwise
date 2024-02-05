import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// This section will help you get a list of all the records.
router.get("/", async (req, res) => {
  let collection = await db.collection("schedule");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});


// Gets all schedule entries for a certain user
router.get("/user/:id", async (req, res) => {
    let collection = await db.collection("schedule");
    let query = {user_id: new ObjectId(req.params.id)};
    let result = await collection.find(query);
 
    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
  });

// Gets all schedule entries for a certain day
router.get("/day/:day", async (req, res) => {
  let collection = await db.collection("schedule");
  let query = {"day" : req.params.day};
  let result = await collection.find(query).toArray();

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// This section will help you create a new record.
router.post("/", async (req, res) => {
  let newDocument = {
    user_id: req.body.user_id,
    day: req.body.day,
    start: req.body.start,
    end: req.body.end,
    enabled: true
  };
  let collection = await db.collection("schedule");
  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});

// This section will help you update a record by id.
router.patch("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  const updates =  {
    $set: {
      name: req.body.name,
      position: req.body.position,
      level: req.body.level
    }
  };

  let collection = await db.collection("schedule");
  let result = await collection.updateOne(query, updates);
  res.send(result).status(200);
});

// This section will help you delete a record
router.delete("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };

  const collection = db.collection("schedule");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

export default router;