const express = require("express");
const { ObjectID } = require("mongodb");
const Addic = require("../schema/addics");

const router = new express.Router();

//Get all Addics
router.get("/", async (req, res) => {
  const addics = await Addic.find().sort({ timestamp: -1 });
  res.status(200).json(addics);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const addic = await Addic.findById(id);
    if (addic) {
      res.json({ addic });
    } else {
      res.status(404).json({ message: "Addic not found" });
    }
  } catch (err) {
    res.status(500).json({ err });
  }
});

//Add Addic
router.post("/", async (req, res) => {
  const newAddic = new Addic({
    authorId: req.body.authorId,
    comments: [],
    likers: [],
    likesCount: 0,
    name: req.body.name,
    timestamp: new Date().getTime(),
    pinned: false,
  });

  try {
    const addic = await newAddic.save();
    return res.status(201).json(addic);
  } catch (err) {
    return res.status(400).send(err);
  }
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;

  /* const user = await User.findById(req.body.authorId);
  const list = user.adds;*/

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if (req.body.action === "like") {
    try {
      return Addic.findByIdAndUpdate(
        id,
        {
          $inc: { likesCount: 1 },
          $addToSet: { likers: req.body.id },
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
  if (req.body.action === "unlike") {
    try {
      return Addic.findByIdAndUpdate(
        id,
        {
          $inc: { likesCount: -1 },
          $pull: { likers: req.body.id },
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

  if (req.body.action === "addComment") {
    try {
      return Addic.findByIdAndUpdate(
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
      return Addic.findByIdAndUpdate(
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

  if (req.body.action === "updateTimer") {
    try {
      return Addic.findByIdAndUpdate(
        id,
        {
          $set: {
            timestamp: new Date().getTime(),
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

  if (req.body.action === "editColor") {
    try {
      return Addic.findByIdAndUpdate(
        id,
        {
          $set: {
            cardColor: req.body.cardColor,
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
      return Addic.findById(id, (err, post) => {
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
  }

  try {
    return Addic.findByIdAndUpdate(
      id,
      { $set: { name: req.body.name, goal: req.body.goal } },
      { new: true },
      (err, post) => {
        if (err) return res.status(400).send(err);
        return res.send(post);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const post = await Addic.findById(req.params.id);
    await post.remove();
    return res.json({ success: true });
  } catch (err) {
    return res.status(404).send(err);
  }
});

module.exports = router;
