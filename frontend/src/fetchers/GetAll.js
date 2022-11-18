import { URL_REQUEST } from "../constants"
export const GetAll = (token) => {
    return fetch(`${URL_REQUEST}/auth/usuarios`, {
        method: 'GET',
        headers: {
            "Authorization": "Bearer " + token
        }
    }).then((data) => {
        return data.json();
    }).then((data) => {
        return data;
    }).catch((e) => {
        console.error(e)
    });
}