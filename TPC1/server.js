import { createServer } from 'http';
import axios from 'axios';

const PORT = 4321;
const API_URL = 'http://localhost:3000';

createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const nif = url.searchParams.get('nif'); 
    const data = url.searchParams.get('data'); 

    if (req.method === 'GET' && req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        
        res.write("<h1 style=\"text-align:center; font-size:50px;font-family:Arial, sans-serif;\">Oficina do Gomes</h1>");
        res.write("<ul><li><a href=\"http://localhost:4321/reparacoes\">Lista de Reparações</a></li><li style=\"padding:10px 0px;\"><a href=\"http://localhost:4321/carros\">Lista de Veículos intervencionados</a></li><li><a href=\"http://localhost:4321/intervencoes\">Lista de Tipos de intervenção</a></li></ul>")
        
        res.end(); 
    } else if (req.method === 'GET' && req.url === '/reparacoes') {
        axios.get(API_URL+'/reparacoes')
            .then(resp => {
                var reparacoes = resp.data;

                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.write("<h1 style=\"text-align:center; font-size:50px;font-family:Arial, sans-serif;\">Oficina do Gomes</h1>");
                res.write("<p><a href=\"http://localhost:4321\">Voltar atrás</a></p>")
                res.write("<h1>Lista de Reparações</h1>")
                res.write("<ol>");

                reparacoes.forEach(element => {
                    res.write("<li><a href=\"http://localhost:4321/reparacoes/?nif="+element.nif+"&data="+element.data+"\">Reparação resumida de um " + element.marca + " - " + element.modelo + "</a></li>");
                    res.write("<ul style=\"width: fit-content; padding-right:25px; background-color:gray;margin-bottom:10px;\">");
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

    } else if (req.method === 'GET' && nif && data && req.url.includes("/reparacoes/")) {
        axios.get(API_URL+'/reparacoes/?nif='+nif+'&data='+data)
            .then(resp => {
                var reparacao = resp.data[0];

                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.write("<h1 style=\"text-align:center; font-size:50px;font-family:Arial, sans-serif;\">Oficina do Gomes</h1>");
                res.write("<h1>Reparação detalhada do " + reparacao.marca + " - " + reparacao.modelo + ":</h1>");
                res.end();

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
