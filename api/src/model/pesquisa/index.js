const prisma = require('@db');
const md5 = require('md5');
const { getRespostaAll } = require('../resposta/index');
module.exports = {
  //#region getPesquisaAll
  async getPesquisaAll() {
    try {
      const pesquisa =  await prisma.Pesquisa.findMany(
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
            datainicio: true,
            datafim: true
          }
        }
      );
      // const respostas = await getRespostaAll();
      console.log(pesquisa);
      // return {...pesquisa,...respostas};
      return pesquisa;
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
    const { idpesquisa } = data;
    if (!idpesquisa) return false;
    try {
      return await prisma.Pesquisa.findUnique({
        where: { idpesquisa },
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
          // Respostas:true,
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
    const { fkentrevistado, fkusuario, fkrespostas, datainicio, datafim } = data;
    console.log(data);
    try {
      return await prisma.Pesquisa.create({
        data: {
          fkentrevistado,
          fkusuario,
          fkrespostas,
          datainicio,
          datafim
        }
      });
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
    const { identrevistado, idusuario, idquestionario, datainicio, datafim } = data;
    try {
      return await prisma.Pesquisa.update({
        where: { idpesquisa },
        data: {
          identrevistado,
          idusuario,
          idquestionario,
          datainicio,
          datafim
        }
      });
    } catch (error) {
      throw console.log({
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
  async deletePesquisa(cpf) {
    const data = await prisma.Pesquisa.findUnique({ where: { cpf }, });
    try {
      if (!data) return false;
      return await prisma.Pesquisa.delete({
        where: { idpesquisa },
        select: {
          idpesquisa: true,
          fkentrevistado: true,
          fkusuario: true,
          fkquestionario: true,
          datainicio: true,
          datafim: true,
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