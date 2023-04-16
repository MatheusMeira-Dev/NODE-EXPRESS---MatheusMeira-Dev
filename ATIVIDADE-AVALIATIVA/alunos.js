let alunos = [
    {
        nome: "MatheusMeira",
        media: 4.6,
    }
    ,
    {
        nome: "JulioVerne",
        media: 5.7,
    }
    ,
    {
        nome: "RodrigoFaro",
        media: 2.9,
    }
    ,
    {
        nome: "HarryPotter",
        media: 6.4
    }
];


const fs = require('fs');

function filtrarNome(n) {
    return alunos.find((element) => element.nome === n)
}

function filtrarMedia(m) {
    return alunos.filter((element) => element.media >= Number(m))
}

function buildNovoAluno(nome, media, matricula){
    
    const novoAluno = {
        nome: nome,
        media: media,
        matricula: matricula
      };
      
      alunos.push(novoAluno);

      return (novoAluno);
}

function buildRemoverAluno(index){

    const alunoRemovido = alunos.splice(index,1)
    const mensagem = { message: `Aluno removido com sucesso!`, alunosRemovidos: alunoRemovido }

      return mensagem;
}

function buildAtualizarAluno(nome, media, index){
    
    const alunoAtualizado = alunos.map((el,i) => {
        if(i === index) {
            el.nome = nome 
            el.media = Number(media)
            return el;
        }
        return el;
    })

    const mensagem = {message: "Aluno atualizado!", aluno: alunoAtualizado}

      return mensagem;
}

function gerarDB() {
    return (fs.writeFile("db.json", JSON.stringify(alunos), (err) => {
        if (err) {
          console.error(err);
          res.status(500).json({ message: "Erro ao escrever arquivo" });
        } else {
          console.log(`Arquivo db.json atualizado`);
          res.status(200).json({ message: "Arquivo atualizado!" });
        }
      })
    );
}

module.exports = {
    alunos,
    filtrarNome,
    filtrarMedia,
    buildNovoAluno,
    buildAtualizarAluno,
    buildRemoverAluno,
    gerarDB
    }