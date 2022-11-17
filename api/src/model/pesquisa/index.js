const prisma = require('@db');
const md5 = require('md5');
const { createResposta } = require('../resposta/index');
module.exports = {
  //#region getPesquisaAll
  async getPesquisaAll() {
    try {
      return await prisma.Pesquisa.findMany(
        {
          select: {
            idpesquisa: true,
            fkentrevistado:true,
            fkusuario:true,
            Entrevistado: {
              select: {
                identrevistado: true,
                Pessoa:true,
                genero: true,
                datanascimento: true,
                idade: true,
                Endereco:true
              }
            },
            Usuario: {
              select: {
                idusuario: true,
                senha: true,
                email: true,
                Pessoa: {
                  select: {
                    nome: true,
                    cpf: true
                  }
                },
                Papel:true
              }
            },
            Resposta:{
              select:{
                idresposta:true,
                fkquestionario:true,
                Pergunta:{
                  select:{
                    descricao:true
                  }
                },
                valor:true
              }
            },
            datainicio: true,
            datafim: true
          }
        }
      );
    } catch (error) {
      throw console.log({
        error,
        name: 'Prisma error',
        message: "https://www.prisma.io/docs/reference/api-reference/error-reference#" + error.code,
        code: error.code,
        meta: error.meta,
        stack: 'getPesquisaAll()'
      });
    }
  },
  //#endregion getPesquisaAll

  //#region getPesquisaUnique
  async getPesquisaUnique(data) {
    const { id } = data;
    if (!id) return false;
    try {
      return await prisma.Pesquisa.findUnique({
        where: { idpesquisa:parseInt(id) },
        select: {
          idpesquisa: true,
          fkentrevistado:true,
          fkusuario:true,
          Entrevistado: {
            select: {
              identrevistado: true,
              Pessoa:true,
              genero: true,
              datanascimento: true,
              idade: true,
              Endereco:true
            }
          },
          Usuario: {
            select: {
              idusuario: true,
              senha: true,
              email: true,
              Pessoa: {
                select: {
                  nome: true,
                  cpf: true
                }
              },
              Papel:true
            }
          },
          Resposta:{
            select:{
              idresposta:true,
              fkquestionario:true,
              Pergunta:{
                select:{
                  descricao:true
                }
              },
              valor:true
            }
          },
          datainicio: true,
          datafim: true
        }
      });
    } catch (error) {
      throw console.log({
        name: 'Prisma error',
        message: "https://www.prisma.io/docs/reference/api-reference/error-reference#" + error.code,
        code: error.code,
        meta: error.meta,
        stack: 'getPesquisaUnique()'
      });
    }
  },
  //#endregion getPesquisaUnique

  //#region createPesquisa
  async createPesquisa(data) {
    const { fkentrevistado,fkusuario, datainicio, datafim } = data;
    try {
      const pesquisa = await prisma.Pesquisa.create({
        data: {
          fkentrevistado,
          fkusuario,
          datainicio:new Date(datainicio),
          datafim:new Date(datafim)
        }
      });
      return pesquisa;
    } catch (error) {
      throw console.log({
        error,
        name: 'Prisma error',
        message: "https://www.prisma.io/docs/reference/api-reference/error-reference#" + error.code,
        code: error.code,
        meta: error.meta,
        stack: 'createPesquisa()'
      });
    }
  },
  //#endregion createPesquisa

  //#region updatePesquisa 
  async updatePesquisa(data) {
    const { id, fkentrevistado, fkusuario } = data;
    try {
      const pesquisa = await this.getPesquisaUnique({id});
      if(!pesquisa) return false;
      return await prisma.Pesquisa.update({
        where: { idpesquisa:pesquisa.idpesquisa },
        data: {
          fkentrevistado,
          fkusuario
        }
      });
    } catch (error) {
      throw console.log({
        error,
        name: 'Prisma error',
        message: "https://www.prisma.io/docs/reference/api-reference/error-reference#" + error.code,
        code: error.code,
        meta: error.meta,
        stack: 'updatePesquisa()'
      });
    }
  },
  //#endregion updatePesquisa

  //#region deletePesquisa
  async deletePesquisa(data) {
    const { id } = data;
    if (!id) return false;
    try {
      return await prisma.Pesquisa.delete({
        where: { idpesquisa:parseInt(id) },
        select: {
          idpesquisa: true,
          fkentrevistado:true,
          fkusuario:true,
          Entrevistado: {
            select: {
              identrevistado: true,
              Pessoa:true,
              genero: true,
              datanascimento: true,
              idade: true,
              Endereco:true
            }
          },
          Usuario: {
            select: {
              idusuario: true,
              senha: true,
              email: true,
              Pessoa: {
                select: {
                  nome: true,
                  cpf: true
                }
              },
              Papel:true
            }
          },
          Resposta:{
            select:{
              idresposta:true,
              fkquestionario:true,
              Pergunta:{
                select:{
                  descricao:true
                }
              },
              valor:true
            }
          },
          datainicio: true,
          datafim: true
        }
      });
    } catch (error) {
      throw console.log({
        name: 'Prisma error',
        message: "https://www.prisma.io/docs/reference/api-reference/error-reference#" + error.code,
        code: error.code,
        meta: error.meta,
        stack: 'deletePesquisa()'
      });
    }
  }
  //#endregion deletePesquisa
}