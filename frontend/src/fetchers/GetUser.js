export const GetUser = (token, idUser) => {
    return fetch(`https://censo-ufms.herokuapp.com/auth/usuario/${idUser}`, {
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