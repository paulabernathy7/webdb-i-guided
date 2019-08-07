const express = require("express");

// database access using knex
const db = require("../data/db-config.js");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const posts = await db("posts");
    // The below line is the same as above, but more like regular sql code
    // const posts = await db.select('*').from('posts');
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: "Error gettinf posts", error: err });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await db.where({ id });
    res.status(200).json(post);
  } catch (err) {
    //error
  }
});

router.post("/", async (req, res) => {
  const postData = req.body;
  try {
    const post = await db("posts").insert(postData);
    res.status(201).json(post);
  } catch (err) {
    res
      .status(500)
      .json({ message: "There was an error getting the data", error: err });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  try {
    const count = await db("posts")
      .where(id)
      .update(changes);

    count
      ? res.status(200).json({ updated: count })
      : res.status(404).json({ message: `Could not find post#${id}` });
  } catch (err) {
    res.status(500).json({ message: "error getting data", error: err });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const count = await db("posts")
      .where({ id })
      .del();
    res.status(200).json({ message: `Deleted ${id} items` });
  } catch (err) {
    res.status(500).json({ message: "error getting data", error: err });
  }
});
