const prisma = require('@db');
const md5 = require('md5');
module.exports = {
    async getEnderecoAll(){
        try{
            return await prisma.Endereco.findMany(
                {
                    select:{
                        idendereco:true,
                        pais:true,
                        cep:true,
                        estadoSigla:true,
                        estado:true,
                        cidadeSigla:true,
                        cidade:true,
                        fkbairro:true,
                        logradouro:true,
                        numero:true,
                        complemento:true,
                        Bairro:{
                            select:{
                                idbairro:true,
                                nome:true,
                                Regiao:{
                                    select:{
                                        idregiao:true,
                                        zona:true
                                    }
                                }
                            }
                        },
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
                stack: 'getEnderecoAll()'
            });
        }
    },
    async getEnderecoUnique(data){
        const {idendereco } = data;
        if(!idendereco) return false;
        try{
            return await prisma.Endereco.findUnique({
                where: { idendereco },
                select:{
                    idendereco:true,
                    pais:true,
                    cep:true,
                    estadoSigla:true,
                    estado:true,
                    cidadeSigla:true,
                    cidade:true,
                    fkbairro:true,
                    logradouro:true,
                    numero:true,
                    complemento:true,
                    Bairro:{
                        select:{
                            idbairro:true,
                            nome:true,
                            Regiao:{
                                select:{
                                    idregiao:true,
                                    zona:true
                                }
                            }
                        }
                    },
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
                stack: 'getEnderecoUnique()'
            });
        }
    },
    async createEndereco(data){
        const { cep,fkbairro,logradouro,numero,complemento } = data;
        try{
            
            let endereco = await prisma.Endereco.findFirst({
                where:{
                    cep,
                    logradouro,
                    numero
                }
            });
            
            if(endereco) return {message:"Endereco já cadastrada!",idendereco:endereco.idendereco};
            
            endereco = await prisma.Endereco.create({
                data:{
                    cep,
                    fkbairro,
                    logradouro,
                    numero,
                    complemento
                }
            });
            return endereco;
        }catch(error){
            throw console.log({
                error,
                name: 'Prisma error',
                message: "https://www.prisma.io/docs/reference/api-reference/error-reference#"+error.code,
                code: error.code,
                meta: error.meta,
                stack: 'createEndereco()'
            });
        }
    },
    async updateEndereco(data){
        const { idendereco,cep,fkbairro,logradouro,numero,complemento } = data;
        try{
            const endereco = await prisma.Endereco.update({
                where:{idendereco},
                data:{
                    cep,
                    fkbairro,
                    logradouro,
                    numero,
                    complemento
                }
            });
            return endereco;

        }catch(error){
            throw console.log({
                name: 'Prisma error',
                message: "https://www.prisma.io/docs/reference/api-reference/error-reference#"+error.code,
                code: error.code,
                meta: error.meta,
                stack: 'updateEndereco()'
            });
        }
    },
    async deleteEndereco(idendereco){
        const data = await prisma.Endereco.findUnique({ where: { idendereco }});
        try{
            if(!data) return {message:'Registro não encontrado!'};
            return await prisma.Endereco.delete({
                where: { idendereco },
                select:{
                    idendereco:true,
                    pais:true,
                    cep:true,
                    estadoSigla:true,
                    estado:true,
                    cidadeSigla:true,
                    cidade:true,
                    fkbairro:true,
                    logradouro:true,
                    numero:true,
                    complemento:true
                }
            });
        }catch(error){
            throw console.log({
                name: 'Prisma error',
                message: "https://www.prisma.io/docs/reference/api-reference/error-reference#"+error.code,
                code: error.code,
                meta: error.meta,
                stack: 'deleteEndereco()'
            });
        }
    }
}