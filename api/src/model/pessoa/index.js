const prisma = require('@db');
const md5 = require('md5');
module.exports = {
    async getPessoaAll(){
        try{
            return await prisma.Pessoa.findMany(
                {
                    select:{
                        idpessoa:true,
                        nome:true,
                        cpf:true,
                        rg:true,
                        Entrevistado:{
                            select:{
                                identrevistado:true,
                                genero:true,
                                idade:true
                            }
                        }
                    }
                }
            );
        }catch(error){
            throw console.log({
                name: 'Prisma error',
                message: "https://www.prisma.io/docs/reference/api-reference/error-reference#"+error.code,
                code: error.code,
                meta: error.meta,
                stack: 'getPessoaAll()'
            });
        }
    },
    async getPessoaUnique(data){
        const {id} = data;
        if(!id) return false;
        try{
            return await prisma.Pessoa.findUnique({
                where: { idpessoa:parseInt(id) },
                select:{
                    idpessoa:true,
                    nome:true,
                    cpf:true,
                    rg:true,
                    Entrevistado:{
                        select:{
                            identrevistado:true,
                            genero:true,
                            idade:true
                        }
                    }
                }
            });
        }catch(error){
            throw console.log({
                name: 'Prisma error',
                message: "https://www.prisma.io/docs/reference/api-reference/error-reference#"+error.code,
                code: error.code,
                meta: error.meta,
                stack: 'getPessoaUnique()'
            });
        }
    },
    async createPessoa(data){
        const { nome,cpf,rg } = data;
        try{
            
            let pessoa = await prisma.Pessoa.findFirst({
                where:{cpf}
            });
            
            if(pessoa) return {message:"Pessoa já cadastrada!",idpessoa:pessoa.idpessoa};
            
            pessoa = await prisma.Pessoa.create({
                data:{
                    nome,
                    cpf,
                    rg
                }
            });
            return pessoa;
        }catch(error){
            throw console.log({
                name: 'Prisma error',
                message: "https://www.prisma.io/docs/reference/api-reference/error-reference#"+error.code,
                code: error.code,
                meta: error.meta,
                stack: 'createPessoa()'
            });
        }
    },
    async updatePessoa(data){
        const { id,nome,rg } = data;
        if(!id) return false;
        try{
            const pessoa = await prisma.Pessoa.update({
                where:{idpessoa:parseInt(id)},
                data:{
                    nome,
                    rg
                }
            });
            return pessoa;

        }catch(error){
            throw console.log({
                error,
                name: 'Prisma error',
                message: "https://www.prisma.io/docs/reference/api-reference/error-reference#"+error.code,
                code: error.code,
                meta: error.meta,
                stack: 'updatePessoa()'
            });
        }
    },
    async deletePessoa(data){
        const {id} = data;
        const pessoa = await this.getPessoaUnique({id});
        try{
            if(!pessoa) return false;
            return await prisma.Pessoa.delete({
                where: { idpessoa:pessoa.idpessoa },
                select:{
                    nome:true,
                    cpf:true,
                    rg:true
                }
            });
        }catch(error){
            throw console.log({
                error,
                name: 'Prisma error',
                message: "https://www.prisma.io/docs/reference/api-reference/error-reference#"+error.code,
                code: error.code,
                meta: error.meta,
                stack: 'deletePessoa()'
            });
        }
    }
}