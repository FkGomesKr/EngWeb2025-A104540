import { createServer } from 'http';
import axios from 'axios';
import { parse } from 'querystring';

import templates, { studentFormEditPage, studentFormPage, studentPage } from './templates.js';
import { staticResource, serveStaticResource } from './static.js';            
import studentsListPage from './templates.js';

const PORT = 7777;
const API_URL = 'http://localhost:3000';

function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

var alunosServer = createServer((req, res) => {
    // Logger: what was requested and when it was requested
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Handling request
    if(staticResource(req)){
        serveStaticResource(req, res)
    }
    else{
        switch(req.method){
            case "GET": 
                if (req.url === "/") {
                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                    res.end(`Initial Page of Alunos Server, ${d}`); 
                }
                else if (req.url === "/alunos") {
                    axios.get(API_URL+'/alunos')
                        .then(resp => {
                            var alunos = resp.data;
                            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                            res.write(studentsListPage(alunos, d));
                            res.end(); 
                        })
                        .catch(err => {
                            console.log('Error:', err);
                            res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
                            res.end("<p>Erro a carregar a pagina da lista de alunos.</p>"); 
                        });

                } else if (req.url === "/alunos/registo") {

                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                    res.write(studentFormPage(d));
                    res.end(); 

                } else if (req.url.startsWith("/alunos/edit/")) {
                    const id = req.url.split("/")[3];

                    axios.get(`${API_URL}/alunos/${id}`)
                        .then(resp => {
                            var aluno = resp.data;
                            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                            res.write(studentFormEditPage(aluno, d));
                            res.end(); 
                        })
                        .catch(err => {
                            console.log('Error:', err);
                            res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
                            res.end(`<p>Erro a carregar a pagina de edição de um aluno específico de id: ${id}.</p>`); 
                        });
                        
                } else if (req.url.startsWith("/alunos/")) {
                    const id = req.url.split("/")[2];

                    axios.get(`${API_URL}/alunos/${id}`)
                        .then(resp => {
                            var aluno = resp.data;
                            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                            res.write(studentPage(aluno, d));
                            res.end(); 
                        })
                        .catch(err => {
                            console.log('Error:', err);
                            res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
                            res.end(`<p>Erro a carregar a pagina de um aluno específico de id: ${id}.</p>`); 
                        });
                }
               
                // GET /alunos/delete/:id --------------------------------------------------------------------
                
                // GET ? -> Lancar um erro
                break
            case "POST":
                if (req.url === "/alunos/registo") {
                    collectRequestBodyData(req, result => {
                        if (result) {
                            const newStudent = {
                                id: result.id,
                                name: result.nome,
                                gitlink: result.gitlink
                            };
            
                            for (let i = 1; i <= 8; i++) {
                                const key = `tpc${i}`;
                                if (result[key]) {
                                    newStudent[key] = true;
                                }
                            }
            
                            axios.post(`${API_URL}/alunos`, newStudent)
                                .then(() => {
                                    res.writeHead(302, { Location: "/alunos" });
                                    res.end();
                                })
                                .catch(err => {
                                    console.log("Error saving student:", err);
                                    res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
                                    res.end("<p>Error registering student.</p>");
                                });
                        } else {
                            res.writeHead(400, { 'Content-Type': 'text/html; charset=utf-8' });
                            res.end("<p>Invalid form submission.</p>");
                        }
                    });
                } else if (req.url.startsWith("/alunos/edit/")) {
                    collectRequestBodyData(req, result => {
                        if (result) {
                            const updatedStudent = {
                                id: result.id,
                                name: result.nome,
                                gitlink: result.gitlink
                            };
            
                            for (let i = 1; i <= 8; i++) {
                                const key = `tpc${i}`;
                                if (result[key]) {
                                    updatedStudent[key] = true;
                                }
                            }
            
                            axios.put(`${API_URL}/alunos/${updatedStudent.id}`, updatedStudent)
                                .then(() => {
                                    res.writeHead(302, { Location: "/alunos" });
                                    res.end();
                                })
                                .catch(err => {
                                    console.log("Error saving student:", err);
                                    res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
                                    res.end("<p>Error updating student.</p>");
                                });
                        } else {
                            res.writeHead(400, { 'Content-Type': 'text/html; charset=utf-8' });
                            res.end("<p>Invalid form submission.</p>");
                        }
                    });
                }

                // POST ? -> Lancar um erro
                
            default: 
                // Outros metodos nao sao suportados
        }
    }
})

alunosServer.listen(PORT, ()=>{
    console.log(`Servidor http://localhost:${PORT}`)
})



