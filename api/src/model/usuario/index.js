const prisma = require('@db');
const md5 = require('md5');
module.exports = {
    async getUsuarioAll(){
        try{
            return await prisma.Usuario.findMany(
                {
                    select:{
                        idusuario:true,
                        email:true,
                        Pessoa:{
                            select:{
                                nome:true,
                                cpf:true
                            }
                        },
                        Papel:{
                            select:{
                                sigla:true,
                                descricao:true
                            }
                        },
                        Usuario:{
                            select:{
                                email:true,
                                Pessoa:{
                                    select:{
                                        nome:true,
                                        cpf:true
                                    }
                                },
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
                stack: 'getUsuarioAll()'
            });
        }
    },
    async getSupervisor(){
        try{
            return await prisma.Usuario.findMany(
                {
                    select:{
                        Usuario:{
                            select:{
                                Pessoa:{
                                    select:{
                                        nome:true,
                                        cpf:true
                                    }
                                },
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
                stack: 'getUsuarioAll()'
            });
        }
    },
    async getUsuarioAuth(data){
        const {email} = data;
        if(!email) return false;
        try{
            return await prisma.Usuario.findUnique({
                where: { email },
                select:{
                    idusuario:true,
                    email:true,
                    senha:true,
                    Papel:{
                        select:{
                            sigla:true
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
                stack: 'getUsuarioAuth()'
            });
        }
    },
    async getUsuarioUnique(idusuario){
        if(!idusuario) return false;
        try{
            return await prisma.Usuario.findUnique({
                where: { idusuario },
                select:{
                    idusuario:true,
                    email:true,
                    Pessoa:{
                        select:{
                            nome:true,
                            cpf:true
                        }
                    },
                    Papel:{
                        select:{
                            sigla:true,
                            descricao:true
                        }
                    },
                    Usuario:{
                        select:{
                            email:true,
                            Pessoa:{
                                select:{
                                    nome:true,
                                    cpf:true
                                }
                            },
                        }
                    }
                }
            });
        }catch(error){
            throw console.log({
                error,
                name: 'Prisma error',
                message: "https://www.prisma.io/docs/reference/api-reference/error-reference#"+error.code,
                code: error.code,
                meta: error.meta,
                stack: 'getUsuarioUnique()'
            });
        }
    },
    async createUsuario(data){
        const { senha,email,fkpapel,supervisor,nome,cpf,rg } = data;
        try{
            const pessoa = await prisma.Pessoa.create({
                data:{
                    nome,
                    cpf,
                    rg
                }
            });

            const usuario = await prisma.Usuario.create({
                data:{
                    email,
                    senha:md5(senha),
                    fkpapel:fkpapel,
                    fkpessoa:pessoa.idpessoa,
                    supervisor,
                }
            });

            return {usuario,pessoa};

        }catch(error){
            throw console.log({
                name: 'Prisma error',
                message: "https://www.prisma.io/docs/reference/api-reference/error-reference#"+error.code,
                code: error.code,
                meta: error.meta,
                stack: 'createUsuario()'
            });
        }
    },
    //TODO Ver co Gilson se está certo esse Update ficou confuso para mim
    async updateUsuario(data){
        const { idusuario,fkpapel,supervisor,idpessoa,nome } = data;
        try{
            const pessoa = await prisma.Pessoa.update({
                where:{idpessoa},
                data:{
                    nome,
                    rg
                }
            })

            const usuario = await prisma.Usuario.update({
                where: { idusuario },
                data:{
                    fkpapel,
                    supervisor
                }
            });

            return {usuario,pessoa};
        }catch(error){
            throw console.log({
                name: 'Prisma error',
                message: "https://www.prisma.io/docs/reference/api-reference/error-reference#"+error.code,
                code: error.code,
                meta: error.meta,
                stack: 'updateUsuario()'
            });
        }
    },
    //TODO ver com Gilson sobre a necessidade desses dados no delete
    //TODO ver se não vai excluir primeiro das classes que herda exemplo Usuario excluir da Classe Pessoa?
    async deleteUsuario(data){
        try{ 
            const { idusuario, cpf } = data;
            let pessoa = await prisma.Pessoa.findUnique({ where: {cpf}});
            let usuario = await prisma.Usuario.findUnique({ where: {idusuario}});
            if(!pessoa) return false;
            if(!usuario) return false;
            usuario = await prisma.Usuario.delete({
                where: { idusuario },
                select:{
                    email:true,
                    idusuario:true,
                }
            });
            pessoa = await prisma.Pessoa.delete({
                where: { cpf },
                select:{
                    nome:true,
                    cpf:true,
                    rg:true,
                }
            });
            return {pessoa,usuario};
        }catch(error){
            throw console.log({
                error,
                name: 'Prisma error',
                message: "https://www.prisma.io/docs/reference/api-reference/error-reference#"+error.code,
                code: error.code,
                meta: error.meta,
                stack: 'deleteUsuario()'
            });
        }
    }
}