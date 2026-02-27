const btn = document.getElementById('botao-pesquisar');
const input = document.getElementById('campo-busca');
const containerResultados = document.getElementById('containerResultados');
const tituloResultado = document.getElementById('tituloResultado');
const card = document.getElementById('card');
const poster = document.getElementById('poster');
const titulo = document.getElementById('titulo');
const ano = document.getElementById('ano');
const genero = document.getElementById('genero');

const API_KEY = 'edda1ba9'; 



async function buscarFilme() {
    const nomeDoFilme = input.value.trim();
    const url = `https://www.omdbapi.com/?t=${encodeURIComponent(nomeDoFilme)}&apikey=${API_KEY}`;

    try {
        const resposta = await fetch(url);
        const dados = await resposta.json(); 

        if (dados.Response === "True") {
            exibirResultudos(dados);
        } else {
            tituloResultado.textContent = `Nenhum resultado encontrado para: ${nomeDoFilme}`;
            containerResultados.innerHTML = ""; // Limpa resultados anteriores
        }
    } catch (erro) {
        console.error("Erro na requisição:", erro);
    }
}

function exibirResultudos(dados) {

    //esta removendo os espaços em branco do início e do fim do título para evitar erros de busca
const tituloFormatado = input.value.trim();
tituloResultado.textContent = `Resultados para: ${tituloFormatado}`;
  //limitar a quantidade de caracteres do título para evitar erros de busca
  dados.array.forEach((filme) =>  {
    
 
  let limite=28;
  let titulo = filme.Title.trim();
    if (titulo.length > limite) {
        titulo = titulo.substring(0, limite) + "...";
    }
  //limpa o container de resultados antes de exibir o novo resultado
    containerResultados.innerHTML = "";
    //cria o card com os dados do filme e insere no container de resultados
    const cardHTML = `
        <div id="card">
            <img id="poster" src="${filme.Poster}" alt="Poster do Filme">
            <h3 id="titulo">${titulo}</h3>
            <p id="ano">Ano: ${filme.Year}</p>
            <p id="genero">Tipo: ${filme.Type === "movie" ? "Filme" : filme.Type}</p>
        </div>
    `;
    //insere o card no container de resultados
    containerResultados.innerHTML += cardHTML; 
 });
}

btn.addEventListener('click', buscarFilme);