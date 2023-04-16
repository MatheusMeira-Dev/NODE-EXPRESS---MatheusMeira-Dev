const alunos = require('./alunos.js');
const express = require('express');


const app = express();
const morgan = require('morgan');

app.use(express.json());
app.use(morgan('combined'));

app.get('/', (req, res) => {
    res.send("Hello World!")
    console . log("Aplicação rodando em http://localhost:3000/")
})

app.get("/alunos", (req, res) => {
    const { nome , media } = req.query;
    console.log(nome, media)

    if(nome === undefined && media === undefined){
        res.json(alunos.alunos)
    } else if(nome === undefined && media) {
        res.json(alunos.filtrarMedia(media))
    } else if (media === undefined && nome) {
        res.json(alunos.filtrarNome(nome))
    }
})

app.post('/alunos/novo', (req, res) => {
    const { nome, media, matricula } = req.body;
    
    if ( nome !== undefined && media !== undefined && matricula !== undefined) {
        res.status(200).json(alunos.buildNovoAluno(nome, media, matricula));
        alunos.gerarDB()
    } else {
      res.status(400).json({ message: "Erro: dados incompletos" });
    }
  });

app.delete("/alunos/:index", (req, res) => {

    const index = Number(req.params.index);
    
    if(index >= 0  && alunos.alunos.length) {
        res.status(200).json(alunos.buildRemoverAluno(index))
        alunos.gerarDB()
    } else {
        res.status(404).json({ message: "Error: aluno não existe ou já removido!"})
    }

})

app.put("/alunos/:index", (req, res,) => {

    const index = Number(req.params.index);
    const { nome, media } = req.body;
    const numeroAlunos = alunos.alunos[index];

    if (numeroAlunos) {
        res.status(200).json(alunos.buildAtualizarAluno(nome, media, index));
        alunos.gerarDB()
    } else {
        res.status(404).json({message: "ERROR: aluno iválido!"})
    }
})

app.listen(3000);
