const API_KEY_DETALHES = 'edda1ba9'; 

async function verDescricao(id) {
    
    const url = `https://www.omdbapi.com/?apikey=${API_KEY_DETALHES}&i=${id}&plot=full`;

    try {
        const resposta = await fetch(url);
        const dados = await resposta.json(); 

        if (dados.Response === "True") {
           (`Título: ${dados.Title}\n
                Ano: ${dados.Year}\n
                Gênero: ${dados.Genre}\n
                Diretor: ${dados.Director}\n
                Atores: ${dados.Actors}\n
                Sinopse: ${dados.Plot}`);
        } else {
            ("Detalhes do filme não encontrados.");
        }
    } catch (erro) {
        console.error("Erro na requisição:", erro);
    }
}