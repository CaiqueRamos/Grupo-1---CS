const prisma = require('@db');
const md5 = require('md5');
module.exports = {
  //#region getPesquisaAll
  async getPesquisaAll() {
    try {
      // return await prisma.Respostas.findMany(
      //   {
      //     select:{
      //       idrespostas:true,
      //       Perguntas:true,
      //       Questionario:true
      //     }
      //   }
      // );
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
            // Respostas:true,
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
    const { idpesquisa } = data;
    if (!idpesquisa) return false;
    try {
      return await prisma.Pesquisa.findUnique({
        where: { idpesquisa },
        select: {
          idpesquisa: true,
          fkentrevistado: {
            select: {
              identrevistado: true,
              fkpessoa: {
                select: {
                  idpessoa: true,
                  nome: true,
                  cpf: true,
                  rg: true,
                  Entrevistado: true,
                  Usuario: true,
                }
              },
              genero: true,
              datanascimento: true,
              idade: true,
              fkendereco: {
                select: {
                  idendereco: true,
                  pais: true,
                  cep: true,
                  estadoSigla: true,
                  estado: true,
                  cidadeSigla: true,
                  cidade: true,
                  fkbairro: {
                    select: {
                      idbairro: true,
                      nome: true,
                      Endereco: true,
                      Regiao: true,
                    }
                  },
                  logradouro: true,
                  numero: true,
                  complemento: true,
                  Bairro: true,
                  Entrevistado: true,
                }
              },
              Endereco: true,
              Pessoa: true,
              Pesquisa: true,
            }
          },
          fkusuario: {
            select: {
              idusuario: true,
              senha: true,
              email: true,
              fkpapel: {
                select: {
                  idpapel: true,
                  sigla: true,
                  descricao: true,
                  Usuario: true,
                }
              },
              fkpessoa: {
                select: {
                  idpessoa: true,
                  nome: true,
                  cpf: true,
                  rg: true,
                  Entrevistado: true,
                  Usuario: true,
                }
              },
              supervisor: true,
              Papel: true,
              Pessoa: true,
              Usuario: true,
              Pesquisa: true,
              Supervisiona: true,

            }
          },
          fkquestionario: {
            select: {
              idquestionario: true,
              Pesquisa: true,
            }
          },
          datainicio: true,
          datafim: true,
          Entrevistado: true,
          Usuario: true,
          Questionario: true,
          Relatorio: true
        },
        orderBy: {
          nome: 'asc',
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
    const { fkentrevistado, fkusuario, fkquestionario, datainicio, datafim, Entrevistado, Usuario, Questionario, Relatorio } = data;
    try {
      return await prisma.Pesquisa.create({
        data: {
          idpesquisa,
          fkentrevistado,
          fkusuario,
          fkquestionario,
          datainicio,
          datafim,
          Entrevistado,
          Usuario,
          Questionario,
          Relatorio
        }
      });
    } catch (error) {
      throw console.log({
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