const router = require("express").Router();
const { Image } = require("../../models");

router.get("/public", async (req, res) => {
  try {
    const publicImages = await Image.findAll({
      where: {
        public: true,
      },
    });

    if (!publicImages[0])
      res.status(404).json({ message: "No public images found...?" });

    res.status(200).json(publicImages);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/save", async (req, res) => {
  try {
    const snapshot = req.body.snapshot;
    const isPublic = req.body.isPublic;
    const userId = req.body.userId;

    console.log(req.body);

    Image.create({
      snapshot: snapshot,
      is_public: isPublic,
      user_id: userId,
    });

    res.status(200).json({ message: "success!" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
