const router = require('express').Router();
const { status } = require('@helper/Status');

// Middlewares
const authMiddleware = require('./middlewares/auth');

// Controllers
const { authetication } = require("@controller/authentication");
const { authenticate } = require('@controller/authentication/projectController');
const { createUsuario, getUsuarioAll, getUsuarioUnique, altUsuario, delUsuario,getSupervisor } = require('@controller/usuarioController');
const { createPessoa, getPessoaAll, getPessoaUnique,altPessoa,delPessoa } = require('@controller/pessoaController');
const { createEndereco, getEnderecoAll, getEnderecoUnique,altEndereco,delEndereco } = require('@controller/enderecoController');
const { createEntrevistado, getEntrevistadoAll, getEntrevistadoUnique, altEntrevistado, delEntrevistado } = require('@controller/entrevistadoController');
const { createRegiao, getRegiaoAll, getRegiaoUnique, altRegiao, delRegiao } = require('@controller/regiaoController');
const { createBairro, getBairroAll, getBairroUnique, altBairro, delBairro } = require('@controller/bairroController');
const { createRelatorio, getRelatorioAll, getRelatorioUnique, altRelatorio, delRelatorio } = require('@controller/relatorioController');
const { createPesquisa, getPesquisaAll, getPesquisaUnique, altPesquisa, delPesquisa,getPerguntaAll } = require('@controller/pesquisaController');
const { createPapel, getPapelAll, getPapelUnique, altPapel, delPapel } = require('@controller/papelController');
const { createResposta, getRespostaAll, getRespostaUnique, altResposta, delResposta } = require('@controller/respostaController');

// Routes Authentication

router.post('/auth', authetication);
router.use(authMiddleware);
router.get('/authenticate', authenticate);

// Routes Usuario
router.get('/auth/usuario/:id', getUsuarioUnique);
router.get('/auth/usuarios', getUsuarioAll);
router.put('/auth/usuario/alterar', altUsuario);
router.post('/auth/usuario/cadastro', createUsuario);
router.delete('/auth/usuario/deletar', delUsuario);

// Routes Pessoa
router.post('/auth/pessoa/cadastro', createPessoa);
router.get('/auth/pessoa/:id', getPessoaUnique);
router.get('/auth/pessoas', getPessoaAll);
router.put('/auth/pessoa/alterar/:id', altPessoa);
router.delete('/auth/pessoa/deletar/:id', delPessoa);
router.get('/auth/supervisor',getSupervisor);

// Routes Entrevistado
router.post('/auth/entrevistado/cadastro', createEntrevistado);
router.get('/auth/entrevistados', getEntrevistadoAll);
router.get('/auth/entrevistado/:id', getEntrevistadoUnique);
router.put('/auth/entrevistado/alterar/:id', altEntrevistado);
router.delete('/auth/entrevistado/deletar/:id', delEntrevistado);

// Routes Endereco
router.post('/auth/endereco/cadastro',createEndereco);
router.get('/auth/endereco/:id',getEnderecoUnique);
router.get('/auth/enderecos',getEnderecoAll);
router.put('/auth/endereco/alterar/:id',altEndereco);
router.delete('/auth/endereco/deletar/:id',delEndereco);

// Routes Regiao
router.post('/auth/regiao/cadastro',createRegiao);
router.get('/auth/regiao/:id',getRegiaoUnique);
router.get('/auth/regioes',getRegiaoAll);
router.put('/auth/regiao/alterar/:id',altRegiao);
router.delete('/auth/regiao/deletar/:id',delRegiao);

// Routes Bairro
router.post('/auth/bairro/cadastro',createBairro);
router.get('/auth/bairro/:id',getBairroUnique);
router.get('/auth/bairros',getBairroAll);
router.put('/auth/bairro/alterar/:id',altBairro);
router.delete('/auth/bairro/deletar/:id',delBairro);

// Routes Relatorio
router.post('/auth/relatorio/cadastro',createRelatorio);
router.get('/auth/relatorio/:id',getRelatorioUnique);
router.get('/auth/relatorios',getRelatorioAll);
router.put('/auth/relatorio/alterar/:id',altRelatorio);
router.delete('/auth/relatorio/deletar/:id', delRelatorio);

// Routes Pesquisa
router.post('/auth/pesquisa/cadastro',createPesquisa);
router.get('/auth/pesquisa/:id',getPesquisaUnique);
router.get('/auth/pesquisas',getPesquisaAll);
router.get('/auth/perguntas',getPerguntaAll);
router.put('/auth/pesquisa/alterar/:id',altPesquisa);
router.delete('/auth/pesquisa/deletar/:id', delPesquisa);

// Routes Resposta
router.post('/auth/resposta/cadastro',createResposta);
router.get('/auth/resposta/:id',getRespostaUnique);
router.get('/auth/respostas',getRespostaAll);
router.put('/auth/resposta/alterar/:id',altResposta);
router.delete('/auth/resposta/deletar/:id', delResposta);

// Routes Papel
router.post('/auth/papel/cadastro',createPapel);
router.get('/auth/papel/:id',getPapelUnique);
router.get('/auth/papeis',getPapelAll);
router.put('/auth/papel/alterar/:id',altPapel);
router.delete('/auth/papel/deletar/:id',delPapel);

module.exports = router;