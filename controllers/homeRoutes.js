const router = require("express").Router();
const { User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", (req, res) => {
  try {
    res.render("homepage", {
      loggedIn: req.session.loggedIn,
      userData: req.body.userData,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/draw", withAuth, (req, res) => {
  try {
    res.render("canvas", {
      canvas: true,
      loggedIn: req.session.loggedIn,
      userData: req.body.userData,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/profile", withAuth, async (req, res) => {
  try {
    res.redirect(`/profile/${req.session.userId}`);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/profile/:userId", withAuth, async (req, res) => {
  try {
    const requirements = {user_id: req.params.userId}
    if (req.params.userId!==req.session.userId) requirements.public = true
    const userDrawings = await Image.findAll({ where: requirements })
    res.render("profile", {
      loggedIn: req.session.loggedIn,
      userData: req.body.userData,
      userDrawings: userDrawings
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/images/:imageId", withAuth, async (req, res) => {
  try {
    const id = req.params.Imageid;
    const image = await Image.findByPk(id);
    res.render("image", {
      loggedIn: req.session.loggedIn,
      userData: req.body.userData,
      image: image
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

module.exports = router;
