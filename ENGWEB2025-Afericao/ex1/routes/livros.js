var express = require('express');
var router = express.Router();
var contrato = require('../controllers/livro')

// getAllLivros (with filter possibly)
router.get('/', function(req, res, next) {
  if (req.query.character) {
    contrato.getAllLivroswithCharacter(req.query.character)
      .then(data => res.status(200).json(data))
      .catch(error => res.status(500).jsonp(error));
  } else if (req.query.genre) {
    contrato.getAllLivroswithGenre(req.query.genre)
      .then(data => res.status(200).json(data))
      .catch(error => res.status(500).jsonp(error));
  } else {
    contrato.getAllLivros()
      .then(data => res.status(200).json(data))
      .catch(error => res.status(500).jsonp(error));
  }
});

// getAllGenresfromLivros
router.get('/genres', function(req, res, next) {
  contrato.getAllGenresfromLivros()
    .then(data => res.status(200).json(data))
    .catch(error => res.status(500).jsonp(error));
});

// getAllCharactersfromLivros
router.get('/characters', function(req, res, next) {
  contrato.getAllCharactersfromLivros()
    .then(data => res.status(200).json(data))
    .catch(error => res.status(500).jsonp(error));
});

// getLivrobyID
router.get('/:id', function(req, res, next) {
  contrato.getLivrobyID(req.params.id)
    .then(data => res.status(200).json(data))
    .catch(error => res.status(500).jsonp(error));
});

// postnewLivro
router.post('/', function(req, res, next) {
  contrato.postnewLivro(req.body)
    .then(data => res.status(201).json(data))
    .catch(error => res.status(500).jsonp(error));
});

// updateLivro
router.put('/:id', function(req, res, next) {
  contrato.updateLivro(req.params.id, req.body)
    .then(data => res.status(200).json(data))
    .catch(error => res.status(500).jsonp(error));
});

// deleteLivro
router.delete('/:id', function(req, res, next) {
  contrato.deleteLivro(req.params.id)
    .then(data => res.status(200).json(data))
    .catch(error => res.status(500).jsonp(error));
});


module.exports = router;
