const pessoaModel = require("@model/pessoa");
const { status } = require("@helper/Status/index");
const { Papel } = require("@helper/");

module.exports = {
    async createPessoa(req,res){
        
        //#region Swagger
        /*
            #swagger.start
            #swagger.path = '/pessoa/cadastro'
            #swagger.method = 'post'
            #swagger.description = 'Descrição do endpoint'
            #swagger.produces = ["application/json"]
            #swagger.tags = ['Pessoa']
            #swagger.parameters['createPessoa'] = {
               in: 'body',
               description: 'Informações da Pessoa.',
               required: true,
               schema: { $ref: "#/definitions/Pessoa" }
            }
        */
       //#endregion
        try{
            if(!req.body) return res.status(status(401).reqStatus).json({message:status(401).message,status:status(401).reqStatus});
            
            if(req.papel != Papel.GG && req.papel != Papel.MS) return res.status(403).json({message:'Você não possui permissão para criar Usuário!',status:status(403).reqStatus});

            const data = await pessoaModel.createPessoa(req.body);
            
            if(!data) return res.status(400).json({message:'Não foi possível atualizar essa informação!',data:null,status:status(400).reqStatus});

            return res.status(status(200).reqStatus).json({message:status(200).message,data,status:status(200).reqStatus});
            /* #swagger.responses[200] = { 
                schema: { $ref: "#/definitions/Pessoa" },
                description: 'Pessoa cadastrada!.' 
            }*/
            
        }catch(error){
            res.status(status(500).reqStatus).json({message:status(500).message,status:status(500).reqStatus}); // #swagger.responses[500] #swagger.end
        }
    },
    async getPessoaAll(req,res){
        //#region Swagger
        /*
            #swagger.start
            #swagger.path = '/pessoas'
            #swagger.method = 'get'
            #swagger.description = 'Retorna um array de pessoas.'
            #swagger.produces = ["application/json"]
            #swagger.tags = ['Pessoa']
        */
       //#endregion
        try{
            const data = await pessoaModel.getPessoaAll();
            
            if(!data) return res.status(400).json({message:'Não foi possível atualizar essa informação!',data:null,status:status(400).reqStatus});

            return res.status(status(200).reqStatus).json({message:status(200).message,data,status:status(200).reqStatus});
            /* #swagger.responses[200] = { 
                schema: [{ $ref: "#/definitions/Pessoa" }],
                description: 'Lista de pessoas!.'
            }*/
            
        }catch(error){
            res.status(status(500).reqStatus).json({message:status(500).message,status:status(500).reqStatus}); // #swagger.responses[500] #swagger.end
        }
    },
    async getPessoaEmail(req,res){
        //#region Swagger description API 
        /*
            Alterar o arquivo swagger_output.json com as informações do endpoint
            #swagger.description = 'Descrição do endpoint'

            #swagger.parameters[''] = {
                description: 'Nome do parametro',
                type: 'string',
                required: true,
                in: 'body',
                example: 'admin@censo.com.br',
            }
        */
       //#endregion
        try{
            if(!req.body) return res.status(status(401).reqStatus).json({message:status(401).message,status:status(401).reqStatus});
            const data = await pessoaModel.getPessoaEmail(req.body);
            
            if(!data) return res.status(400).json({message:'Não foi possível atualizar essa informação!',data:null,status:status(400).reqStatus});

            return res.status(status(200).reqStatus).json({message:status(200).message,data,status:status(200).reqStatus});
            
        }catch(error){
            res.status(status(500).reqStatus).json({message:status(500).message,status:status(500).reqStatus}); // #swagger.responses[500]
        }
    },
    async getPessoaUnique(req,res){
        try{
            if(!req.params) return res.status(status(401).reqStatus).json({message:status(401).message,status:status(401).reqStatus});

            const data = await pessoaModel.getPessoaUnique(req.params);
            
            if(!data) return res.status(400).json({message:'Não foi possível atualizar essa informação!',data:null,status:status(400).reqStatus});

            return res.status(status(200).reqStatus).json({message:status(200).message,data,status:status(200).reqStatus});
            
        }catch(error){
            res.status(status(500).reqStatus).json({message:status(500).message,status:status(500).reqStatus}); // #swagger.responses[500]
        }
    },
    async altPessoa(req,res){
        try{
            if(!req.params) return res.status(status(401).reqStatus).json({message:status(401).message,status:status(401).reqStatus});

            const data = await pessoaModel.updatePessoa({...req.params,...req.body});
            
            if(!data) return res.status(400).json({message:'Não foi possível atualizar essa informação!',data:null,status:status(400).reqStatus});

            return res.status(status(200).reqStatus).json({message:status(200).message,data,status:status(200).reqStatus});
            
        }catch(error){
            res.status(status(500).reqStatus).json({message:status(500).message,status:status(500).reqStatus}); // #swagger.responses[500]
        }
    },
    async delPessoa(req,res){
        //#region Swagger description API 
        /*
            Alterar o arquivo swagger_output.json com as informações do endpoint
            #swagger.description = 'Descrição do endpoint'

            #swagger.parameters[''] = {
                description: 'Nome do parametro',
                type: 'string',
                required: true,
                in: 'body',
                example: 'admin@censo.com.br',
            }
        */
       //#endregion
        try{
            
            if(!parseInt(req.params.id)) return res.status(status(401).reqStatus).json({message:status(401).message,status:status(401).reqStatus});

            const data = await pessoaModel.deletePessoa(parseInt(req.params.id));
            
            if(!data) return res.status(400).json({message:'Não foi possível atualizar essa informação!',data:null,status:status(400).reqStatus});

            return res.status(status(200).reqStatus).json({message:status(200).message,data,status:status(200).reqStatus});
            
        }catch(error){
            res.status(status(500).reqStatus).json({message:status(500).message,status:status(500).reqStatus}); // #swagger.responses[500]
        }
    }
}
