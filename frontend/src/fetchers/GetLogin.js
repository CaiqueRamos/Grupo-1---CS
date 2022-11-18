import { URL_REQUEST } from "../constants"

export const GetLogin = (email, password) => {
    const response = fetch(`${URL_REQUEST}/auth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "email": email,
            "senha": password
        })
    }).then((data) => {
        return data;
    }).catch((e) => {
        console.error(e)
        return false;
    });

    return response;
}