import { URL_REQUEST } from "../constants"

export const CreatePesquisa = (nome, cpf, rg, genero,
    idade, logradouro, numero, q1, q2, q3, q4, q5, q6, q7, q8, token) => {

    const response = fetch(`${URL_REQUEST}/auth/pesquisa/cadastro`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "Authorization": "Bearer " + token },
        body: JSON.stringify({
            "fkusuario": 1,
            "Pessoa": {
                "nome": nome,
                "cpf": cpf,
                "rg": rg
            },
            "Entrevistado": {
                "genero": genero,
                "datanascimento": "1994-08-09",
                "idade": idade,
                "telefonecontato": "992227954",
                "especiedomicilioocupado": "",
                "tipodomicilio": "Proprio",
                "profissao": "Designer",
                "nivelescolaridade": "Ensino superior incompleto",
                "religiao": "Sem religião",
                "faixarendafamilia": "Até 3 salário minimo."
            },
            "Bairro": {
                "nome": "Vila boas"
            },
            "Endereco": {
                "cep": 79083032,
                "logradouro": logradouro,
                "numero": numero,
                "complemento": "Casa 3"
            },
            "Resposta": [
                {
                    "fkquestionario": 1,
                    "fkpergunta": 73,
                    "valor": q1
                },
                {
                    "fkquestionario": 1,
                    "fkpergunta": 74,
                    "valor": q2
                },
                {
                    "fkquestionario": 1,
                    "fkpergunta": 75,
                    "valor": q3
                },
                {
                    "fkquestionario": 1,
                    "fkpergunta": 76,
                    "valor": q4
                },
                {
                    "fkquestionario": 1,
                    "fkpergunta": 77,
                    "valor": q5
                },
                {
                    "fkquestionario": 1,
                    "fkpergunta": 78,
                    "valor": q6
                },
                {
                    "fkquestionario": 1,
                    "fkpergunta": 79,
                    "valor": q7
                },
                {
                    "fkquestionario": 1,
                    "fkpergunta": 80,
                    "valor": q8
                }
            ],
            "datainicio": "2022-11-13",
            "datafim": "2022-11-13"
        })
    }).then((data) => {
        console.log('response', data)
        return data.json();
    }).then((data) => {
        console.log('response', data)
        return data;
    }).catch((e) => {
        console.error(e)
        return false;
    });

    return response;
}