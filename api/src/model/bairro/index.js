const prisma = require('@db');
const md5 = require('md5');
module.exports = {
    async getBairroAll(){
        try{
            return await prisma.Bairro.findMany({
                select:{
                    idbairro:true,
                    nome:true
                }
            });
        }catch(error){
            throw console.log({
                name: 'Prisma error',
                message: "https://www.prisma.io/docs/reference/api-reference/error-reference#"+error.code,
                code: error.code,
                meta: error.meta,
                stack: 'getBairroAll()'
            });
        }
    },
    async getBairroUnique(data){
        const {idbairro } = data;
        if(!idbairro) return false;
        try{
            return await prisma.Bairro.findUnique({
                where: { idbairro },
                select:{
                    idbairro:true,
                    nome:true
                }
            });
        }catch(error){
            throw console.log({
                error,
                name: 'Prisma error',
                message: "https://www.prisma.io/docs/reference/api-reference/error-reference#"+error.code,
                code: error.code,
                meta: error.meta,
                stack: 'getBairroUnique()'
            });
        }
    },
    async createBairro(data){
        const { nome } = data;
        try{
            
            let bairro = await prisma.Bairro.findFirst({
                where:{ nome }
            });
            
            if(bairro) return {message:"bairro já cadastrada!",idbairro:bairro.idbairro};
            
            bairro = await prisma.Bairro.create({
                data:{ nome }
            });
            return bairro;
        }catch(error){
            throw console.log({
                name: 'Prisma error',
                message: "https://www.prisma.io/docs/reference/api-reference/error-reference#"+error.code,
                code: error.code,
                meta: error.meta,
                stack: 'createBairro()'
            });
        }
    },
    async updateBairro(data){
        const { idbairro,nome } = data;
        try{
            const bairro = await prisma.Bairro.update({
                where:{idbairro},
                data:{ nome }
            });
            return bairro;

        }catch(error){
            throw console.log({
                error,
                name: 'Prisma error',
                message: "https://www.prisma.io/docs/reference/api-reference/error-reference#"+error.code,
                code: error.code,
                meta: error.meta,
                stack: 'updateBairro()'
            });
        }
    },
    async delBairro(data){
        const {idbairro} = data;
        const isbairro = await prisma.Bairro.findUnique({ where: { idbairro }});
        try{
            if(!isbairro) return {message:'Registro não encontrado!'};
            return await prisma.Bairro.delete({
                where: { idbairro },
                select:{
                    idbairro:true,
                    nome:true
                }
            });
        }catch(error){
            throw console.log({
                error,
                name: 'Prisma error',
                message: "https://www.prisma.io/docs/reference/api-reference/error-reference#"+error.code,
                code: error.code,
                meta: error.meta,
                stack: 'delBairro()'
            });
        }
    }
}