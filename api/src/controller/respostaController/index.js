const respostaModel = require("@model/resposta");
const { status } = require("@helper/Status/index");

module.exports = {


  async createResposta(req, res) {
    try {
      if (!req.body) return res.status(status(401).reqStatus).json({ message: status(401).message, status: status(401).reqStatus });
      
      const data = await respostaModel.createResposta(req.body);

      if (!data) return res.status(400).json({ message: 'Não foi possível atualizar essa informação!', data: null, status: status(400).reqStatus });

      return res.status(status(200).reqStatus).json({ message: status(200).message, data, status: status(200).reqStatus });

    } catch (error) {
      res.status(status(500).reqStatus).json({ message: status(500).message, status: status(500).reqStatus }); // #swagger.responses[500] #swagger.end
    }
  },
  async getRespostaAll(req, res) {
    try {
      const data = await respostaModel.getRespostaAll();

      if (!data) return res.status(400).json({ message: 'Não foi possível atualizar essa informação!', data: null, status: status(400).reqStatus });

      return res.status(status(200).reqStatus).json({ message: status(200).message, data, status: status(200).reqStatus });

    } catch (error) {
      res.status(status(500).reqStatus).json({ message: status(500).message, status: status(500).reqStatus }); // #swagger.responses[500] #swagger.end
    }
  },
  async getRespostaUnique(req, res) {
    try {

      if (!req.params) return res.status(status(401).reqStatus).json({ message: status(401).message, status: status(401).reqStatus });
      
      const data = await respostaModel.getRespostaUnique(req.params);

      if (!data) return res.status(400).json({ message: 'Não foi possível atualizar essa informação!', data: null, status: status(400).reqStatus });

      return res.status(status(200).reqStatus).json({ message: status(200).message, data, status: status(200).reqStatus });

    } catch (error) {
      res.status(status(500).reqStatus).json({ message: status(500).message, status: status(500).reqStatus }); // #swagger.responses[500]
    }
  },
  async altResposta(req, res) {
    try {

      if (!req.params) return res.status(status(401).reqStatus).json({ message: status(401).message, status: status(401).reqStatus });

      const data = await respostaModel.updateResposta({...req.params,...req.body});

      if (!data) return res.status(400).json({ message: 'Não foi possível atualizar essa informação!', data: null, status: status(400).reqStatus });

      return res.status(status(200).reqStatus).json({ message: status(200).message, data, status: status(200).reqStatus });

    } catch (error) {
      res.status(status(500).reqStatus).json({ message: status(500).message, status: status(500).reqStatus }); // #swagger.responses[500]
    }
  },
  async delResposta(req, res) {
    try {

      if (!req.params) return res.status(status(401).reqStatus).json({ message: status(401).message, status: status(401).reqStatus });

      const data = await respostaModel.deleteResposta(req.params);

      if (!data) return res.status(400).json({ message: 'Não foi possível atualizar essa informação!', data: null, status: status(400).reqStatus });

      return res.status(status(200).reqStatus).json({ message: status(200).message, data, status: status(200).reqStatus });

    } catch (error) {
      res.status(status(500).reqStatus).json({ message: status(500).message, status: status(500).reqStatus }); // #swagger.responses[500]
    }
  }
}
