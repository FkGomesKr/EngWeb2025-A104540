var mongoose = require('mongoose')

var livroSchema = new mongoose.Schema({
    _id: String,
    title: String,
    series: String,
    author: String,
    rating: Number,
    description: String,
    language: String,
    isbn: Number,
    genres: [String],
    characters: [String],
    bookFormat: String,
    edition: String,
    pages: Number,
    publisher: String,
    publishDate: String,
    firstPublishDate: String,
    edition: String,
    awards: [String],
    ratingsByStars: [String],
    likedPercent: Number,
    setting: [String],
    coverImg: String,
    bbeScore: Number,
    bbeVotes: Number,
    price: Number
}, {versionKey : false});

module.exports = mongoose.model('livro', livroSchema)