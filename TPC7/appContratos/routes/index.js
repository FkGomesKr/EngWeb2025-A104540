var express = require('express');
var router = express.Router();
var axios = require('axios');

// GET home page
router.get('/', function(req, res, next) {
  axios.get('http://localhost:16000/contratos')
    .then(response => res.render('index', { title: 'Contratos - Home', slist: response.data, page: ' Home' }))
    .catch(error => res.status(500).render('error', {'error': error}));
});

// GET specific Contrato page or Contratos from Entidade page
router.get('/:id', async function(req, res, next) {
  try {
    const contractResponse = await axios.get('http://localhost:16000/contratos/' + req.params.id);

    if (contractResponse.data) {
      return res.render('contract', {
        title: 'Contrato Page', 
        contrato: contractResponse.data, 
        page: ' ' + contractResponse.data._id
      });
    } else {
      const entidadeResponse = await axios.get('http://localhost:16000/contratos?entidade=' + req.params.id);
      
      const sum = entidadeResponse.data.reduce((acc, item) => acc + item.precoContratual, 0);

      return res.render('entidade', {
        title: 'Entidade Page', 
        slist: entidadeResponse.data, 
        page: ' NIPC: ' + entidadeResponse.data[0].NIPC_entidade_comunicante, 
        pageTitle: 'Entidade: ' + entidadeResponse.data[0].entidade_comunicante,
        sum: sum
      });
    }
  } catch (error) {
    return res.status(500).render('error', { error: error.message });
  }
});

module.exports = router;
