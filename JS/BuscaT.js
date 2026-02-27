const API_KEY = 'https://www.omdbapi.com/?s=TERMO_DE_BUSCA&apikey=SUA_CHAVE'; 
async function buscarFilme(nomeDoFilme) {
    const url = `https://www.omdbapi.com/?apikey=${API_KEY}&t=${nomeDoFilme}`;

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

            exibirNoHTML(filmeFormatado);
        } else {
            console.log("Filme não encontrado.");
        }
    } catch (erro) {
        console.error("Erro na requisição:", erro);
    }
}

function exibirNoHTML(filme) {
    const grid = document.getElementById('movie-grid');
    
   
    grid.innerHTML = `
        <div class="card-filme">
            <img src="${filme.Poster}" alt="${filme.Titulo}">
            <h2>${filme.Titulo}</h2>
            <p>Ano: ${filme.Ano}</p>
            <p>ID: ${filme.imdbID}</p>
            <p>Tipo: ${filme.Tipo}</p>
        </div>
    `;
}


document.querySelector('.search-box input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        buscarFilme(e.target.value);
    }
});