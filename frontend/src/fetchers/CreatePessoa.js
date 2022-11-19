import { URL_REQUEST } from "../constants"

export const CreatePessoa = (nome, cpf, rg, token) => {
    const response = fetch(`${URL_REQUEST}/auth/pessoa/cadastro`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "Authorization": "Bearer " + token },
        body: JSON.stringify({
            "nome": nome,
            "cpf": cpf,
            "rg": rg
        })
    }).then((data) => {
        console.log(data)
        return data.json();
    }).then((data) => {
        console.log(data);
        return data;
    }).catch((e) => {
        console.error(e)
        return false;
    });

    return response;
}