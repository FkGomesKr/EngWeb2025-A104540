import { createServer } from 'http';
import axios from 'axios';

const PORT = 4321;
const API_URL = 'http://localhost:3000';

createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);

    //single reparacao
    const nif = url.searchParams.get('nif'); 
    const data = url.searchParams.get('data');

    //single intervencao
    const codigo = url.searchParams.get('codigo');

    //single carro intervencionado
    const marca = url.searchParams.get('marca');
    const modelo = url.searchParams.get('modelo');

    if (req.method === 'GET' && req.url === '/') {
        // PAGINA INICIAL
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        
        res.write("<h1 style=\"text-align:center; font-size:50px;font-family:Arial, sans-serif;\">Oficina do Gomes</h1>");
        res.write("<ul>")
        
        res.write("<li><a href=\"http://localhost:4321/reparacoes\">Lista de Reparações</a></li>")
        res.write("<li style=\"padding:10px 0px;\"><a href=\"http://localhost:4321/carros\">Lista de Veículos intervencionados</a></li>")
        res.write("<li><a href=\"http://localhost:4321/intervencoes\">Lista de Tipos de intervenção</a></li>")

        res.write("</ul>")
        res.end(); 
    } else if (req.method === 'GET' && req.url === '/reparacoes') {
        // PAGINA LISTA DE REPARACOES
        axios.get(API_URL+'/reparacoes')
            .then(resp => {
                var reparacoes = resp.data;

                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.write("<h1 style=\"text-align:center; font-size:50px;font-family:Arial, sans-serif;\">Oficina do Gomes</h1>");
                res.write("<p><a href=\"http://localhost:4321\">Voltar atrás</a></p>")
                res.write("<h1>Lista de Reparações</h1>")
                res.write("<ol>");

                reparacoes.forEach(element => {
                    res.write("<li><a href=\"http://localhost:4321/reparacoes/?nif="+element.nif+"&data="+element.data+"\">Reparação resumida de um " + element.viatura.marca + " - " + element.viatura.modelo + "</a></li>");
                    res.write("<ul style=\"width: fit-content; color:white; padding-right:25px; background-color:gray;margin-bottom:20px;\">");
                    res.write("<li>Realizada em: " + element.data + "</li>");
                    res.write("<li>Cliente: " + element.nome + "</li>");
                    res.write("<li>NIF do Cliente: " + element.nif + "</li>");
                    res.write("<li>Número de intervenções realizadas: " + element.nr_intervencoes + "</li>");
                    res.write("</ul>");
                });

                res.write("</ol>");
                res.end(); 

            })
            .catch(err => {
                console.log('Error:', err);
                res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end("<p>Erro a carregar a pagina da oficina.</p>"); 
            });

    } else if (req.method === 'GET' && req.url === '/carros') {
        // PAGINA LISTA DE VEICULOS INTERVENCIONADOS
        axios.get(API_URL+'/carros')
            .then(resp => {
                var reparacoes = resp.data;

                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.write("<h1 style=\"text-align:center; font-size:50px;font-family:Arial, sans-serif;\">Oficina do Gomes</h1>");
                res.write("<p><a href=\"http://localhost:4321\">Voltar atrás</a></p>")
                res.write("<h1>Lista de Veículos intervencionados</h1>")
                res.write("<ol>");

                reparacoes.forEach(element => {
                    res.write("<li><a href=\"http://localhost:4321/carros/?marca="+element.marca+"&modelo="+element.modelo+"\">" + element.marca + " - " + element.modelo + "</a></li>");
                    res.write("<ul style=\"margin-bottom:20px;\">");
                    res.write("<li>Foram intervencionados " + element.nr_carros + " até ao momento.</li>");
                    res.write("</ul>");
                });

                res.write("</ol>");
                res.end(); 

            })
            .catch(err => {
                console.log('Error:', err);
                res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end("<p>Erro a carregar a pagina da oficina.</p>"); 
            });
    } else if (req.method === 'GET' && req.url === '/intervencoes') {
        // PAGINA LISTA DE TIPOS DE INTERVENCOES
        axios.get(API_URL+'/intervencoes')
            .then(resp => {
                var reparacoes = resp.data;

                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.write("<h1 style=\"text-align:center; font-size:50px;font-family:Arial, sans-serif;\">Oficina do Gomes</h1>");
                res.write("<p><a href=\"http://localhost:4321\">Voltar atrás</a></p>")
                res.write("<h1>Lista de Tipos de intervenção</h1>")
                res.write("<ol>");

                reparacoes.forEach(element => {
                    res.write("<li><a href=\"http://localhost:4321/intervencoes/?codigo="+element.codigo+"\">Intervenção " + element.codigo + " - " + element.nome + "</a></li>");
                    res.write("<ul style=\"width:50%;margin-bottom:20px;\">");
                    res.write("<li>" + element.descricao + "</li>");
                    res.write("</ul>");
                });

                res.write("</ol>");
                res.end(); 

            })
            .catch(err => {
                console.log('Error:', err);
                res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end("<p>Erro a carregar a pagina da oficina.</p>"); 
            });

    } else if (req.method === 'GET' && nif && data && req.url.includes("/reparacoes/")) {
        // PAGINA DE REPARACAO SINGULAR DETALHADA
        axios.get(API_URL+'/reparacoes/?nif='+nif+'&data='+data)
            .then(resp => {
                var reparacao = resp.data[0];

                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.write("<h1 style=\"text-align:center; font-size:50px;font-family:Arial, sans-serif;\">Oficina do Gomes</h1>");
                res.write("<p><a href=\"http://localhost:4321/reparacoes\">Voltar atrás</a></p>")
                res.write("<h1>Reparação detalhada de um " + reparacao.viatura.marca + " - " + reparacao.viatura.modelo + ":</h1>");
                res.write("<ul>");
                res.write("<li>Realizada em: " + reparacao.data + "</li>");
                res.write("<li>Matrícula: " + reparacao.viatura.matricula + "</li>");
                res.write("<li>Cliente: " + reparacao.nome + "</li>");
                res.write("<li>NIF do Cliente: " + reparacao.nif + "</li>");
                if (reparacao.nr_intervencoes == 1) {
                    res.write("<li>Foi realizada 1 intervenção: </li>");
                } else {
                    res.write("<li>Foram realizadas " + reparacao.nr_intervencoes + " intervenções:</li>");
                }
                res.write("</ul>");
                res.write("<ol>");
                reparacao.intervencoes.forEach(intervencao => {
                    res.write("<li style=\"margin-bottom:20px;\"><p style=\"font-weight:bold;\">Intervenção: " + intervencao.nome + " - " + intervencao.codigo + "</p>");
                    res.write("<p style=\"width:100%\">" + intervencao.descricao + "</p></li>");
                });
                res.write("</ol>");
                res.end();

            }).catch(err => {
                console.log('Error:', err);
                res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end("<p>Erro a carregar a pagina da oficina.</p>"); 
            });
    } else if (req.method === 'GET' && codigo && req.url.includes("/intervencoes/")) {
        // PAGINA DE INTERVENCAO SINGULAR E REPARACOES EM QUE FOI EXECUTADA
        axios.get(API_URL+'/intervencoes/?codigo='+codigo)
            .then(resp => {
                var intervencao = resp.data[0];

                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.write("<h1 style=\"text-align:center; font-size:50px;font-family:Arial, sans-serif;\">Oficina do Gomes</h1>");
                res.write("<p><a href=\"http://localhost:4321/intervencoes\">Voltar atrás</a></p>")
                res.write("<h1>Intervenção " + intervencao.codigo + " - " + intervencao.nome + ":</h1>");
                res.write("<p style=\"margin-left:20px\">" + intervencao.descricao + "</p>");

                axios.get("http://localhost:3000/reparacoes/").then(resp => {
                    var matchingReparacoes = resp.data.filter(reparacao => 
                        reparacao.intervencoes.some(intervencao => intervencao.codigo === codigo)
                    );
                    res.write("<p>A intervenção foi realizada em todas as reparações seguintes:</p>");
                    res.write("<ol>");
                    matchingReparacoes.forEach(reparacao => {
                        res.write("<li><a href=\"http://localhost:4321/reparacoes/?nif="+reparacao.nif+"&data="+reparacao.data+"\">Reparação resumida de um " + reparacao.viatura.marca + " - " + reparacao.viatura.modelo + "</a></li>");
                        res.write("<ul style=\"width: fit-content; color:white; padding-right:25px; background-color:gray;margin-bottom:20px;\">");
                        res.write("<li>Realizada em: " + reparacao.data + "</li>");
                        res.write("<li>Cliente: " + reparacao.nome + "</li>");
                        res.write("<li>NIF do Cliente: " + reparacao.nif + "</li>");
                        res.write("<li>Número de intervenções realizadas: " + reparacao.nr_intervencoes + "</li>");
                        res.write("</ul>");
                    });
                    res.write("</ol>");
                
                    res.end();

                }).catch(err => {
                    console.log('Error:', err);
                    res.end("<p>Erro a carregar reparacoes.</p>"); 
                });
            }).catch(err => {
                console.log('Error:', err);
                res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end("<p>Erro a carregar a pagina da oficina.</p>"); 
            });
    } else if (req.method === 'GET' && marca && modelo && req.url.includes("/carros/")) {
        // PAGINA DE VEICULO SINGULAR E REPARACOES FEITAS A VEICULOS IGUAIS
        axios.get(API_URL+'/carros/?marca='+marca+'&modelo='+modelo)
            .then(resp => {
                var carro = resp.data[0];

                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.write("<h1 style=\"text-align:center; font-size:50px;font-family:Arial, sans-serif;\">Oficina do Gomes</h1>");
                res.write("<p><a href=\"http://localhost:4321/carros\">Voltar atrás</a></p>")
                res.write("<h1>Veiculo " + carro.marca + " - " + carro.modelo + ":</h1>");
                
                if (carro.nr_carros == 1) {
                    res.write("<p style=\"margin-left:20px\">Foi intervencionado 1 veículo deste tipo, segue na reparação seguinte:</p>");
                } else {
                    res.write("<p style=\"margin-left:20px\">Foi intervencionados " + carro.nr_carros + " veículos deste tipo, seguem nas reparações seguintes:</p>");
                }

                axios.get("http://localhost:3000/reparacoes/?viatura.marca="+marca+"&viatura.modelo="+modelo).then(resp => {
                    var matchingReparacoes = resp.data;

                    res.write("<ol>"); 
                    matchingReparacoes.forEach(reparacao => {
                        res.write("<li><a href=\"http://localhost:4321/reparacoes/?nif="+reparacao.nif+"&data="+reparacao.data+"\">Reparação resumida de um " + reparacao.viatura.marca + " - " + reparacao.viatura.modelo + "</a></li>");
                        res.write("<ul style=\"width: fit-content; color:white; padding-right:25px; background-color:gray;margin-bottom:20px;\">");
                        res.write("<li>Realizada em: " + reparacao.data + "</li>");
                        res.write("<li>Cliente: " + reparacao.nome + "</li>");
                        res.write("<li>NIF do Cliente: " + reparacao.nif + "</li>");
                        res.write("<li>Número de intervenções realizadas: " + reparacao.nr_intervencoes + "</li>");
                        res.write("</ul>");
                    });
                    res.write("</ol>");
                
                    res.end();

                }).catch(err => {
                    console.log('Error:', err);
                    res.end("<p>Erro a carregar reparacoes.</p>"); 
                });
            }).catch(err => {
                console.log('Error:', err);
                res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end("<p>Erro a carregar a pagina da oficina.</p>"); 
            });
    }
     else {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end("<p>Página não encontrada.</p>");
    }

}).listen(PORT);

console.log("Server listening on port 4321...");
