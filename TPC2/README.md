# Resolução do TPC1

### **Data:** 19 de Fevereiro de 2025  
### **Autor:**  
![Foto do Autor](https://avatars.githubusercontent.com/u/140913282?v=4)  
- **Nome:** Pedro Miguel Araújo Gomes 
- **Número de Aluno:** A104540

---

## Resumo
Este trabalho consistiu em criar um serviço em **`node.js`**, que faz recurso à API de dados servida pelo **`json-server`** da Escola de Música, (**`"db.json"`**). O serviço criado responde aos *requests* recebidos com as páginas web do site.

### Funcionalidades:
1. Página principal: listas de dados consultáveis, (Listar Cursos, Listar Instrumentos);
2. Página de alunos: Tabela com a informação dos alunos que permite navegar para a página específica de cada aluno;
3. Página de cursos: Tabela com a informação dos cursos que permite navegar para a página específica de cada curso;
4. Página de instrumentos: Tabela com a informação dos instrumentos que permite navegar para a página específica de cada instrumento; 
5. Página do aluno: página com toda a informação de um aluno;
6. Página do curso: informação do curso e lista de todos os alunos que o frequentam;
7. Página do instrumento: informação do instrumento e lista de todos os alunos que o tocam.

---

## Resultados
O serviço resultante, que se resume ao programa **`server.js`**, cumpriu as expectativas de navegabilidade, organização/gestão e eficiência esperadas do website fazendo recurso ao **`mypages.js`** que devolve as páginas html de uma forma mais limpa e organizada.
Com vista ao consumo da API foi utilizado o *Node module* **`axios`**.
Para além disso, foi utilizado o **`db.json`** como a nossa base de dados. Apesar de ter algumas inconsistências, o serviço foi preparado para lidar com essas falhas. 


### Como Executar o Código
1. Certifica-te de que tens `> nodejs v22.0.0`.
2. Certifica-te de que instalas todas as dependências necessárias relativas aos *Node modules*. Podes fazê-lo através do `npm` ou até do `yarn`.
3. Inicializa o `json-server` com o dataset correto:
```bash
json-server --watch .\db.json
```
4. Inicializa o teu serviço `Node.js`:
```bash
node .\server.js
```
5. Verifica a porta usada no `server.js` e acede ao website da Escola de Música, `"http://localhost:4321"`.
