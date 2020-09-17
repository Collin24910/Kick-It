const express = require("express");
const { ObjectID } = require("mongodb");
const Threads = require("../schema/Threads");

const router = new express.Router();

//Get all threads
router.get("/", async (req, res) => {
  const threads = await Threads.find().sort({ timestamp: -1 });
  res.status(200).json(threads);
});

//Get a thread
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const thread = await Threads.findById(id);
    if (thread) {
      res.json({ thread });
    } else {
      res.status(404).json({ message: "Thread not found" });
    }
  } catch (err) {
    res.status(500).json({ err });
  }
});

//Add thread
router.post("/", async (req, res) => {
  const newThread = new Threads({
    authorId: req.body.authorId,
    text: req.body.text,
    comments: [],
    topic: req.body.topic,
    timestamp: new Date().getTime(),
  });
  try {
    const thread = await newThread.save();
    return res.status(201).json(thread);
  } catch (err) {
    return res.status(400).send(err);
  }
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if (req.body.action === "addComment") {
    try {
      return Threads.findByIdAndUpdate(
        id,
        {
          $addToSet: {
            comments: {
              commenterId: req.body.commenterId,
              text: req.body.text,
              timestamp: new Date().getTime(),
            },
          },
        },
        { new: true },
        (err, post) => {
          if (err) return res.status(400).send(err);
          return res.send(post);
        }
      );
    } catch (err) {
      return res.status(400).send(err);
    }
  }

  if (req.body.action === "deleteComment") {
    try {
      return Threads.findByIdAndUpdate(
        id,
        {
          $pull: {
            comments: {
              _id: req.body.commentId,
            },
          },
        },
        { new: true },
        (err, post) => {
          if (err) return res.status(400).send(err);
          return res.send(post);
        }
      );
    } catch (err) {
      return res.status(400).send(err);
    }
  }

  if (req.body.action === "editComment") {
    try {
      return Threads.findById(id, (err, post) => {
        const { comments } = post;
        const theComment = comments.find((comment) =>
          comment._id.equals(req.body.commentId)
        );

        if (!theComment) return res.status(404).send("Comment not found");
        theComment.text = req.body.text;

        return post.save((error) => {
          if (error) return res.status(500).send(error);
          return res.status(200).send(post);
        });
      });
    } catch (err) {
      return res.status(400).send(err);
    }
  } else {
    try {
      return Threads.findByIdAndUpdate(
        id,
        {
          $set: { text: req.body.text, topic: req.body.topic },
        },
        { new: true },
        (err, post) => {
          if (err) return res.status(400).send(err);
          return res.send(post);
        }
      );
    } catch (err) {
      return res.status(400).send(err);
    }
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const post = await Threads.findById(req.params.id);
    await post.remove();
    return res.json({ success: true });
  } catch (err) {
    return res.status(404).send(err);
  }
});

module.exports = router;
