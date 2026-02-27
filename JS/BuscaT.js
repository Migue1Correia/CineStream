const API_KEY = 'edda1ba9'; 

let historicoFilmes = [];
async function buscarFilme(nomeDoFilme) {
    // O nomeDoFilme passa pelo "tradutor" antes de virar URL
    const url = `https://www.omdbapi.com/?apikey=${API_KEY}&t=${encodeURIComponent(nomeDoFilme)}`;

    try {
        const resposta = await fetch(url);
        const dados = await resposta.json(); 

        if (dados.Response === "True") {
            
            const filmeFormatado = {
                "Titulo": dados.Title,
                "Ano": dados.Year,
                "imdbID": dados.imdbID,
                "Tipo": dados.Type === "movie" ? "Filme" : dados.Type,
                "Poster": dados.Poster
            };

            // Adiciona o novo filme no INÍCIO da lista
            historicoFilmes.unshift(filmeFormatado);

            // Se a lista tiver mais de 5, remove o último (o mais antigo)
            if (historicoFilmes.length > 5) {
                historicoFilmes.pop();
            }
            exibirNoHTML(filmeFormatado);
        } else {
            console.log("Filme não encontrado.");
        }
    } catch (erro) {
        console.error("Erro na requisição:", erro);
    }
}

function exibirHistoricoNoHTML(filme) {
    const grid = document.getElementById('resultados');
    
   grid.innerHTML="";
   historicoFilmes.forEach(filme =>{
   grid.innerHTML += `
        <div class="card-filme">
            <img src="${filme.Poster}" alt="${filme.Titulo}">
            <h2>${filme.Titulo}</h2>
            <p>Ano: ${filme.Ano}</p>
            <p>ID: ${filme.imdbID}</p>
            <p>Tipo: ${filme.Tipo}</p>
        </div>
    `;
   });
}
//Ouve o click
document.getElementById('botao-pesquisar').addEventListener('click', () => {
    const valorDoInput = document.querySelector('.search-box input').value;
    buscarFilme(valorDoInput);
});
//Ouve o Enter
document.querySelector('campo-busca').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        buscarFilme(e.target.value);
    }
});