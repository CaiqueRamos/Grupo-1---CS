import { URL_REQUEST } from "../constants"

export const GetPerguntas = (token) => {
    const response = fetch(`${URL_REQUEST}/auth/perguntas`, {
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