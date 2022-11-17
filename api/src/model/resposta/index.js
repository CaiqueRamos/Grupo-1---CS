const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
module.exports = {
  //#region getRespostaAll
  async getRespostaAll() {
    try {
      return await prisma.Resposta.findMany(
        {
          select: {
            idresposta: true,
            fkquestionario:true,
            fkpergunta:true,
            fkpesquisa:true,
            valor:true,
            Pergunta:true,
            Questionario:true
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
        stack: 'getRespostaAll()'
      });
    }
  },
  //#endregion getRespostaAll

  //#region getRespostaUnique
  async getRespostaUnique(data) {
    const { id } = data;
    if (!id) return false;
    try {
      return await prisma.resposta.findUnique({
        where: { idresposta:parseInt(id) },
        select: {
          idresposta: true,
          fkquestionario:true,
          fkpergunta:true,
          fkpesquisa:true,
          valor:true,
          Pergunta:true,
          Questionario:true
        }
      });
    } catch (error) {
      throw console.log({
        error,
        name: 'Prisma error',
        message: "https://www.prisma.io/docs/reference/api-reference/error-reference#" + error.code,
        code: error.code,
        meta: error.meta,
        stack: 'getRespostaUnique()'
      });
    }
  },
  //#endregion getRespostaUnique
  //#region createResposta
  async createResposta(data) {
    const { fkquestionario, fkpesquisa,fkpergunta,valor } = data;
    try {
      return await prisma.Resposta.create({
        data: {
          fkquestionario,
          fkpesquisa,
          fkpergunta,
          valor
        }
      });
    } catch (error) {
      throw console.log({
        error,
        name: 'Prisma error',
        message: "https://www.prisma.io/docs/reference/api-reference/error-reference#" + error.code,
        code: error.code,
        meta: error.meta,
        stack: 'createResposta()'
      });
    }
  },
  //#endregion createResposta

  //#region updateResposta 
  async updateResposta(data) {
    const { id,fkquestionario,fkpergunta, valor } = data;
    try {
      return await prisma.Resposta.update({
        where: { idresposta:parseInt(id) },
        data: {
          fkquestionario:parseInt(fkquestionario),
          fkpergunta:parseInt(fkpergunta),
          valor
        }
      });
    } catch (error) {
      throw console.log({
        error,
        name: 'Prisma error',
        message: "https://www.prisma.io/docs/reference/api-reference/error-reference#" + error.code,
        code: error.code,
        meta: error.meta,
        stack: 'updateResposta()'
      });
    }
  },
  //#endregion updateResposta

  //#region deleteResposta
  async deleteResposta(data) {
    const {id} = data;
    const resposta = await prisma.Resposta.findUnique({where:{idresposta:parseInt(id)}});
    try {
      if (!resposta) return false;
      return await prisma.Resposta.delete({
        where: { idresposta:resposta.idresposta },
        select: {
          idresposta: true,
          fkquestionario:true,
          fkpergunta:true,
          fkpesquisa:true,
          valor:true,
          Pergunta:true,
          Questionario:true
        }
      });
    } catch (error) {
      throw console.log({
        error,
        name: 'Prisma error',
        message: "https://www.prisma.io/docs/reference/api-reference/error-reference#" + error.code,
        code: error.code,
        meta: error.meta,
        stack: 'deleteResposta()'
      });
    }
  }
  //#endregion deleteResposta
}