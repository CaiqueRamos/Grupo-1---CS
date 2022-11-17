const entrevistadoModel = require("@model/entrevistado");
const { status } = require("@helper/Status/index");

module.exports = {
    //#region CREATE
    async createEntrevistado(req, res) {
        try {
            if (!req.body) return res.status(status(401).reqStatus).json({ message: status(401).message, status: status(401).reqStatus });

            let data = await entrevistadoModel.createEntrevistado(req.body);

            if (!data) return res.status(400).json({ message: 'Não foi possível atualizar essa informação!', data: null, status: status(400).reqStatus });

            return res.status(status(200).reqStatus).json({ message: status(200).message, data, status: status(200).reqStatus });

        } catch (error) {
            res.status(status(500).reqStatus).json({ message: status(500).message, status: status(500).reqStatus });
        }
    },
    //#endregion

    //#region GETALL
    async getEntrevistadoAll(req, res) {
        try {
            let data = await entrevistadoModel.getEntrevistadoAll();

            if (!data) return res.status(400).json({ message: 'Não foi possível atualizar essa informação!', data: null, status: status(400).reqStatus });

            return res.status(status(200).reqStatus).json({ message: status(200).message, data, status: status(200).reqStatus });

        } catch (error) {
            res.status(status(500).reqStatus).json({ message: status(500).message, status: status(500).reqStatus });
        }
    },
    //#endregion

    //#region GETUNIQUE
    async getEntrevistadoUnique(req, res) {
        try {

            if (!req.params) return res.status(status(401).reqStatus).json({ message: status(401).message, status: status(401).reqStatus });
            console.log(req.params);
            let data = await entrevistadoModel.getEntrevistadoUnique(req.params);

            if (!data) return res.status(400).json({ message: 'Não foi possível atualizar essa informação!', data: null, status: status(400).reqStatus });

            return res.status(status(200).reqStatus).json({ message: status(200).message, data, status: status(200).reqStatus });

        } catch (error) {
            res.status(status(500).reqStatus).json({ message: status(500).message, status: status(500).reqStatus });
        }
    },
    //#endregion

    //#region POSTUNIQUE
    async altEntrevistado(req, res) {
        try {
            if (!req.params) return res.status(status(401).reqStatus).json({ message: status(401).message, status: status(401).reqStatus });
            
            const data = await entrevistadoModel.updateEntrevistado({...req.params,...req.body});

            if (!data) return res.status(400).json({ message: 'Não foi possível atualizar essa informação!', data: null, status: status(400).reqStatus });

            return res.status(status(200).reqStatus).json({ message: status(200).message, data, status: status(200).reqStatus });

        } catch (error) {
            res.status(status(500).reqStatus).json({ message: status(500).message, status: status(500).reqStatus });
        }
    },
    //#endregion

    //#region DELETEUNIQUE
    async delEntrevistado(req, res) {
        try {
            if (!req.params) return res.status(status(401).reqStatus).json({ message: status(401).message, status: status(401).reqStatus });
            let data = await entrevistadoModel.deleteEntrevistado(req.params);

            if (!data) return res.status(400).json({ message: 'Não foi possível atualizar essa informação!', data: null, status: status(400).reqStatus });

            return res.status(status(200).reqStatus).json({ message: status(200).message, data, status: status(200).reqStatus });

        } catch (error) {
            console.log(error);
            res.status(status(500).reqStatus).json({ message: status(500).message, status: status(500).reqStatus });
        }
    },
    //#endregion
}