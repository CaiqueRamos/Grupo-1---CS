import { URL_REQUEST } from "../constants"

export const GetAuthUser = (token) => {
    return fetch(`${URL_REQUEST}/authenticate`, {
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
}