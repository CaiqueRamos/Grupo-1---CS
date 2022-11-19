import { URL_REQUEST } from "../constants"

export const CreateEntrevistado = (idPessoa, genero, idade, token) => {
    const response = fetch(`${URL_REQUEST}/auth/entrevistado/cadastro`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "Authorization": "Bearer " + token },
        body: JSON.stringify({
            "fkpessoa": idPessoa,
            "genero": genero,
            "datanascimento": "1994-08-09",
            "idade": idade,
            "fkendereco": 2,
            "telefonecontato": "999999999",
            "especiedomicilioocupado": "",
            "tipodomicilio": "",
            "profissao": "",
            "nivelescolaridade": "",
            "religiao": "",
            "faixarendafamilia": ""
        })
    }).then((data) => {
        console.log('pesquisa', idPessoa)
        console.log('pesquisa', genero)
        console.log('pesquisa', idade)
        console.log('pesquisa', data)
        return data.json();
    }).then((data) => {
        console.log('pesquisa', data);
        return data;
    }).catch((e) => {
        console.error(e)
        return false;
    });

    return response;
}