import { URL_REQUEST } from "../constants"

export const GetPesquisa = (token) => {
    const response = fetch(`${URL_REQUEST}/auth/pesquisas`, {
        method: 'GET',
        headers: {
            "Authorization": "Bearer " + token
        },
    }).then((data) => {
        return data.json();
    }).then((data) => {
        return data;
    }).catch((e) => {
        console.error(e)
    });

    return response;
}