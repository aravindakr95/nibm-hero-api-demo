const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();
const User = require("../models/user");

const SECRET_KEY = "12345678";

router.post("/", async (req, res) => {
    let user = await User.findOne({email: req.body.email});
    if (!user) {
        return res.status(400).send("Invalid login credentials");
    }

    let isValid = user.password === req.body.password;

    if (!isValid) {
        return res.status(400).send("Invalid login credentials");
    }

    let token = jwt.sign({id: user._id, email: user.email}, SECRET_KEY);

    return res.status(200).send({ token });
});

module.exports = router;
