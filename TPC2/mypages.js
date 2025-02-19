export function genEscolaMusicaMainPage() {
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Escola de Música</title>
        </head>
        <body>
            <h1 style=\"text-align:center; font-size:50px;font-family:Arial, sans-serif;\">
                Escola de Música
            </h1>
            <div style=\"width:full; display:flex; gap: 20px; justify-content: center; align-items: center;\">
                <a style=\"width:30%;\" href=\"http://localhost:4321/alunos\">
                    <button style=\"width:100%; padding: 12px 0px; background-color: purple; border:none; border-radius: 10px; color:white; cursor:pointer;\">
                        Lista de Alunos
                    </button>
                </a>
                <a style=\"width:30%;\" href=\"http://localhost:4321/cursos\">
                    <button style=\"width:100%; padding: 12px 0px; background-color: purple; border:none; border-radius: 10px; color:white; cursor:pointer;\">
                        Lista de Cursos
                    </button>
                </a>
                <a style=\"width:30%;\" href=\"http://localhost:4321/instrumentos\">
                    <button style=\"width:100%; padding: 12px 0px; background-color: purple; border:none; border-radius: 10px; color:white; cursor:pointer;\">
                        Lista de Instrumentos
                    </button>
                </a>
            </div>
        </body>
    </html>
    `
    return pagHTML
}

export function genAlunosPage(alunos){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Escola de Música</title>
        </head>
        <body>
            <h1 style=\"text-align:center; font-size:50px;font-family:Arial, sans-serif;\">
                Escola de Música
            </h1>
            <p><a href=\"http://localhost:4321\">
                Voltar atrás
            </a></p>
            <h1 style=\"text-align:center; width:100%;\">
                Lista de Alunos
            </h1>
            <div style="display: flex; justify-content: center; margin-top: 20px;">
                <table style="border-collapse: collapse; width: 80%; background-color: #f8f9fa; border: 2px solid #ddd;">
                    <tr style="background-color: purple; color: white;">
                        <th style="text-align: center; padding: 10px; border: 1px solid #ddd;">Id Aluno</th>
                        <th style="text-align: center; padding: 10px; border: 1px solid #ddd;">Nome</th>
                        <th style="text-align: center; padding: 10px; border: 1px solid #ddd;">Curso</th>
                        <th style="text-align: center; padding: 10px; border: 1px solid #ddd;">Ano Curso</th>
                    </tr>
                    `
                alunos.forEach(aluno => {
                    pagHTML += `
                    <tr style="background-color: white; color: black; cursor: pointer; transition: all 0.2s ease-in-out;\"
                        onclick="window.location.href='http://localhost:4321/alunos/${aluno.id}'"
                        onmouseover="this.style.backgroundColor='#c0c0c0'"
                        onmouseout="this.style.backgroundColor='white'">
                        <td style="text-align: center; padding: 10px; border: 1px solid #ddd;">${aluno.id}</td>
                        <td style="text-align: center; padding: 10px; border: 1px solid #ddd;">${aluno.nome}</td>
                        <td style="text-align: center; padding: 10px; border: 1px solid #ddd;">${aluno.curso}</td>
                        <td style="text-align: center; padding: 10px; border: 1px solid #ddd;">${aluno.anoCurso}</td>
                    </tr>
                    `
                });

            pagHTML += `  
                </table>
            </div>
        </body>
    </html>
    `
    return pagHTML
}

export function genCursosPage(cursos){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Escola de Música</title>
        </head>
        <body>
            <h1 style=\"text-align:center; font-size:50px;font-family:Arial, sans-serif;\">
                Escola de Música
            </h1>
            <p><a href=\"http://localhost:4321\">
                Voltar atrás
            </a></p>
            <h1 style=\"text-align:center; width:100%;\">
                Lista de Cursos
            </h1>
            <div style="display: flex; justify-content: center; margin-top: 20px;">
                <table style="border-collapse: collapse; width: 80%; background-color: #f8f9fa; border: 2px solid #ddd;">
                    <tr style="background-color: purple; color: white;">
                        <th style="text-align: center; padding: 10px; border: 1px solid #ddd;">Id Curso</th>
                        <th style="text-align: center; padding: 10px; border: 1px solid #ddd;">Designação</th>
                        <th style="text-align: center; padding: 10px; border: 1px solid #ddd;">Duração</th>
                    </tr>
                    `
                cursos.forEach(curso => {
                    pagHTML += `
                    <tr style="background-color: white; color: black; cursor: pointer; transition: all 0.2s ease-in-out;\"
                        onclick="window.location.href='http://localhost:4321/cursos/${curso.id}'"
                        onmouseover="this.style.backgroundColor='#c0c0c0'"
                        onmouseout="this.style.backgroundColor='white'">
                        <td style="text-align: center; padding: 10px; border: 1px solid #ddd;">${curso.id}</td>
                        <td style="text-align: center; padding: 10px; border: 1px solid #ddd;">${curso.designacao}</td>
                        <td style="text-align: center; padding: 10px; border: 1px solid #ddd;">${curso.duracao} Anos</td>
                    </tr>
                    `
                });

            pagHTML += `  
                </table>
            </div>
        </body>
    </html>
    `
    return pagHTML
}

export function genInstrumentosPage(instrumentos){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Escola de Música</title>
        </head>
        <body>
            <h1 style=\"text-align:center; font-size:50px;font-family:Arial, sans-serif;\">
                Escola de Música
            </h1>
            <p><a href=\"http://localhost:4321\">
                Voltar atrás
            </a></p>
            <h1 style=\"text-align:center; width:100%;\">
                Lista de Instrumentos
            </h1>
            <div style="display: flex; justify-content: center; margin-top: 20px;">
                <table style="border-collapse: collapse; width: 80%; background-color: #f8f9fa; border: 2px solid #ddd;">
                    <tr style="background-color: purple; color: white;">
                        <th style="text-align: center; padding: 10px; border: 1px solid #ddd;">Id Instrumento</th>
                        <th style="text-align: center; padding: 10px; border: 1px solid #ddd;">Nome</th>
                    </tr>
                    `
                instrumentos.forEach(instrumento => {
                    pagHTML += `
                    <tr style="background-color: white; color: black; cursor: pointer; transition: all 0.2s ease-in-out;\"
                        onclick="window.location.href='http://localhost:4321/instrumentos/${instrumento.id}'"
                        onmouseover="this.style.backgroundColor='#c0c0c0'"
                        onmouseout="this.style.backgroundColor='white'">
                        <td style="text-align: center; padding: 10px; border: 1px solid #ddd;">${instrumento.id}</td>
                        <td style="text-align: center; padding: 10px; border: 1px solid #ddd;">${instrumento["#text"]}</td>
                    </tr>
                    `
                });

            pagHTML += `  
                </table>
            </div>
        </body>
    </html>
    `
    return pagHTML
}

export function getSingleAlunoPage(aluno, curso){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Escola de Música</title>
        </head>
        <body>
            <h1 style=\"text-align:center; font-size:50px;font-family:Arial, sans-serif;\">
                Escola de Música
            </h1>
            <p><a href=\"http://localhost:4321/alunos\">
                Voltar atrás
            </a></p>
            <h1 style=\"text-align:center; width:100%;\">
                ${aluno.id} - ${aluno.nome}
            </h1>
            <ul>
                <li>Nascido a ${aluno.dataNasc}</li>
                <li>Toca ${aluno.instrumento}</li>
                `
            if (curso) {
                pagHTML += `
                <li>Está no ${aluno.anoCurso}º ano do ${curso.designacao} que tem duração de ${curso.duracao} anos</li>
            </ul>
        </body>
    </html>
        `
            } else {

            pagHTML += `
            </ul>
            <p>
                De momento a informação sobre o curso do aluno não consta nos registos da Escola...
            </p>
        </body>
    </html>
    `
    } 
    return pagHTML
}

export function getSingleCursoPage(curso, alunos){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Escola de Música</title>
        </head>
        <body>
            <h1 style=\"text-align:center; font-size:50px;font-family:Arial, sans-serif;\">
                Escola de Música
            </h1>
            <p><a href=\"http://localhost:4321/cursos\">
                Voltar atrás
            </a></p>
            <h1 style=\"text-align:center; width:100%;\">
                ${curso.id} - ${curso.designacao}
            </h1>
            <p style=\"width:100%; text-align:center;\">
                Este curso tem uma duração de ${curso.duracao} anos onde os alunos desenvolvem as suas competências musicais de ${curso.instrumento["#text"]}.
            </p>
            `
            if (alunos.length != 0) {
            pagHTML += `
            <h1 style=\"width:100%; text-align:center;\">
                De seguida, constam todos os alunos pertencentes ao curso:
            </h1> 
            <div style="display: flex; justify-content: center; margin-top: 20px;">
                <table style="border-collapse: collapse; width: 80%; background-color: #f8f9fa; border: 2px solid #ddd;">
                    <tr style="background-color: purple; color: white;">
                        <th style="text-align: center; padding: 10px; border: 1px solid #ddd;">Id Aluno</th>
                        <th style="text-align: center; padding: 10px; border: 1px solid #ddd;">Nome</th>
                        <th style="text-align: center; padding: 10px; border: 1px solid #ddd;">Curso</th>
                        <th style="text-align: center; padding: 10px; border: 1px solid #ddd;">Ano Curso</th>
                    </tr>
                    `
                alunos.forEach(aluno => {
                    pagHTML += `
                    <tr style="background-color: white; color: black; cursor: pointer; transition: all 0.2s ease-in-out;\"
                        onclick="window.location.href='http://localhost:4321/alunos/${aluno.id}'"
                        onmouseover="this.style.backgroundColor='#c0c0c0'"
                        onmouseout="this.style.backgroundColor='white'">
                        <td style="text-align: center; padding: 10px; border: 1px solid #ddd;">${aluno.id}</td>
                        <td style="text-align: center; padding: 10px; border: 1px solid #ddd;">${aluno.nome}</td>
                        <td style="text-align: center; padding: 10px; border: 1px solid #ddd;">${aluno.curso}</td>
                        <td style="text-align: center; padding: 10px; border: 1px solid #ddd;">${aluno.anoCurso}</td>
                    </tr>
                    `
                });
                

            pagHTML += `  
                </table>
            </div>
        </body>
    </html>
    `
            } else {
                pagHTML += `
                    <h1 style=\"width:100%; text-align:center;\">
                       Não existe nenhum aluno a frequentar este curso de momento.
                    </h1> 
                </body>
            </html>
            `
            }
    return pagHTML
}

export function getSingleInstrumentoPage(instrumento, alunos){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Escola de Música</title>
        </head>
        <body>
            <h1 style=\"text-align:center; font-size:50px;font-family:Arial, sans-serif;\">
                Escola de Música
            </h1>
            <p><a href=\"http://localhost:4321/instrumentos\">
                Voltar atrás
            </a></p>
            <h1 style=\"text-align:center; width:100%;\">
                ${instrumento.id} - ${instrumento["#text"]}
            </h1>
            `
            if (alunos.length != 0) {
            pagHTML += `
            <h1 style=\"width:100%; text-align:center;\">
                De seguida, constam todos os alunos que tocam ${instrumento["#text"]}:
            </h1> 
            <div style="display: flex; justify-content: center; margin-top: 20px;">
                <table style="border-collapse: collapse; width: 80%; background-color: #f8f9fa; border: 2px solid #ddd;">
                    <tr style="background-color: purple; color: white;">
                        <th style="text-align: center; padding: 10px; border: 1px solid #ddd;">Id Aluno</th>
                        <th style="text-align: center; padding: 10px; border: 1px solid #ddd;">Nome</th>
                        <th style="text-align: center; padding: 10px; border: 1px solid #ddd;">Curso</th>
                        <th style="text-align: center; padding: 10px; border: 1px solid #ddd;">Ano Curso</th>
                    </tr>
                    `
                alunos.forEach(aluno => {
                    pagHTML += `
                    <tr style="background-color: white; color: black; cursor: pointer; transition: all 0.2s ease-in-out;\"
                        onclick="window.location.href='http://localhost:4321/alunos/${aluno.id}'"
                        onmouseover="this.style.backgroundColor='#c0c0c0'"
                        onmouseout="this.style.backgroundColor='white'">
                        <td style="text-align: center; padding: 10px; border: 1px solid #ddd;">${aluno.id}</td>
                        <td style="text-align: center; padding: 10px; border: 1px solid #ddd;">${aluno.nome}</td>
                        <td style="text-align: center; padding: 10px; border: 1px solid #ddd;">${aluno.curso}</td>
                        <td style="text-align: center; padding: 10px; border: 1px solid #ddd;">${aluno.anoCurso}</td>
                    </tr>
                    `
                });
                

            pagHTML += `  
                </table>
            </div>
        </body>
    </html>
    `
            } else {
                pagHTML += `
                    <h1 style=\"width:100%; text-align:center;\">
                       Não existe nenhum aluno que toque ${instrumento["#text"]} de momento.
                    </h1> 
                </body>
            </html>
            `
            }
    return pagHTML
}