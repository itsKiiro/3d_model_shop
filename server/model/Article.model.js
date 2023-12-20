const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    sceneUrl: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    tags: [String],
    price: {
        type: Number,
    },
    previewImage: {
        type: String,
    },
    comments: [{
        author: String,
        comment: String,
        date: {
            type: Date,
            default: Date.now
        }
    }]
}, { timestamps: true });

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
