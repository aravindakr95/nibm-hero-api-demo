const express = require("express");
const router = express.Router();

const User = require('../models/user');

router.post("/", async (req, res) => {
    let userToAdd = new User(req.body);

    try {
        let userCreated = await userToAdd.save();
        res.status(200).send({
            username: userCreated.name,
            email: userCreated.email
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
