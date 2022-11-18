import { URL_REQUEST } from "../constants"

export const CreateUser = (email, senha, fkpapel, supervisor, nome, cpf, rg, token) => {
    const response = fetch(`${URL_REQUEST}/auth/usuario/cadastro`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "Authorization": "Bearer " + token },
        body: JSON.stringify({
            "email": email,
            "senha": senha,
            "fkpapel": fkpapel,
            "supervisor": 2,
            "nome": nome,
            "cpf": cpf,
            "rg": rg
        })
    }).then((data) => {
        console.log('the data', data)
        return data.json();
    }).then((data) => {
        return data;
    }).catch((e) => {
        console.error(e)
        return false;
    });

    return response;
}