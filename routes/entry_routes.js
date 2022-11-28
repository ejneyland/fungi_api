const express = require("express")
const router = express.Router()
const EntryModel = require("../db/entry_model")

router.get("/", async (req, res) => {
  res.send(await EntryModel.find());
});

router.get("/:id", (req, res) => {
  EntryModel.findById(req.params.id, (err, doc) => {
    if (err) {
      res.status(404).send({ error: `Could not find entry: ${req.params.id}` });
    } else {
      res.send(doc);
    }
  });
});

router.post("/", (req, res) => {
  EntryModel.create(req.body, (err, doc) => {
    if (err) {
      res.status(422).send({ error: err.message });
    } else {
      res.status(201).send(doc);
    }
  });
});

router.put("/:id", async (req, res) => {
  res.send(
    await EntryModel.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
    })
  );
});

router.delete("/:id", async (req, res) => {
  EntryModel.findByIdAndDelete(req.params.id, () => res.sendStatus(204));
});

 module.exports = router