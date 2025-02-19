import { createServer } from 'http';
import axios from 'axios';
import { readFile } from 'fs';
import { genEscolaMusicaMainPage, genAlunosPage, genCursosPage, genInstrumentosPage, getSingleAlunoPage, getSingleCursoPage, getSingleInstrumentoPage } from './mypages.js'

const PORT = 4321;
const API_URL = 'http://localhost:3000';

createServer((req, res) => {
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    if (req.method === 'GET' && req.url === '/') {
        // PAGINA INICIAL
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        
        res.write(genEscolaMusicaMainPage());

        res.end();
    } else if (req.method === 'GET' && req.url === '/favicon.ico') {
        readFile('music.ico', (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Favicon not found');
            } else {
                res.writeHead(200, { 'Content-Type': 'image/x-icon' });
                res.write(data);
                res.end();
            }
        });
    } else if (req.method === 'GET' && req.url === '/alunos') {
        // PAGINA LISTA DE ALUNOS
        axios.get(API_URL+'/alunos')
            .then(resp => {
                var alunos = resp.data;

                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.write(genAlunosPage(alunos));
                res.end(); 

            })
            .catch(err => {
                console.log('Error:', err);
                res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end("<p>Erro a carregar a pagina da Escola de Música.</p>"); 
            });

    } else if (req.method === 'GET' && req.url === '/cursos') {
        // PAGINA LISTA DE CURSOS
        axios.get(API_URL+'/cursos')
            .then(resp => {
                var cursos = resp.data;

                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.write(genCursosPage(cursos));
                res.end(); 

            })
            .catch(err => {
                console.log('Error:', err);
                res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end("<p>Erro a carregar a pagina da Escola de Música.</p>"); 
            });
    } else if (req.method === 'GET' && req.url === '/instrumentos') {
        // PAGINA LISTA DE INSTRUMENTOS
        axios.get(API_URL+'/instrumentos')
            .then(resp => {
                var instrumentos = resp.data;
                
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });                
                res.write(genInstrumentosPage(instrumentos));
                res.end(); 

            })
            .catch(err => {
                console.log('Error:', err);
                res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end("<p>Erro a carregar a pagina da Escola de Música.</p>"); 
            });

    } else if (req.method === 'GET' && req.url.startsWith("/alunos/")) {
        // PAGINA SINGULAR DO ALUNO
        const alunoID = req.url.split("/")[2];
        axios.get(API_URL+'/alunos/?id='+alunoID)
            .then(resp => {
                var aluno = resp.data[0];
   
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                axios.get("http://localhost:3000/cursos/?id="+aluno.curso).then(resp => {
                    var curso = resp.data[0];
                    res.write(getSingleAlunoPage(aluno, curso));
                    res.end();
                }).catch(err => {
                    console.log('Error:', err);
                    res.end("<p>Erro a carregar aluno.</p>"); 
                });

            }).catch(err => {
                console.log('Error:', err);
                res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end("<p>Erro a carregar a pagina da Escola de Música.</p>"); 
            });
    } else if (req.method === 'GET' && req.url.startsWith("/cursos/")) {
        // PAGINA SINGULAR DO CURSO
        const cursoID = req.url.split("/")[2];
        axios.get(API_URL+'/cursos/?id='+cursoID)
            .then(resp => {
                var curso = resp.data[0];
   
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                axios.get("http://localhost:3000/alunos/?curso="+curso.id).then(resp => {
                    var alunos = resp.data;
                    res.write(getSingleCursoPage(curso, alunos));
                    res.end();
                }).catch(err => {
                    console.log('Error:', err);
                    res.end("<p>Erro a carregar curso.</p>"); 
                });

            }).catch(err => {
                console.log('Error:', err);
                res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end("<p>Erro a carregar a pagina da Escola de Música.</p>"); 
            });
    } else if (req.method === 'GET' && req.url.startsWith("/instrumentos/")) {
        // PAGINA SINGULAR DO INSTRUMENTO
        const instrumentoID = req.url.split("/")[2];
        axios.get(API_URL+'/instrumentos/?id='+instrumentoID)
            .then(resp => {
                var instrumento = resp.data[0];
   
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                axios.get("http://localhost:3000/alunos/?instrumento="+instrumento["#text"]).then(resp => {
                    var alunos = resp.data;
                    res.write(getSingleInstrumentoPage(instrumento, alunos));
                    res.end();
                }).catch(err => {
                    console.log('Error:', err);
                    res.end("<p>Erro a carregar instrumento.</p>"); 
                });

            }).catch(err => {
                console.log('Error:', err);
                res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end("<p>Erro a carregar a pagina da Escola de Música.</p>"); 
            });
    }
     else {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end("<p>Página não encontrada.</p>");
    }

}).listen(PORT);

console.log("Server listening on port 4321...");
