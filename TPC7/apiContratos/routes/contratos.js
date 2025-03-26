var express = require('express');
var router = express.Router();
var contrato = require('../controllers/contrato')

// getAllContracts (with filter possibly)
router.get('/', function(req, res, next) {
  if (req.query.entidade && req.query.tipo) {
    contrato.getAllContractswithEntidadeAndTipo(req.query.entidade, req.query.tipo)
      .then(data => res.status(200).json(data))
      .catch(error => res.status(500).jsonp(error));
  }
  else if (req.query.entidade) {
    contrato.getAllContractswithEntidade(req.query.entidade)
      .then(data => res.status(200).json(data))
      .catch(error => res.status(500).jsonp(error));
  } else if (req.query.tipo) {
    contrato.getAllContractswithTipo(req.query.tipo)
      .then(data => res.status(200).json(data))
      .catch(error => res.status(500).jsonp(error));
  } else {
    contrato.getAllContracts()
      .then(data => res.status(200).json(data))
      .catch(error => res.status(500).jsonp(error));
  }
});

// postnewContract
router.post('/', function(req, res, next) {
  contrato.postnewContract(req.body)
    .then(data => res.status(201).json(data))
    .catch(error => res.status(500).jsonp(error));
});

// updateContract
router.put('/:id', function(req, res, next) {
  contrato.updateContract(req.params.id, req.body)
    .then(data => res.status(200).json(data))
    .catch(error => res.status(500).jsonp(error));
});

// deleteContract
router.delete('/:id', function(req, res, next) {
  contrato.deleteContract(req.params.id)
    .then(data => res.status(200).json(data))
    .catch(error => res.status(500).jsonp(error));
});

// getAllEntidadesfromContracts
router.get('/entidades', function(req, res, next) {
  contrato.getAllEntidadesfromContracts()
    .then(data => res.status(200).json(data))
    .catch(error => res.status(500).jsonp(error));
});

// getAllTiposfromContracts
router.get('/tipos', function(req, res, next) {
  contrato.getAllTiposfromContracts()
    .then(data => res.status(200).json(data))
    .catch(error => res.status(500).jsonp(error));
});

// getContractbyID
router.get('/:id', function(req, res, next) {
  contrato.getContractbyID(req.params.id)
    .then(data => res.status(200).json(data))
    .catch(error => res.status(500).jsonp(error));
});

module.exports = router;
