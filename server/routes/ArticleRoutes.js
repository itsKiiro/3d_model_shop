const express = require('express');
const router = express.Router();
const Article = require('../model/Article.model.js');

router.get("/articles", async (req, res) => {
    try {
        const articles = await Article.find({});
        res.json(articles);
    } catch (error) {
        res.status(500).send(error.message);
    }
})

router.get("/search", async (req, res) => {
    try {
        const searchQuery = req.query.q;
        const articles = await Article.find({ title: new RegExp(searchQuery, 'i') });
        res.json(articles);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get("/article/:id", async (req, res) => {
    try {
        const articleId = req.params.id;
        const article = await Article.find({ _id: articleId });
        res.json(article);
    } catch (error) {
        res.status(500).send(error.message);
    }
})


module.exports = router;