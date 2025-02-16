# Resolução do TPC1

### **Data:** 16 de Fevereiro de 2025  
### **Autor:**  
![Foto do Autor](https://avatars.githubusercontent.com/u/140913282?v=4)  
- **Nome:** Pedro Miguel Araújo Gomes 
- **Número de Aluno:** A104540

---

## Resumo
Este trabalho consistiu em criar um serviço em **`node.js`**, que faz recurso à API de dados servida pelo **`json-server`** da oficina de reparações, (**`"serverDB.json"`**). O serviço criado responde aos *requests* recebidos com as páginas web do site.

### Funcionalidades:
1. Página principal: listas de dados consultáveis;
2. Listagem das reparações: Data, nif, nome, marca, modelo, número de intervenções realizadas;
3. Listagem dos tipos de intervenção: lista alfabética de código das intervenções - código, nome e descrição;
4. Listagem das marcas e modelos dos carros intervencionados: lista alfabética das marcas e modelos dos carros reparados - marca, modelo, número de carros;
5. Página da Reparação: página com toda a informação de uma reparação;
6. Página do tipo de intervenção: dados da intervenção (código, nome e descrição) e lista de reparações onde foi realizada;
7. Página da marca/modelo: dados do tipo de carro reparado e lista de reparações em carros desse tipo.

---

## Resultados
O serviço resultante, que se ao programa **`server.js`**, cumpriu as expectativas de navegabilidade, organização/gestão e eficiência do website esperado.
Com vista ao consumo da API foi utilizado o *Node module* **`axios`**.
Para além disso, de forma a utilizar uma base de dados em **`json`** que funcionasse de forma eficiente e facilmente manipulável com o **`json-server`**, foi gerado um novo ficheiro **`json`** para servir de base de dados da nossa *Oficina*. Para este efeito foi criado *um script* em python capaz de manipular os dados do ""`dataset_reparacoes.json`"" e gerar o ""`serverDB.json`**.



### Como Executar o Código
1. Certifica-te de que tens `> nodejs v22.0.0`.
2. Certifica-te de que instalas todas as dependências necessárias relativas aos *Node modules*. Podes fazê-lo através do `npm` ou até do `yarn`.
3. Inicializa o `json-server` com o dataset correto:
```bash
json-server --watch .\serverDB.json
```
4. Inicializa o teu serviço `Node.js`:
```bash
node .\server.js
```
5. Verifica a porta usada no `server.js` e acede ao website da oficina, `"http://localhost:4321"`.
