const pesquisaModel = require("@model/pesquisa");
const { status } = require("@helper/Status/index");
const { Papel } = require("@helper/");

module.exports = {
  async createPesquisa(req, res) {
    try {
      if (!req.body) return res.status(status(401).reqStatus).json({ message: status(401).message, status: status(401).reqStatus });

      const data = await pesquisaModel.createPesquisa(req.body);

      if (!data) return res.status(400).json({ message: 'Não foi possível atualizar essa informação!', data: null, status: status(400).reqStatus });

      return res.status(status(200).reqStatus).json({ message: status(200).message, data, status: status(200).reqStatus });
      /* #swagger.responses[200] = { 
          schema: { $ref: "#/definitions/Pesquisa" },
          description: 'Pesquisa cadastrada!.' 
      }*/

    } catch (error) {
      res.status(status(500).reqStatus).json({ message: status(500).message, status: status(500).reqStatus }); // #swagger.responses[500] #swagger.end
    }
  },
  async getPesquisaAll(req, res) {
    try {
      const data = await pesquisaModel.getPesquisaAll();

      if (!data) return res.status(400).json({ message: 'Não foi possível atualizar essa informação!', data: null, status: status(400).reqStatus });

      return res.status(status(200).reqStatus).json({ message: status(200).message, data, status: status(200).reqStatus });

    } catch (error) {
      res.status(status(500).reqStatus).json({ message: status(500).message, status: status(500).reqStatus }); // #swagger.responses[500] #swagger.end
    }
  },
  async getPerguntaAll(req, res) {
    try {
      const data = await pesquisaModel.getPerguntaAll();

      if (!data) return res.status(400).json({ message: 'Não foi possível atualizar essa informação!', data: null, status: status(400).reqStatus });

      return res.status(status(200).reqStatus).json({ message: status(200).message, data, status: status(200).reqStatus });

    } catch (error) {
      res.status(status(500).reqStatus).json({ message: status(500).message, status: status(500).reqStatus }); // #swagger.responses[500] #swagger.end
    }
  },
  async getPesquisaUnique(req, res) {

    try {

      if (!req.params) return res.status(status(401).reqStatus).json({ message: status(401).message, status: status(401).reqStatus });

      const data = await pesquisaModel.getPesquisaUnique(req.params);

      if (!data) return res.status(400).json({ message: 'Não foi possível atualizar essa informação!', data: null, status: status(400).reqStatus });

      return res.status(status(200).reqStatus).json({ message: status(200).message, data, status: status(200).reqStatus });

    } catch (error) {
      res.status(status(500).reqStatus).json({ message: status(500).message, status: status(500).reqStatus }); // #swagger.responses[500]
    }
  },
  async altPesquisa(req, res) {
    try {

      if (!req.params) return res.status(status(401).reqStatus).json({ message: status(401).message, status: status(401).reqStatus });

      const data = await pesquisaModel.updatePesquisa({...req.params,...req.body});

      if (!data) return res.status(400).json({ message: 'Não foi possível atualizar essa informação!', data: null, status: status(400).reqStatus });

      return res.status(status(200).reqStatus).json({ message: status(200).message, data, status: status(200).reqStatus });

    } catch (error) {
      res.status(status(500).reqStatus).json({ message: status(500).message, status: status(500).reqStatus }); // #swagger.responses[500]
    }
  },
  async delPesquisa(req, res) {
    try {

      if (!req.params) return res.status(status(401).reqStatus).json({ message: status(401).message, status: status(401).reqStatus });

      const data = await pesquisaModel.deletePesquisa(req.params);

      if (!data) return res.status(400).json({ message: 'Não foi possível atualizar essa informação!', data: null, status: status(400).reqStatus });

      return res.status(status(200).reqStatus).json({ message: status(200).message, data, status: status(200).reqStatus });
      /* #swagger.responses[200] = { 
        schema: { $ref: "#/definitions/Pesquisa" },
        description: 'Pesquisa Deletada!.' 
      }*/

    } catch (error) {
      res.status(status(500).reqStatus).json({ message: status(500).message, status: status(500).reqStatus }); // #swagger.responses[500]
    }
  }
}
