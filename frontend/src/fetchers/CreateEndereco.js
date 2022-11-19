import { URL_REQUEST } from "../constants"

export const CreateEndereco = (cep, logradouro, numero, token) => {
    const response = fetch(`${URL_REQUEST}/auth/pessoa/cadastro`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "Authorization": "Bearer " + token },
        body: JSON.stringify({
            "cep": cep,
            "fkbairro": 61,
            "logradouro": logradouro,
            "numero": numero,
            "complemento": ""
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