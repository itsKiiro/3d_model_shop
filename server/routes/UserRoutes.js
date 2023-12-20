const express = require('express');
const router = express.Router();
const User = require('../model/User.model.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const authenticateToken = require('./Middleware.js');
require('dotenv').config({ "path": "../.env" });


router.post("/sign-up", async (req, res) => {
    try {
        let body = req.body;
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(body.password, salt);
        body.password = hash;
        await User.create(body);
        res.json("");
    } catch (error) {
        res.status(500).send(error.message);
    }
})

router.post("/login", async (req, res) => {
    try {
        const body = req.body;
        const foundUser = await User.findOne({ username: body.username });
        if (foundUser) {

            const match = await bcrypt.compare(body.password, foundUser.password);

            if (match) {

                const token = jwt.sign(
                    { userId: foundUser._id, username: foundUser.username },
                    process.env.JWT_SECRET,
                    { expiresIn: '24h' }
                );

                res.json({ token });
            } else {
                res.status(401).json("Ungültige Anmeldedaten");
            }
        } else {
            res.status(404).json("Benutzer nicht gefunden");
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
})


router.put("/cart/add", authenticateToken, async (req, res) => {
    try {
        const { article } = req.body;
        const username = req.user.username;
        let user = await User.findOne({ username: username });

        if (!user.cart.some(item => item._id.toString() === article._id)) {
            user.cart.push(article);
            user.save();
    
            res.json("Added To Cart!");
        } else {
            res.status(400).json("Item already added!")
        }


    } catch (error) {
        res.status(500).send(error.message);
    }
})

router.delete("/cart/remove", authenticateToken, async (req, res) => {
    try {
        const { article } = req.body;
        const username = req.user.username;
        let user = await User.findOne({ username: username });

        if (user) {
            user.cart = user.cart.filter(item => item._id !== article._id);
            await user.save();
            res.json("Artikel aus dem Warenkorb entfernt");
        } else {
            res.status(404).json("Benutzer nicht gefunden");
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
})

router.get("/cart/get", authenticateToken, async (req, res) => {
    try {
        const username = req.user.username;
        let user = await User.findOne({ username: username });
        res.json(user.cart);
    } catch (error) {
        res.status(500).send(error.message);
    }
})

router.delete("/cart/remove/all", authenticateToken, async (req, res) => {
    try {
        const username = req.user.username;
        let user = await User.findOne({ username: username });
        user.cart = [];
        await user.save();

        res.json("Cart cleared!");
    } catch (error) {
        res.status(500).send(error.message);
    }
})

module.exports = router;