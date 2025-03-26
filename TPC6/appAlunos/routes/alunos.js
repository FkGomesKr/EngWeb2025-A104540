var express = require('express');
var router = express.Router();
var axios = require('axios');


router.get('/', function(req, res, next) {
  var date = new Date().toISOString().substring(0, 16);
  axios.get('http://localhost:3000/alunos?_sort=name')
  .then(resp => {
    res.status(200).render('index', {'slist': resp.data, 'date': date});
  })
  .catch(erro => {
    res.status(500).res.render('error', { 'error': erro });
  })
});

router.get('/registo', function(req, res, next) {
  var date = new Date().toISOString().substring(0, 16);
  res.status(200).render('studentsFromPage', {'date': date});
});

router.post('/registo', function(req, res, next) {
  var body = req.body
  axios.post('http://localhost:3000/alunos', body)
  .then(resp => {
    res.status(201).redirect('/alunos');
  })
  .catch(erro => {
    res.status(500).res.render('error', { 'error': erro });
  })
});

router.get('/delete/:id', function(req, res, next) {
  var id = req.params.id
  axios.delete('http://localhost:3000/alunos/'+id)
  .then(resp => {
    res.status(200).redirect('/alunos');
  })
  .catch(erro => {
    res.status(500).res.render('error', { 'error': erro });
  })
});


module.exports = router;
