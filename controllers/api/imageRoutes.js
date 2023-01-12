const router = require("express").Router();
const { Image } = require("../../models");

router.get("/", async (req, res) => {
    try {
        res.json(await Image.findAll())
    } catch (err) {
        res.json(err)
    }
});

module.exports = router