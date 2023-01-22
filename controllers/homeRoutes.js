const router = require("express").Router();
const { User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", (req, res) => {
  try {
    res.render("homepage", {
      logged_in: req.session.loggedIn,
      userData: req.body.userData,
    });
  } catch (err) {
    res.status(500).json(err);
  }
})

router.get("/draw", withAuth, (req, res) => {
  try {
    res.status(200).render("canvas", {
      canvas: true,
      logged_in: req.session.logged_in,
      userData: req.body.userData,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/profile", withAuth, (req, res) => {
  try {
    res.status(200).render("profile", {
      loggedIn: req.session.loggedIn,
      userData: req.session.userData,
    })
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get("/profile/:userId", withAuth, (req, res) => {
  try {
    res.status(200).render("profile", {
      loggedIn: req.session.loggedIn,
      userData: req.body.userData,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/images/:imageId", withAuth, (req, res) => {
  try {
    res.status(200).render("image", {
      loggedIn: req.session.loggedIn,
      userData: req.body.userData,
    });
  } catch (err) {
    res.status(500).json(err);
  }
})

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

module.exports = router;
