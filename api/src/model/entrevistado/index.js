const prisma = require('@db');
module.exports = {
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
    const { id } = data;
    if (!id) return false;
    try {
      return await prisma.Entrevistado.findUnique({
        where: { identrevistado:parseInt(id) },
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
    const {fkpessoa, genero, datanascimento, idade, fkendereco, telefonecontato, especiedomicilioocupado, tipodomicilio, profissao, nivelescolaridade, religiao, faixarendafamilia} = data;
    try {
      const entrevistado = await prisma.Entrevistado.create({
        data: {
          fkpessoa,
          genero,
          datanascimento: new Date(datanascimento),
          idade,
          fkendereco,
          telefonecontato,
          especiedomicilioocupado,
          tipodomicilio,
          profissao,
          nivelescolaridade,
          religiao,
          faixarendafamilia
        }
      });

      return entrevistado;

    } catch (error) {
      throw console.log({
        error,
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
    const {id,fkpessoa, genero, datanascimento, idade, fkendereco, telefonecontato, especiedomicilioocupado, tipodomicilio, profissao, nivelescolaridade, religiao, faixarendafamilia} = data;
    try {
      let entrevistado = await this.getEntrevistadoUnique({id});
      if(!entrevistado) return false;
      entrevistado = await prisma.Entrevistado.update({
        where: { identrevistado:entrevistado.identrevistado },
        data: {
          fkpessoa,
          genero,
          datanascimento: new Date(datanascimento),
          idade,
          fkendereco,
          telefonecontato,
          especiedomicilioocupado,
          tipodomicilio,
          profissao,
          nivelescolaridade,
          religiao,
          faixarendafamilia
        }
      });

      return entrevistado;
      
    } catch (error) {
      throw console.log({
        error,
        name: 'Prisma error',
        message: "https://www.prisma.io/docs/reference/api-reference/error-reference#" + error.code,
        code: error.code,
        meta: error.meta,
        stack: 'updateEntrevistado()'
      });
    }
  },
  //#endregion updateEntrevistado

  //#region deleteEntrevistado
  async deleteEntrevistado(data) {
    const {id} = data;
    if(!id) return false;
    data = await getEntrevistadoUnique({id});
    try {
      if (!data) return false;
      return await prisma.Entrevistado.delete({
        where:{identrevistado:data.identrevistado},
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
      })
      
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