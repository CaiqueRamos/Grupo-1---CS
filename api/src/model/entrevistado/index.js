const prisma = require('@db');
module.exports = {

  // TODO analisar a necessidade do campo de email

  //#region  getEntrevistadoAll
  async getEntrevistadoAll() {
    try {
      return await prisma.Entrevistado.findMany(
        {
          select: {
            identrevistado: true,
            Pessoa: {
              select: {
                nome: true,
                cpf: true
              }
            },
            genero: true,
            datanascimento: true,
            idade: true,
            Endereco: {
              select: {
                idendereco: true,
                pais: true,
                cep: true,
                estadoSigla: true,
                estado: true,
                cidadeSigla: true,
                cidade: true,
                Bairro: {
                  select: {
                    idbairro: true,
                    nome: true,
                  }
                },
                logradouro: true,
                numero: true,
                complemento: true,
              },
              orderBy: {
                nome: 'asc',
              }
            },
            telefonecontato: true,
            especiedomicilioocupado: true,
            tipodomicilio: true,
            profissao: true,
            nivelescolaridade: true,
            religiao: true,
            faixarendafamilia:true
          }
        }
      );
    } catch (error) {
      throw console.log({
        name: 'Prisma error',
        message: "https://www.prisma.io/docs/reference/api-reference/error-reference#" + error.code,
        code: error.code,
        meta: error.meta,
        stack: 'getEntrevistadoAll()'
      });
    }
  },
  //#endregion getEntrevistadoAll

  //#region getEntrevistadoUnique
  async getEntrevistadoUnique(data) {
    const { identrevistado } = data;
    if (!identrevistado) return false;
    try {
      return await prisma.Entrevistado.findUnique({
        where: { identrevistado },
        select: {
          identrevistado: true,
          Pessoa: {
            select: {
              nome: true,
              cpf: true
            }
          },
          genero: true,
          datanascimento: true,
          idade: true,
          Endereco: {
            select: {
              idendereco: true,
              pais: true,
              cep: true,
              estadoSigla: true,
              estado: true,
              cidadeSigla: true,
              cidade: true,
              Bairro: {
                select: {
                  idbairro: true,
                  nome: true,
                }
              },
              logradouro: true,
              numero: true,
              complemento: true,
            },
            orderBy: {
              nome: 'asc',
            }
          }
        }
      });
    } catch (error) {
      throw console.log({
        name: 'Prisma error',
        message: "https://www.prisma.io/docs/reference/api-reference/error-reference#" + error.code,
        code: error.code,
        meta: error.meta,
        stack: 'getEntrevistadoUnique()'
      });
    }
  },
  //#endregion getEntrevistadoUnique

  //#region createEntrevistado
  async createEntrevistado(data) {
    const {nome, cpf, rg, genero, datanascimento, idade, pais, cep, estadoSigla, cidade, idbairro, logradouro, numero, complemento, } = data;
    try {
      const pessoa = await prisma.Pessoa.create({
        data: {
          nome,
          cpf,
          rg
        }
      });

      const endereco = await prisma.Endereco.create({
        data: {
          pais,
          cep,
          estadoSigla,
          estado,
          cidadeSigla,
          cidade,
          idbairro,
          logradouro,
          numero,
          complemento
        }
      });
      const entrevistado = await prisma.Entrevistado.create({
        data: {
          identrevistado,
          fkpessoa: pessoa.idpessoa,
          genero,
          datanascimento,
          idade,
          fkendereco: endereco.idendereco
        }
      });

      return (pessoa, endereco, entrevistado);

    } catch (error) {
      throw console.log({
        name: 'Prisma error',
        message: "https://www.prisma.io/docs/reference/api-reference/error-reference#" + error.code,
        code: error.code,
        meta: error.meta,
        stack: 'createEntrevistado()'
      });
    }
  },
  //#endregion createEntrevistado

  //#region updateEntrevistado
  async updateEntrevistado(data) {
    const {nome, cpf, rg, genero, datanascimento, idade, pais, cep, estadoSigla, cidade, idbairro, logradouro, numero, complemento, } = data;
    try {
      const pessoa = await prisma.Pessoa.update({
        where: { idpessoa },
        data: {
          nome,
          cpf,
          rg
        }
      });

      const endereco = await prisma.Endereco.update({
        where: { idendereco },
        data: {
          idendereco,
          pais,
          cep,
          estadoSigla,
          estado,
          cidadeSigla,
          cidade,
          fkbairro,
          logradouro,
          numero,
          complemento
        }
      });

      const entrevistado = await prisma.Entrevistado.update({
        where: { idpessoa },
        data: {
          identrevistado,
          fkpessoa: pessoa.idpessoa,
          genero,
          datanascimento,
          idade,
          fkendereco: endereco.idendereco
        }
      });

      return {entrevistado, pessoa, endereco};
      
    } catch (error) {
      throw console.log({
        name: 'Prisma error',
        message: "https://www.prisma.io/docs/reference/api-reference/error-reference#" + error.code,
        code: error.code,
        meta: error.meta,
        stack: 'updateEntrevistado()'
      });
    }
  },
  //#endregion updateEntrevistado

  //TODO Verifica a necessidade de exclusão do entrevistado! Grupo
  //#region deleteEntrevistado
  async deleteEntrevistado(identrevistado) {
    const data = await prisma.Entrevistado.findUnique({ where: { identrevistado }, });
    try {
      if (!data) return false;

      // TODO se o grupo decidir manter a exclusão corrigir os erros(Melhorado)
      // const entrevistadodeletado = await prisma.Entrevistado.delete({ where: { identrevistado } })
      // const enderecoentrevistadodeletado = await prisma.Endereco.delete({ where: { identrevistado.idendereco } })
      // const pessoaentrevistadodeletado = await prisma.Pessoa.delete({ where: { identrevistado.idpessoa } })
      
      //replicado
      // return await prisma.Entrevistado.delete({
      //   where: { identrevistado },
      //   select: {
      //     nome: true,
      //     email: true,
      //     Papel: {
      //       select: {
      //         silga: true,
      //         descricao: true
      //       }
      //     },
      //   }
      // });

      return "sucesso";
      
    } catch (error) {
      throw console.log({
        name: 'Prisma error',
        message: "https://www.prisma.io/docs/reference/api-reference/error-reference#" + error.code,
        code: error.code,
        meta: error.meta,
        stack: 'deleteEntrevistado()'
      });
    }
  }
  //#endregion deleteEntrevistado

}