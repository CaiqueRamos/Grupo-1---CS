CREATE TABLE "Usuario" (
	"idusuario" serial,
	"senha" VARCHAR(155) NOT NULL,
	"email" VARCHAR(155) NOT NULL UNIQUE,
	"fkpapel" serial NOT NULL,
   	"fkpessoa" serial NOT NULL,
	"supervisor" serial NOT NULL
) WITH (
  OIDS=FALSE
); -- check

CREATE TABLE "Pessoa" (
	"idpessoa" serial,
	"nome" VARCHAR(150) NOT NULL,
	"cpf" VARCHAR(11) NOT NULL UNIQUE,
	"rg" VARCHAR(9) NOT NULL UNIQUE
)WITH(
	OIDS=FALSE
); -- check

CREATE TABLE "Endereco" (
	"idendereco" serial,
	"pais" VARCHAR(50) NOT NULL DEFAULT 'Brasil',
	"cep" INTEGER NOT NULL,
	"estadoSigla" character(2) NOT NULL DEFAULT 'MS',
	"estado" VARCHAR(255) NOT NULL DEFAULT 'Mato Grosso do Sul',
	"cidadeSigla" character(2) NOT NULL DEFAULT 'CG',
	"cidade" VARCHAR(255) NOT NULL DEFAULT 'Campo Grande',
	"fkbairro" serial NOT NULL,
	"logradouro" VARCHAR(255) NOT NULL,
	"numero" integer NOT NULL,
	"complemento" VARCHAR(255) NOT NULL
) WITH (
  OIDS=FALSE
); -- check

CREATE TABLE "Bairro" (
	"idbairro" serial,
	"nome" VARCHAR(255) NOT NULL
) WITH (
  OIDS=FALSE
); -- check

CREATE TABLE "Regiao" (
	"idregiao" serial,
  	"pkestado" serial NOT NULL,
  	"pkcidade" serial NOT NULL,
  	"fkbairro" serial NOT NULL,
	"zona" VARCHAR(80) NOT NULL
) WITH (
  OIDS=FALSE
); -- check

CREATE TABLE "Papel" (
	"idpapel" serial,
	"sigla" char(2) NOT NULL UNIQUE,
	"descricao" VARCHAR(80) NOT NULL
) WITH (
  OIDS=FALSE
); -- check

CREATE TABLE "Entrevistado" (
	"identrevistado" serial,
	"fkpessoa" serial NOT NULL,
	"genero" char(2) NOT NULL,
	"datanascimento" date NOT NULL,
	"idade" integer NOT NULL,
  	"fkendereco" serial NOT NULL,
    "telefonecontato" VARCHAR(16) NOT NULL,
    "especiedomicilioocupado" VARCHAR(64) NOT NULL,
    "tipodomicilio" VARCHAR(64) NOT NULL,
    "profissao" VARCHAR(64) NOT NULL,
    "nivelescolaridade" VARCHAR(64) NOT NULL,
    "religiao" VARCHAR(64) NOT NULL,
    "faixarendafamilia" VARCHAR(64) NOT NULL
) WITH (
  OIDS=FALSE
); -- check

CREATE TABLE "Pesquisa" (
	"idpesquisa" serial,
  	"fkentrevistado" serial NOT NULL,
	"fkusuario" serial NOT NULL,
  	"datainicio" date,
  	"datafim" date
) WITH (
  OIDS=FALSE
); -- check

CREATE TABLE "Questionario" (
	"idquestionario" serial,
	"descricao" VARCHAR(80) NOT NULL
) WITH (
  OIDS=FALSE
); -- check

CREATE TABLE "Pergunta" (
	"idpergunta" serial,
  	"fkquestionario" serial NOT NULL,
	"descricao" VARCHAR(128) NOT NULL
) WITH (
  OIDS=FALSE
); -- check

CREATE TABLE "Resposta" (
	"idresposta" serial,
	"fkquestionario" serial NOT NULL,
	"fkpesquisa" serial NOT NULL,
	"fkpergunta" serial NOT NULL,
  	"valor" VARCHAR(80) NOT NULL
) WITH (
  OIDS=FALSE
);

CREATE TABLE "Relatorio" (
	"idrelatorio" serial,
	"datainicio" date,
  	"fkpesquisa" serial NOT NULL
) WITH (
  OIDS=FALSE
);


-- INSERTS

INSERT INTO "Papel" (sigla,descricao) VALUES ('MS','ADMIN'); -- check
INSERT INTO "Papel" (sigla,descricao) VALUES ('GG','Gerente Geral'); -- check
INSERT INTO "Papel" (sigla,descricao) VALUES ('GS','Gerente de Seção'); -- check
INSERT INTO "Papel" (sigla,descricao) VALUES ('ER','Entrevistador'); -- check
INSERT INTO "Papel" (sigla,descricao) VALUES ('ET','Entrevistado '); -- check

INSERT INTO "Pessoa" (nome,cpf,rg) VALUES ('Gilson Santos','98765432199','001030806'); -- check
INSERT INTO "Pessoa" (nome,cpf,rg) VALUES ('Jeferson Lima','98765432100','001022222'); -- check
INSERT INTO "Pessoa" (nome,cpf,rg) VALUES ('Caique Ramos','98765432101','001033333'); -- check
INSERT INTO "Pessoa" (nome,cpf,rg) VALUES ('João L','98765432102','001044444'); -- check
INSERT INTO "Pessoa" (nome,cpf,rg) VALUES ('Admin','98765432103','001099999'); -- check

INSERT INTO "Usuario" (senha,email,fkpapel,fkpessoa,supervisor) VALUES ('senha!1','gilson.santos@censobr.com.br',2,1,5); -- check
INSERT INTO "Usuario" (senha,email,fkpapel,fkpessoa,supervisor) VALUES ('senha!2','jeferson.lima@censobr.com.br',2,2,5); -- check
INSERT INTO "Usuario" (senha,email,fkpapel,fkpessoa,supervisor) VALUES ('senha!3','caique.ramos@censobr.com.br',3,3,1); -- check
INSERT INTO "Usuario" (senha,email,fkpapel,fkpessoa,supervisor) VALUES ('senha!4','joao.l@censobr.com.br',3,4,2); -- check
INSERT INTO "Usuario" (senha,email,fkpapel,fkpessoa,supervisor) VALUES ('senha!0','admin@censobr.com.br',1,5,5); -- check

-- Listagem de Bairros Campo Grande
--A
INSERT INTO "Bairro" (nome) VALUES ('Água Limpa Park');
INSERT INTO "Bairro" (nome) VALUES ('Alphaville Campo Grande');
INSERT INTO "Bairro" (nome) VALUES ('Alphaville Campo Grande 3');
INSERT INTO "Bairro" (nome) VALUES ('Alves Pereira');
INSERT INTO "Bairro" (nome) VALUES ('Amambaí');
INSERT INTO "Bairro" (nome) VALUES ('Área Rural de Campo Grande');
INSERT INTO "Bairro" (nome) VALUES ('Arnaldo Estêvão Figueiredo');
INSERT INTO "Bairro" (nome) VALUES ('Ary Abussafi de Lima');

--B
INSERT INTO "Bairro" (nome) VALUES ('Bairro São Pedro');
INSERT INTO "Bairro" (nome) VALUES ('Bairro Seminário');
INSERT INTO "Bairro" (nome) VALUES ('Bom Retiro');
INSERT INTO "Bairro" (nome) VALUES ('Bonjardim');
INSERT INTO "Bairro" (nome) VALUES ('Bosque das Araras');
INSERT INTO "Bairro" (nome) VALUES ('Bosque de Avilan');
INSERT INTO "Bairro" (nome) VALUES ('Bosque Santa Mônica');
INSERT INTO "Bairro" (nome) VALUES ('Bosque Santa Mônica II');

--C
INSERT INTO "Bairro" (nome) VALUES ('Cabreúva');
INSERT INTO "Bairro" (nome) VALUES ('Caiçara');
INSERT INTO "Bairro" (nome) VALUES ('Caiobá');
INSERT INTO "Bairro" (nome) VALUES ('Campo Dourado');
INSERT INTO "Bairro" (nome) VALUES ('Carandá Bosque');
INSERT INTO "Bairro" (nome) VALUES ('Centenário');
INSERT INTO "Bairro" (nome) VALUES ('Center Park');
INSERT INTO "Bairro" (nome) VALUES ('Centro');
INSERT INTO "Bairro" (nome) VALUES ('Centro Oeste');
INSERT INTO "Bairro" (nome) VALUES ('Chácara Cachoeira');
INSERT INTO "Bairro" (nome) VALUES ('Chácara das Mansões');
INSERT INTO "Bairro" (nome) VALUES ('Chácara dos Poderes');
INSERT INTO "Bairro" (nome) VALUES ('Cohafama');
INSERT INTO "Bairro" (nome) VALUES ('Colinas de Campo Grande');
INSERT INTO "Bairro" (nome) VALUES ('Conjunto Aero Rancho');
INSERT INTO "Bairro" (nome) VALUES ('Conjunto Habitacional Estrela D´alva I');
INSERT INTO "Bairro" (nome) VALUES ('Conjunto Habitacional Estrela D´alva II');
INSERT INTO "Bairro" (nome) VALUES ('Conjunto Habitacional Estrela D´alva III');
INSERT INTO "Bairro" (nome) VALUES ('Conjunto Habitacional Jardim Talismã');
INSERT INTO "Bairro" (nome) VALUES ('Conjunto Habitacional Nascente Segredo');
INSERT INTO "Bairro" (nome) VALUES ('Conjunto Iracy Coelho III');
INSERT INTO "Bairro" (nome) VALUES ('Conjunto José Abrão');
INSERT INTO "Bairro" (nome) VALUES ('Conjunto Parati II');
INSERT INTO "Bairro" (nome) VALUES ('Conjunto Residencial Aero Rancho');
INSERT INTO "Bairro" (nome) VALUES ('Conjunto Residencial Botafogo');
INSERT INTO "Bairro" (nome) VALUES ('Conjunto Residencial Buriti');
INSERT INTO "Bairro" (nome) VALUES ('Conjunto Residencial Estrela do Sul');
INSERT INTO "Bairro" (nome) VALUES ('Conjunto Residencial Octávio Pecora');
INSERT INTO "Bairro" (nome) VALUES ('Conjunto Residencial Recanto dos Rouxinóis');
INSERT INTO "Bairro" (nome) VALUES ('Conjunto União II');
INSERT INTO "Bairro" (nome) VALUES ('Coophafe');
INSERT INTO "Bairro" (nome) VALUES ('Coophamat');
INSERT INTO "Bairro" (nome) VALUES ('Coopharádio');
INSERT INTO "Bairro" (nome) VALUES ('Coophasul');
INSERT INTO "Bairro" (nome) VALUES ('Coophatrabalho');
INSERT INTO "Bairro" (nome) VALUES ('Coophavila II');
INSERT INTO "Bairro" (nome) VALUES ('Coronel Antonino');

--D
INSERT INTO "Bairro" (nome) VALUES ('Dom Antônio Barbosa');

--E
INSERT INTO "Bairro" (nome) VALUES ('Estação Andorinhas');
INSERT INTO "Bairro" (nome) VALUES ('Estação Nova Lima');
INSERT INTO "Bairro" (nome) VALUES ('Estação Santa Maria');

--G
INSERT INTO "Bairro" (nome) VALUES ('Guanandi');
INSERT INTO "Bairro" (nome) VALUES ('Guanandi II');

--I
INSERT INTO "Bairro" (nome) VALUES ('Indubrasil');
INSERT INTO "Bairro" (nome) VALUES ('Itanhangá Park');

--J
INSERT INTO "Bairro" (nome) VALUES ('Jardim Aero Rancho');
INSERT INTO "Bairro" (nome) VALUES ('Jardim Aeroporto');
INSERT INTO "Bairro" (nome) VALUES ('Jardim Alto São Francisco');
INSERT INTO "Bairro" (nome) VALUES ('Jardim América');
INSERT INTO "Bairro" (nome) VALUES ('Jardim Anache');
INSERT INTO "Bairro" (nome) VALUES ('Jardim Antares');
INSERT INTO "Bairro" (nome) VALUES ('Jardim Arco Íris');
INSERT INTO "Bairro" (nome) VALUES ('Jardim Autonomista');
INSERT INTO "Bairro" (nome) VALUES ('Jardim Auxiliadora');
INSERT INTO "Bairro" (nome) VALUES ('Jardim Bálsamo');
INSERT INTO "Bairro" (nome) VALUES ('Jardim Batistão');
INSERT INTO "Bairro" (nome) VALUES ('Jardim Bela Vista');
INSERT INTO "Bairro" (nome) VALUES ('Jardim Bonança');
INSERT INTO "Bairro" (nome) VALUES ('Jardim Botânico');
INSERT INTO "Bairro" (nome) VALUES ('Jardim Botânico II');
INSERT INTO "Bairro" (nome) VALUES ('Jardim Campina Verde');
INSERT INTO "Bairro" (nome) VALUES ('Jardim Campo Alto');
INSERT INTO "Bairro" (nome) VALUES ('Jardim Campo Belo');
INSERT INTO "Bairro" (nome) VALUES ('Jardim Campo Nobre');
INSERT INTO "Bairro" (nome) VALUES ('Jardim Campo Verde');
INSERT INTO "Bairro" (nome) VALUES ('Jardim Canguru');
INSERT INTO "Bairro" (nome) VALUES ('Jardim Carioca');
INSERT INTO "Bairro" (nome) VALUES ('Jardim Centenário');
INSERT INTO "Bairro" (nome) VALUES ('Jardim Centro Oeste');
INSERT INTO "Bairro" (nome) VALUES ('Jardim Colibri');
INSERT INTO "Bairro" (nome) VALUES ('Jardim Colibri Ii');
INSERT INTO "Bairro" (nome) VALUES ('Jardim Colorado');
INSERT INTO "Bairro" (nome) VALUES ('Jardim Colúmbia');
INSERT INTO "Bairro" (nome) VALUES ('Jardim Corcovado');
INSERT INTO "Bairro" (nome) VALUES ('Jardim da Mooca');
INSERT INTO "Bairro" (nome) VALUES ('Jardim das Cerejeiras');
INSERT INTO "Bairro" (nome) VALUES ('Jardim das Hortências');
INSERT INTO "Bairro" (nome) VALUES ('Jardim das Macaúbas');
INSERT INTO "Bairro" (nome) VALUES ('Jardim das Meninas');
INSERT INTO "Bairro" (nome) VALUES ('Jardim das Nações');
INSERT INTO "Bairro" (nome) VALUES ('Jardim das Reginas');
INSERT INTO "Bairro" (nome) VALUES ('Jardim das Virtudes');
INSERT INTO "Bairro" (nome) VALUES ('Jardim dos Estados');
INSERT INTO "Bairro" (nome) VALUES ('Jardim Enseada dos Pássaros');
INSERT INTO "Bairro" (nome) VALUES ('Jardim Estados');
INSERT INTO "Bairro" (nome) VALUES ('Jardim Ima');
INSERT INTO "Bairro" (nome) VALUES ('Jardim Inápolis');
INSERT INTO "Bairro" (nome) VALUES ('Jardim Indianápolis');
INSERT INTO "Bairro" (nome) VALUES ('Jardim Itália');
INSERT INTO "Bairro" (nome) VALUES ('Jardim Itamaracá');
INSERT INTO "Bairro" (nome) VALUES ('Jardim Itatiaia');
INSERT INTO "Bairro" (nome) VALUES ('Jardim Jacy');
INSERT INTO "Bairro" (nome) VALUES ('Jardim Jatobá');
INSERT INTO "Bairro" (nome) VALUES ('Jardim Jockey Club');
INSERT INTO "Bairro" (nome) VALUES ('Jardim Leblon');
INSERT INTO "Bairro" (nome) VALUES ('Jardim Los Angeles');
INSERT INTO "Bairro" (nome) VALUES ('Jardim Macapá');
INSERT INTO "Bairro" (nome) VALUES ('Jardim Manaira');
INSERT INTO "Bairro" (nome) VALUES ('Jardim Mansur');
INSERT INTO "Bairro" (nome) VALUES ('Jardim Mathilde');
INSERT INTO "Bairro" (nome) VALUES ('Jardim Mato Grosso');
INSERT INTO "Bairro" (nome) VALUES ('Jardim Moema');
INSERT INTO "Bairro" (nome) VALUES ('Jardim Monte Alegre');
INSERT INTO "Bairro" (nome) VALUES ('Jardim Monte Líbano');
INSERT INTO "Bairro" (nome) VALUES ('Jardim Monterey');
INSERT INTO "Bairro" (nome) VALUES ('Jardim Montevidéu');
INSERT INTO "Bairro" (nome) VALUES ('Jardim Monumento');
INSERT INTO "Bairro" (nome) VALUES ('Jardim Morenão');
INSERT INTO "Bairro" (nome) VALUES ('Jardim Nashiville');
INSERT INTO "Bairro" (nome) VALUES ('Jardim Nhanha');
INSERT INTO "Bairro" (nome) VALUES ('Jardim Noroeste');
INSERT INTO "Bairro" (nome) VALUES ('Jardim Nossa Senhora do Perpétuo Socorro');
INSERT INTO "Bairro" (nome) VALUES ('Jardim Nova Esperança');
INSERT INTO "Bairro" (nome) VALUES ('Jardim Nova Jerusalém');
INSERT INTO "Bairro" (nome) VALUES ('Jardim Ouro Preto');
INSERT INTO "Bairro" (nome) VALUES ('Jardim Pacaembu');
INSERT INTO "Bairro" (nome) VALUES ('Jardim Paradiso');
INSERT INTO "Bairro" (nome) VALUES ('Jardim Parati');
INSERT INTO "Bairro" (nome) VALUES ('Jardim Paulista');
INSERT INTO "Bairro" (nome) VALUES ('Jardim Paulo Coelho Machado');
INSERT INTO "Bairro" (nome) VALUES ('Jardim Penfico');
INSERT INTO "Bairro" (nome) VALUES ('Jardim Petrópolis');
INSERT INTO "Bairro" (nome) VALUES ('Jardim Presidente');
INSERT INTO "Bairro" (nome) VALUES ('Jardim Radialista');
INSERT INTO "Bairro" (nome) VALUES ('Jardim Samambaia');
INSERT INTO "Bairro" (nome) VALUES ('Jardim Santa Emília');
INSERT INTO "Bairro" (nome) VALUES ('Jardim Santa Felicidade');
INSERT INTO "Bairro" (nome) VALUES ('Jardim São Bento');
INSERT INTO "Bairro" (nome) VALUES ('Jardim São Conrado');
INSERT INTO "Bairro" (nome) VALUES ('Jardim São Lourenço');
INSERT INTO "Bairro" (nome) VALUES ('Jardim Sayonara');
INSERT INTO "Bairro" (nome) VALUES ('Jardim Seminário');
INSERT INTO "Bairro" (nome) VALUES ('Jardim Sumatra');
INSERT INTO "Bairro" (nome) VALUES ('Jardim Tarumã');
INSERT INTO "Bairro" (nome) VALUES ('Jardim Tijuca');
INSERT INTO "Bairro" (nome) VALUES ('Jardim Tijuca II');
INSERT INTO "Bairro" (nome) VALUES ('Jardim Travessa Morena');
INSERT INTO "Bairro" (nome) VALUES ('Jardim Uirapuru');
INSERT INTO "Bairro" (nome) VALUES ('Jardim Veraneio');
INSERT INTO "Bairro" (nome) VALUES ('Jardim Vida Nova');
INSERT INTO "Bairro" (nome) VALUES ('Jardim Vida Nova Ii');
INSERT INTO "Bairro" (nome) VALUES ('Jardim Zé Pereira');
INSERT INTO "Bairro" (nome) VALUES ('José Maksoud');
INSERT INTO "Bairro" (nome) VALUES ('José Tavares do Couto');

--L
INSERT INTO "Bairro" (nome) VALUES ('Lagoa da Cruz');
INSERT INTO "Bairro" (nome) VALUES ('Lagoa Dourada');
INSERT INTO "Bairro" (nome) VALUES ('Lagoa Park');
INSERT INTO "Bairro" (nome) VALUES ('Loteamento Alto da Boa Vista');
INSERT INTO "Bairro" (nome) VALUES ('Loteamento Bela Laguna');
INSERT INTO "Bairro" (nome) VALUES ('Loteamento Bosque da Esperança');
INSERT INTO "Bairro" (nome) VALUES ('Loteamento Costa Verde');
INSERT INTO "Bairro" (nome) VALUES ('Loteamento Cristo Redentor');
INSERT INTO "Bairro" (nome) VALUES ('Loteamento Dona Dedé');
INSERT INTO "Bairro" (nome) VALUES ('Loteamento Marçal de Souza');
INSERT INTO "Bairro" (nome) VALUES ('Loteamento Paulo Vi');
INSERT INTO "Bairro" (nome) VALUES ('Loteamento Polo Empresarial Oeste');
INSERT INTO "Bairro" (nome) VALUES ('Loteamento Porto Bello');
INSERT INTO "Bairro" (nome) VALUES ('Loteamento Praia da Urca');
INSERT INTO "Bairro" (nome) VALUES ('Loteamento Rancho Alegre II');
INSERT INTO "Bairro" (nome) VALUES ('Loteamento Tarcila do Amaral');
INSERT INTO "Bairro" (nome) VALUES ('Loteamento Vespasiano Martins');

--M
INSERT INTO "Bairro" (nome) VALUES ('Mata do Jacinto');
INSERT INTO "Bairro" (nome) VALUES ('Mata do Segredo');
INSERT INTO "Bairro" (nome) VALUES ('Monte Carlo');
INSERT INTO "Bairro" (nome) VALUES ('Monte Castelo');
INSERT INTO "Bairro" (nome) VALUES ('Morada do Sol');
INSERT INTO "Bairro" (nome) VALUES ('Morada do Sossego');
INSERT INTO "Bairro" (nome) VALUES ('Morada do Sossego Ii');
INSERT INTO "Bairro" (nome) VALUES ('Morada dos Deuses');
INSERT INTO "Bairro" (nome) VALUES ('Morada Sol');
INSERT INTO "Bairro" (nome) VALUES ('Morada Verde');

--N
INSERT INTO "Bairro" (nome) VALUES ('North Park');
INSERT INTO "Bairro" (nome) VALUES ('Nova Campo Grande');
INSERT INTO "Bairro" (nome) VALUES ('Nova Lima');
INSERT INTO "Bairro" (nome) VALUES ('Núcleo Habitacional Buriti');
INSERT INTO "Bairro" (nome) VALUES ('Núcleo Habitacional Universitárias');
INSERT INTO "Bairro" (nome) VALUES ('Núcleo Industrial');

--P
INSERT INTO "Bairro" (nome) VALUES ('Panamá');
INSERT INTO "Bairro" (nome) VALUES ('Panorama');
INSERT INTO "Bairro" (nome) VALUES ('Parque Atlântico');
INSERT INTO "Bairro" (nome) VALUES ('Parque Dallas');
INSERT INTO "Bairro" (nome) VALUES ('Parque do Lageado');
INSERT INTO "Bairro" (nome) VALUES ('Parque do Sol');
INSERT INTO "Bairro" (nome) VALUES ('Parque dos Laranjais');
INSERT INTO "Bairro" (nome) VALUES ('Parque dos Novos Estados');
INSERT INTO "Bairro" (nome) VALUES ('Parque dos Poderes');
INSERT INTO "Bairro" (nome) VALUES ('Parque dos Sabiás');
INSERT INTO "Bairro" (nome) VALUES ('Parque Fazenda Imbirussu');
INSERT INTO "Bairro" (nome) VALUES ('Parque Iguatemi');
INSERT INTO "Bairro" (nome) VALUES ('Parque Isabel Garden´s');
INSERT INTO "Bairro" (nome) VALUES ('Parque Jatiuca');
INSERT INTO "Bairro" (nome) VALUES ('Parque Novo Século');
INSERT INTO "Bairro" (nome) VALUES ('Parque Novos Estados');
INSERT INTO "Bairro" (nome) VALUES ('Parque Poderes');
INSERT INTO "Bairro" (nome) VALUES ('Parque Residencial Azaleia');
INSERT INTO "Bairro" (nome) VALUES ('Parque Residencial dos Girassóis');
INSERT INTO "Bairro" (nome) VALUES ('Parque Residencial Iracy Coelho Nett');
INSERT INTO "Bairro" (nome) VALUES ('Parque Residencial M Área Pedrossian');
INSERT INTO "Bairro" (nome) VALUES ('Parque Residencial Rita Vieira');
INSERT INTO "Bairro" (nome) VALUES ('Parque Residencial União');
INSERT INTO "Bairro" (nome) VALUES ('Polo Empresarial');
INSERT INTO "Bairro" (nome) VALUES ('Polo Empresarial Oeste');
INSERT INTO "Bairro" (nome) VALUES ('Portal Caiobá');
INSERT INTO "Bairro" (nome) VALUES ('Portal Caiobá II');
INSERT INTO "Bairro" (nome) VALUES ('Portal do Panamá');
INSERT INTO "Bairro" (nome) VALUES ('Portal Itayara');
INSERT INTO "Bairro" (nome) VALUES ('Portal Lagoa');
INSERT INTO "Bairro" (nome) VALUES ('Porto Galo');

--R
INSERT INTO "Bairro" (nome) VALUES ('Rancho Alegre I');
INSERT INTO "Bairro" (nome) VALUES ('Rancho Alegre Iv');
INSERT INTO "Bairro" (nome) VALUES ('Recanto das Paineiras');
INSERT INTO "Bairro" (nome) VALUES ('Recanto do Cerrado');
INSERT INTO "Bairro" (nome) VALUES ('Recanto dos Pássaros');
INSERT INTO "Bairro" (nome) VALUES ('Recanto Pantaneiro');
INSERT INTO "Bairro" (nome) VALUES ('Residencial Alto Tamandaré');
INSERT INTO "Bairro" (nome) VALUES ('Residencial Ana Maria do Couto');
INSERT INTO "Bairro" (nome) VALUES ('Residencial Aquários I');
INSERT INTO "Bairro" (nome) VALUES ('Residencial Aquários Ii');
INSERT INTO "Bairro" (nome) VALUES ('Residencial Atlântico Sul');
INSERT INTO "Bairro" (nome) VALUES ('Residencial Betaville');
INSERT INTO "Bairro" (nome) VALUES ('Residencial Búzios');
INSERT INTO "Bairro" (nome) VALUES ('Residencial Cedrinho');
INSERT INTO "Bairro" (nome) VALUES ('Residencial Damha');
INSERT INTO "Bairro" (nome) VALUES ('Residencial Damha II');
INSERT INTO "Bairro" (nome) VALUES ('Residencial Estrela Park');
INSERT INTO "Bairro" (nome) VALUES ('Residencial Flores');
INSERT INTO "Bairro" (nome) VALUES ('Residencial Gabura');
INSERT INTO "Bairro" (nome) VALUES ('Residencial Gama');
INSERT INTO "Bairro" (nome) VALUES ('Residencial Ilhéus');
INSERT INTO "Bairro" (nome) VALUES ('Residencial João Alberto Área dos Santos');
INSERT INTO "Bairro" (nome) VALUES ('Residencial José Teruel Filho');
INSERT INTO "Bairro" (nome) VALUES ('Residencial Mário Covas');
INSERT INTO "Bairro" (nome) VALUES ('Residencial Nelson Trad');
INSERT INTO "Bairro" (nome) VALUES ('Residencial Oiti');
INSERT INTO "Bairro" (nome) VALUES ('Residencial Oliveira');
INSERT INTO "Bairro" (nome) VALUES ('Residencial Oliveira III');
INSERT INTO "Bairro" (nome) VALUES ('Residencial Pequena Flor');
INSERT INTO "Bairro" (nome) VALUES ('Residencial Ramez Tebet');
INSERT INTO "Bairro" (nome) VALUES ('Residencial Sírio Libanês I');
INSERT INTO "Bairro" (nome) VALUES ('Residencial Sírio Libanês II');
INSERT INTO "Bairro" (nome) VALUES ('Residencial Soter');
INSERT INTO "Bairro" (nome) VALUES ('Residencial Terra Morena');
INSERT INTO "Bairro" (nome) VALUES ('Residencial Vida Nova III');
INSERT INTO "Bairro" (nome) VALUES ('Residencial Vila Bela');
INSERT INTO "Bairro" (nome) VALUES ('Residencial Villa Lobos');
INSERT INTO "Bairro" (nome) VALUES ('Rita Vieira');
INSERT INTO "Bairro" (nome) VALUES ('Rivieira Pak');
INSERT INTO "Bairro" (nome) VALUES ('Royal Park');

--S
INSERT INTO "Bairro" (nome) VALUES ('Santa Fé');
INSERT INTO "Bairro" (nome) VALUES ('Santa Maria');
INSERT INTO "Bairro" (nome) VALUES ('Santo Antônio');
INSERT INTO "Bairro" (nome) VALUES ('São Caetano');
INSERT INTO "Bairro" (nome) VALUES ('São Francisco');
INSERT INTO "Bairro" (nome) VALUES ('Sayonara');
INSERT INTO "Bairro" (nome) VALUES ('Sítio Santa Maria');

--T
INSERT INTO "Bairro" (nome) VALUES ('Taquaral Bosque');
INSERT INTO "Bairro" (nome) VALUES ('Tayama Park');
INSERT INTO "Bairro" (nome) VALUES ('Terras Alfha Campo Grande');
INSERT INTO "Bairro" (nome) VALUES ('Tiradentes');

--U
INSERT INTO "Bairro" (nome) VALUES ('Universitário');

--V
INSERT INTO "Bairro" (nome) VALUES ('Varanda do Campo');
INSERT INTO "Bairro" (nome) VALUES ('Vila Adelina');
INSERT INTO "Bairro" (nome) VALUES ('Vila Aimoré');
INSERT INTO "Bairro" (nome) VALUES ('Vila Alba');
INSERT INTO "Bairro" (nome) VALUES ('Vila Albuquerque');
INSERT INTO "Bairro" (nome) VALUES ('Vila Almeida');
INSERT INTO "Bairro" (nome) VALUES ('Vila Anahy');
INSERT INTO "Bairro" (nome) VALUES ('Vila Antonieta');
INSERT INTO "Bairro" (nome) VALUES ('Vila Antônio Vendas');
INSERT INTO "Bairro" (nome) VALUES ('Vila Antunes');
INSERT INTO "Bairro" (nome) VALUES ('Vila Bandeirante');
INSERT INTO "Bairro" (nome) VALUES ('Vila Barão Rio Branco');
INSERT INTO "Bairro" (nome) VALUES ('Vila Base Aérea');
INSERT INTO "Bairro" (nome) VALUES ('Vila Belo Horizonte');
INSERT INTO "Bairro" (nome) VALUES ('Vila Bordon');
INSERT INTO "Bairro" (nome) VALUES ('Vila Carlota');
INSERT INTO "Bairro" (nome) VALUES ('Vila Carvalho');
INSERT INTO "Bairro" (nome) VALUES ('Vila Célia');
INSERT INTO "Bairro" (nome) VALUES ('Vila Cidade Morena');
INSERT INTO "Bairro" (nome) VALUES ('Vila Clélia');
INSERT INTO "Bairro" (nome) VALUES ('Vila Danúbio Azul');
INSERT INTO "Bairro" (nome) VALUES ('Vila do Polonês');
INSERT INTO "Bairro" (nome) VALUES ('Vila Duque de Caxias');
INSERT INTO "Bairro" (nome) VALUES ('Vila Eliane');
INSERT INTO "Bairro" (nome) VALUES ('Vila Entroncamento');
INSERT INTO "Bairro" (nome) VALUES ('Vila Fernanda');
INSERT INTO "Bairro" (nome) VALUES ('Vila Flores');
INSERT INTO "Bairro" (nome) VALUES ('Vila Florio');
INSERT INTO "Bairro" (nome) VALUES ('Vila Futurista');
INSERT INTO "Bairro" (nome) VALUES ('Vila Giocondo Orsi');
INSERT INTO "Bairro" (nome) VALUES ('Vila Glória');
INSERT INTO "Bairro" (nome) VALUES ('Vila Gomes');
INSERT INTO "Bairro" (nome) VALUES ('Vila Ieda');
INSERT INTO "Bairro" (nome) VALUES ('Vila Ipiranga');
INSERT INTO "Bairro" (nome) VALUES ('Vila Jardim Botafogo');
INSERT INTO "Bairro" (nome) VALUES ('Vila Julieta');
INSERT INTO "Bairro" (nome) VALUES ('Vila Jussara');
INSERT INTO "Bairro" (nome) VALUES ('Vila Maciel');
INSERT INTO "Bairro" (nome) VALUES ('Vila Manoel Costa Lima');
INSERT INTO "Bairro" (nome) VALUES ('Vila Manoel da Costa Lima');
INSERT INTO "Bairro" (nome) VALUES ('Vila Manoel Secco Thomé');
INSERT INTO "Bairro" (nome) VALUES ('Vila Manoel Taveira');
INSERT INTO "Bairro" (nome) VALUES ('Vila Marcos Roberto');
INSERT INTO "Bairro" (nome) VALUES ('Vila Margarida');
INSERT INTO "Bairro" (nome) VALUES ('Vila Marli');
INSERT INTO "Bairro" (nome) VALUES ('Vila Matel');
INSERT INTO "Bairro" (nome) VALUES ('Vila Miguel Couto');
INSERT INTO "Bairro" (nome) VALUES ('Vila Moreninha II');
INSERT INTO "Bairro" (nome) VALUES ('Vila Moreninha III');
INSERT INTO "Bairro" (nome) VALUES ('Vila Moreninha IV');
INSERT INTO "Bairro" (nome) VALUES ('Vila Morumbi');
INSERT INTO "Bairro" (nome) VALUES ('Vila Nascente');
INSERT INTO "Bairro" (nome) VALUES ('Vila Nasser');
INSERT INTO "Bairro" (nome) VALUES ('Vila Nathália');
INSERT INTO "Bairro" (nome) VALUES ('Vila Neusa');
INSERT INTO "Bairro" (nome) VALUES ('Vila Nogueira');
INSERT INTO "Bairro" (nome) VALUES ('Vila Nossa Senhora das Graças');
INSERT INTO "Bairro" (nome) VALUES ('Vila Nova Campo Grande');
INSERT INTO "Bairro" (nome) VALUES ('Vila Nova Capital');
INSERT INTO "Bairro" (nome) VALUES ('Vila Olinda');
INSERT INTO "Bairro" (nome) VALUES ('Vila Palmira');
INSERT INTO "Bairro" (nome) VALUES ('Vila Paraíso');
INSERT INTO "Bairro" (nome) VALUES ('Vila Piratininga');
INSERT INTO "Bairro" (nome) VALUES ('Vila Planalto');
INSERT INTO "Bairro" (nome) VALUES ('Vila Popular');
INSERT INTO "Bairro" (nome) VALUES ('Vila Progresso');
INSERT INTO "Bairro" (nome) VALUES ('Vila Ravenna');
INSERT INTO "Bairro" (nome) VALUES ('Vila Rica');
INSERT INTO "Bairro" (nome) VALUES ('Vila Romana');
INSERT INTO "Bairro" (nome) VALUES ('Vila Rosa Pires');
INSERT INTO "Bairro" (nome) VALUES ('Vila Santa Dorotheia');
INSERT INTO "Bairro" (nome) VALUES ('Vila Santa Lúcia');
INSERT INTO "Bairro" (nome) VALUES ('Vila Santa Luzia');
INSERT INTO "Bairro" (nome) VALUES ('Vila Santo Amaro');
INSERT INTO "Bairro" (nome) VALUES ('Vila Santo Eugênio');
INSERT INTO "Bairro" (nome) VALUES ('Vila São Bento');
INSERT INTO "Bairro" (nome) VALUES ('Vila São Jorge da Lagoa');
INSERT INTO "Bairro" (nome) VALUES ('Vila Sargento Amaral');
INSERT INTO "Bairro" (nome) VALUES ('Vila Serradinho');
INSERT INTO "Bairro" (nome) VALUES ('Vila Sílvia Regina');
INSERT INTO "Bairro" (nome) VALUES ('Vila Taquarussu');
INSERT INTO "Bairro" (nome) VALUES ('Vila Taveirópolis');
INSERT INTO "Bairro" (nome) VALUES ('Vila Tupaciretan');
INSERT INTO "Bairro" (nome) VALUES ('Vila Valparaíso');
INSERT INTO "Bairro" (nome) VALUES ('Vila Vilas Boas');
INSERT INTO "Bairro" (nome) VALUES ('Vila Volpe II');
INSERT INTO "Bairro" (nome) VALUES ('Vivenda Bosque');
INSERT INTO "Bairro" (nome) VALUES ('Vivenda do Bosque');
INSERT INTO "Bairro" (nome) VALUES ('Vivendas do Bosque');
INSERT INTO "Bairro" (nome) VALUES ('Vivendas do Parque');

--Z
INSERT INTO "Bairro" (nome) VALUES ('Zona Rural');    

-- Fim Listagem de Bairros Campo Grande

INSERT INTO "Endereco" (cep,fkbairro,logradouro,numero,complemento) VALUES ('79000000',1,'Rua Divisão',1098,'Condominio Parati - casa 36'); -- check
INSERT INTO "Endereco" (cep,fkbairro,logradouro,numero,complemento) VALUES ('79000001',2,'Rua Gunter Hans',4872,'Ap.4'); -- check
 
INSERT INTO "Regiao" (pkestado,pkcidade,fkbairro,zona) VALUES (1,1,1,'CENTRO'); -- check
INSERT INTO "Regiao" (pkestado,pkcidade,fkbairro,zona) VALUES (1,1,2,'PROSA'); -- check
INSERT INTO "Regiao" (pkestado,pkcidade,fkbairro,zona) VALUES (1,1,3,'SEGREDO'); -- check
INSERT INTO "Regiao" (pkestado,pkcidade,fkbairro,zona) VALUES (1,1,4,'IMBIRUSSU'); -- check
INSERT INTO "Regiao" (pkestado,pkcidade,fkbairro,zona) VALUES (1,1,5,'ANHANDUIZINHO'); -- check
INSERT INTO "Regiao" (pkestado,pkcidade,fkbairro,zona) VALUES (1,1,6,'BANDEIRA'); -- check

-- Questionario 
INSERT INTO "Questionario" (descricao) VALUES ('Resquisitos basicos de moradias');
INSERT INTO "Questionario" (descricao) VALUES ('Satisfação de moradias');


-- Perguntas 
INSERT INTO "Pergunta" (fkquestionario,descricao) VALUES (1,'Onde você reside possui saneamento básico?');

INSERT INTO "Pergunta" (fkquestionario,descricao) VALUES (1,'Onde você reside sistema de eletricidade?');

INSERT INTO "Pergunta" (fkquestionario,descricao) VALUES (1,'Onde você reside é asfaltado?');

INSERT INTO "Pergunta" (fkquestionario,descricao) VALUES (1,'Onde você reside possui sistema de esgoto?');

INSERT INTO "Pergunta" (fkquestionario,descricao) VALUES (1,'Onde você reside possui acesso a internet?');

INSERT INTO "Pergunta" (fkquestionario,descricao) VALUES (1,'Onde você reside possui acesso a rede de água?');

INSERT INTO "Pergunta" (fkquestionario,descricao) VALUES (1,'Onde você reside possui policiamento frequente?');

INSERT INTO "Pergunta" (fkquestionario,descricao) VALUES (1,'Onde você reside possui acesso a transporte coletivo?');

INSERT INTO "Pergunta" (fkquestionario,descricao) VALUES (2,'O que você acha do sistema de saneamento básico?');

INSERT INTO "Pergunta" (fkquestionario,descricao) VALUES (2,'O que você acha do sistema de eletricidade?');

INSERT INTO "Pergunta" (fkquestionario,descricao) VALUES (2,'O que você acha dos asfaltos da cidade?');

INSERT INTO "Pergunta" (fkquestionario,descricao) VALUES (2,'O que você acha do sistema de esgoto?');

INSERT INTO "Pergunta" (fkquestionario,descricao) VALUES (2,'O que você acha das redes de internet?');

INSERT INTO "Pergunta" (fkquestionario,descricao) VALUES (2,'O que você acha da rede de água?');

INSERT INTO "Pergunta" (fkquestionario,descricao) VALUES (2,'O que você acha do policiamento?');

INSERT INTO "Pergunta" (fkquestionario,descricao) VALUES (2,'O que você acha do atendimento das UPAS?');

INSERT INTO "Pergunta" (fkquestionario,descricao) VALUES (2,'O que você acha do atendimento das UBS?');

INSERT INTO "Pergunta" (fkquestionario,descricao) VALUES (2,'O que você acha sobre os transportes coletivos?');

-- Entrevistado
INSERT INTO "Entrevistado" (fkpessoa,genero,datanascimento,idade,fkendereco,telefonecontato,especiedomicilioocupado,tipodomicilio,profissao,nivelescolaridade,religiao,faixarendafamilia) VALUES (1,'M','1994/08/09',28,1,'67993227954','Própria em aquisição','Casa','Desenhista Industrial','Ensino superior incompleto','Sem religião','De três Salários até quatro Salários mínimos(4.848,00)');

-- Pequisa
INSERT INTO "Pesquisa" (fkentrevistado,fkusuario,datainicio,datafim) VALUES (1,1,current_date,current_date);

-- Respostas

INSERT INTO "Resposta" (fkquestionario,fkpesquisa,fkpergunta,valor) VALUES (1,1,1,'SIM');
INSERT INTO "Resposta" (fkquestionario,fkpesquisa,fkpergunta,valor) VALUES (1,1,2,'SIM');
INSERT INTO "Resposta" (fkquestionario,fkpesquisa,fkpergunta,valor) VALUES (1,1,3,'NÃO');
INSERT INTO "Resposta" (fkquestionario,fkpesquisa,fkpergunta,valor) VALUES (1,1,4,'SIM');
INSERT INTO "Resposta" (fkquestionario,fkpesquisa,fkpergunta,valor) VALUES (1,1,5,'NÃO');
INSERT INTO "Resposta" (fkquestionario,fkpesquisa,fkpergunta,valor) VALUES (1,1,6,'NÃO');
INSERT INTO "Resposta" (fkquestionario,fkpesquisa,fkpergunta,valor) VALUES (1,1,7,'SIM');
INSERT INTO "Resposta" (fkquestionario,fkpesquisa,fkpergunta,valor) VALUES (1,1,8,'NÃO');

-- PRIMARY KEY
ALTER TABLE "Usuario"
    ADD CONSTRAINT idusuario_pkey PRIMARY KEY (idusuario); -- check

ALTER TABLE "Pessoa"
    ADD CONSTRAINT idpessoa_pkey PRIMARY KEY (idpessoa); -- check

ALTER TABLE "Endereco"
    ADD CONSTRAINT idendereco_pkey PRIMARY KEY (idendereco); -- check
    
ALTER TABLE "Bairro"
    ADD CONSTRAINT idbairro_pkey PRIMARY KEY (idbairro); -- check
    
ALTER TABLE "Regiao"
    ADD CONSTRAINT idregiao_pkey PRIMARY KEY (idregiao); -- check

-- ALTER TABLE "Regiao"
--     ADD CONSTRAINT pkestado_pkey PRIMARY KEY (pkestado); -- check
    
-- ALTER TABLE "Regiao"
--     ADD CONSTRAINT pkcidade_pkey PRIMARY KEY (pkcidade); -- check

ALTER TABLE "Papel"
    ADD CONSTRAINT idpapel_pkey PRIMARY KEY (idpapel); -- check

ALTER TABLE "Entrevistado"
    ADD CONSTRAINT identrevistado_pkey PRIMARY KEY (identrevistado); -- check

ALTER TABLE "Questionario"
    ADD CONSTRAINT idquestionario_pkey PRIMARY KEY (idquestionario); -- check

ALTER TABLE "Pesquisa"
    ADD CONSTRAINT idpesquisa_pkey PRIMARY KEY (idpesquisa); -- check
    
ALTER TABLE "Pergunta"
    ADD CONSTRAINT idperguntas_pkey PRIMARY KEY (idpergunta); -- check
    
ALTER TABLE "Resposta"
    ADD CONSTRAINT idrespostas_pkey PRIMARY KEY (idresposta); -- check

ALTER TABLE "Relatorio"
    ADD CONSTRAINT idrelatorio_pkey PRIMARY KEY (idrelatorio); -- check


-- FOREIGN KEY
ALTER TABLE "Usuario" ADD CONSTRAINT "Papel_fk" FOREIGN KEY ("fkpapel") REFERENCES "Papel"("idpapel"); -- check
ALTER TABLE "Usuario" ADD CONSTRAINT "Supervisor_fk" FOREIGN KEY ("supervisor") REFERENCES "Usuario"("idusuario"); -- check
ALTER TABLE "Usuario" ADD CONSTRAINT "Pessoa_fk" FOREIGN KEY ("fkpessoa") REFERENCES "Pessoa"("idpessoa"); -- check

ALTER TABLE "Endereco" ADD CONSTRAINT "Bairro" FOREIGN KEY ("fkbairro") REFERENCES "Bairro"("idbairro");  -- check

ALTER TABLE "Regiao" ADD CONSTRAINT "Bairro_fk" FOREIGN KEY ("fkbairro") REFERENCES "Bairro"("idbairro"); -- check

ALTER TABLE "Entrevistado" ADD CONSTRAINT "Endereco_fk" FOREIGN KEY ("fkendereco") REFERENCES "Endereco"("idendereco"); -- check
ALTER TABLE "Entrevistado" ADD CONSTRAINT "Pessoa_fk" FOREIGN KEY ("fkpessoa") REFERENCES "Pessoa"("idpessoa"); -- check

ALTER TABLE "Pesquisa" ADD CONSTRAINT "Entrevistado_fk" FOREIGN KEY ("fkentrevistado") REFERENCES "Entrevistado"("identrevistado"); -- check
ALTER TABLE "Pesquisa" ADD CONSTRAINT "Pessoa_fk" FOREIGN KEY ("fkusuario") REFERENCES "Usuario"("idusuario"); -- check

ALTER TABLE "Pergunta" ADD CONSTRAINT "Questionario_fk" FOREIGN KEY ("fkquestionario") REFERENCES "Questionario"("idquestionario"); -- check

ALTER TABLE "Resposta" ADD CONSTRAINT "Questionario_fk" FOREIGN KEY ("fkquestionario") REFERENCES "Questionario"("idquestionario"); -- check

ALTER TABLE "Resposta" ADD CONSTRAINT "Pergunta_fk" FOREIGN KEY ("fkpergunta") REFERENCES "Pergunta"("idpergunta"); -- check

ALTER TABLE "Resposta" ADD CONSTRAINT "Pesquisa_fk" FOREIGN KEY ("fkpesquisa") REFERENCES "Pesquisa"("idpesquisa"); -- check

ALTER TABLE "Relatorio" ADD CONSTRAINT "Pesquisa_fk" FOREIGN KEY ("fkpesquisa") REFERENCES "Pesquisa"("idpesquisa"); -- check