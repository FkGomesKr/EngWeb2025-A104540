# Resolução do TPC3

### **Data:** 2 de Março de 2025  
### **Autor:**  
![Foto do Autor](https://avatars.githubusercontent.com/u/140913282?v=4)  
- **Nome:** Pedro Miguel Araújo Gomes 
- **Número de Aluno:** A104540

---

## Resumo
Este trabalho consistiu em criar um serviço em **`node.js`**, que faz recurso à API de dados servida pelo **`json-server`** das Informações de Alunos, **`alunos.json`**. O serviço criado responde aos *requests* recebidos com as páginas web do site, (GETs), e através de interações com a *"base de dados"*, (POSTs).

---

### Funcionalidades:
1. Página principal: lista de alunos consultável;
2. Página de alunos: Tabela com a informação dos alunos que permite navegar para a página específica de cada aluno, navegar para a página de edição específica de cada aluno e apagar a informação de cada aluno da base de dados;
3. Página de Edição específica a um aluno: *"Form"* com a informação atual do aluno que permite alterações e posterior atualização na base de dados;
4. Página de registo de aluno: *"Form"* que permite o preenchimento dos atributos que compõem um aluno e posterior registo/adição desse mesmo aluno na base de dados; 
5. "Página" de Remoção específica de um aluno/Funcionalidade de Remoção específica de um aluno: esta "página" apenas realiza um redirecionamento, em termos visuais, para a página de alunos mas informa o sistema que um aluno de certo ID deve ser apagado de base de dados, (essa remoção é imediatamente percetível através do redirecionamento que, em termos visuais, recarrega a página de alunos);

---

## Resultados
O serviço resultante, que se resume ao programa **`alunos_server.js`**, cumpriu as expectativas de navegabilidade, organização e manipulação da base de dados, esperadas do website fazendo recurso ao **`templates.js`** que devolve as páginas html de uma forma mais limpa e organizada e ao **`static.js`** que manipula os recursos estáticos  da aplicação.
Com vista ao consumo da API foi utilizado o *Node module* **`axios`** que coordenou com clareze os metódos GET, POST, PUT e DELETE necessários às funcionalidades da nossa aplicação.
Para além disso, foi utilizado o **`alunos.json`** como a nossa base de dados. Este ficheiro é consequência do **`alunos.csv`**, o original detentor de toda a informação relativa aos alunos, depois da aplicação de um conversor em python, **`csvToJson.py`**.

### Como Executar o Código
1. Certifica-te de que tens `> nodejs v22.0.0`.
2. Certifica-te de que instalas todas as dependências necessárias relativas aos *Node modules*. Podes fazê-lo através do `npm` ou até do `yarn`.
3. Inicializa o `json-server` com o dataset correto:
```
json-server -w .\alunos.json
```
4. Inicializa o teu serviço `Node.js`:
```
node .\alunos_server.js
```
5. Verifica a porta usada no `alunos_server.js` e acede ao website de Gestão de Alunos, `"http://localhost:7777"`.
