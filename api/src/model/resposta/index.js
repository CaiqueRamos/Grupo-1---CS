const prisma = require('@db');
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
    const { idresposta } = data;
    if (!idresposta) return false;
    try {
      return await prisma.Resposta.findUnique({
        where: { idresposta },
        select: {
          idresposta: true,
          fkquestionario:true,
          fkperguntas:true,
          valor:true,
          Perguntas:true,
          Questionario:true
        }
      });
    } catch (error) {
      throw console.log({
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
    const { fkquestionario, fkperguntas, valor } = data;
    console.log(data);
    try {
      return await prisma.Resposta.create({
        data:{
          fkquestionario:true,
          fkperguntas:true,
          valor:true
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
    const { idresposta,fkquestionario, fkperguntas, valor } = data;
    try {
      return await prisma.Resposta.update({
        where: { idresposta },
        data: {
          fkquestionario,
          fkperguntas,
          valor
        }
      });
    } catch (error) {
      throw console.log({
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
    const {idresposta} = data;
    const resposta = await prisma.Resposta.findUnique({where:{ idresposta }});
    try {
      if (!resposta) return false;
      return await prisma.Resposta.delete({
        where: { idResposta },
        select: {
          fkquestionario:true,
          fkperguntas:true,
          valor:true
        }
      });
    } catch (error) {
      throw console.log({
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