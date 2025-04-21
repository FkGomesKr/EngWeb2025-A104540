var livro = require('../models/livro')

module.exports.getAllLivros = () => {
    return livro.find().exec();
};

module.exports.getLivrobyID = (id) => {
    return livro.findById(id).exec();
};

module.exports.getAllLivroswithCharacter = (character) => {
    return livro.find({ characters: { $in: [character] } }).exec();
};

module.exports.getAllLivroswithGenre = (genre) => {
    return livro.find({ genres: { $in: [genre] } }).exec();
};

module.exports.getAllGenresfromLivros = () => {
    return livro.distinct('genres').sort({genres: 1}).exec();
};

module.exports.getAllCharactersfromLivros = () => {
    return livro.distinct('characters').sort({characters: 1}).exec();
};

module.exports.postnewLivro = (livrobody) => {
    var newLivro = new livro(livrobody);
    return newLivro.save();
};

module.exports.updateLivro = (id, livrobody) => {
    return livro.findByIdAndUpdate(id, livrobody, { new: true }).exec();
};

module.exports.deleteLivro = (id) => {
    return livro.findByIdAndDelete(id, { new: true }).exec();
};