const router = require("express").Router();
const { Image } = require("../../models");
const { route } = require("./userRoutes");

router.get("/", async (req, res) => {
    try {
        res.json(Image.findAll())
    } catch (err) {
        res.json(err)
    }
});

module.exports = router