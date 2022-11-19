/* eslint-disable no-fallthrough */
import React, { useState, useContext, useEffect } from "react";
import {
    Text, HStack, Flex, Box, Image, Link, Input, Alert, AlertIcon, FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Button, Radio, RadioGroup, Stack
} from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik';
import { CreatePessoa } from "../../fetchers/CreatePessoa"
import { CreateEndereco } from "../../fetchers/CreateEndereco"

import loginImg from "../../dist/login.svg"
import logo from "../../dist/logo.svg"
import { useMediaContext } from "../../hook/useMediaContext";
import { CreateEntrevistado } from "../../fetchers/CreateEntrevistado";
import { GetPerguntas } from "../../fetchers/GetPerguntas";
import { CreatePesquisa } from "../../fetchers/CreatePesquisa";

export const NovaPesquisa = () => {

    const { isDesktop } = useMediaContext();
    const [q1, setQ1] = useState();
    const [q2, setQ2] = useState();
    const [q3, setQ3] = useState();
    const [q4, setQ4] = useState();
    const [q5, setQ5] = useState();
    const [q6, setQ6] = useState();
    const [q7, setQ7] = useState();
    const [q8, setQ8] = useState();
    const [perguntas, setPerguntas] = useState();

    function validateInput(value) {
        let error
        if (!value) {
            error = 'Campo Obrigatório!'
        }
        return error
    }

    let resposta = [
        {
            "fkquestionario": 1,
            "fkpergunta": 73,
            "valor": q1
        },
        {
            "fkquestionario": 1,
            "fkpergunta": 74,
            "valor": q2
        },
        {
            "fkquestionario": 1,
            "fkpergunta": 75,
            "valor": q3
        },
        {
            "fkquestionario": 1,
            "fkpergunta": 76,
            "valor": q4
        },
        {
            "fkquestionario": 1,
            "fkpergunta": 77,
            "valor": q5
        },
        {
            "fkquestionario": 1,
            "fkpergunta": 78,
            "valor": q6
        },
        {
            "fkquestionario": 1,
            "fkpergunta": 79,
            "valor": q7
        },
        {
            "fkquestionario": 1,
            "fkpergunta": 80,
            "valor": q8
        }
    ]
    useEffect(() => {
        (async function () {
            let response = await GetPerguntas(localStorage.getItem("token"));
            setPerguntas(response);
            console.log(response)
        })();
    }, [])

    const valuesUserData = {
        nome: '',
        cpf: '',
        rg: '',
        genero: '',
        idade: '',
        logradouro: '',
        numero: '',

    }



    const getCompStep = () => {
        return <Formik
            initialValues={valuesUserData}
            onSubmit={async (values, actions) => {

                CreatePesquisa(values.nome, values.cpf, values.rg, values.genero,
                    parseInt(values.idade), values.logradouro, parseInt(values.numero), q1, q2, q3, q4, q5, q6, q7, q8,
                    localStorage.getItem("token"));
                window.location.href = "/pesquisas"
            }}
        >
            {(props) => (
                <Form>
                    <Text fontWeight="bold" fontSize="2rem" color="white">Informações do Entrevistado</Text>
                    <Flex>
                        <Field name='nome' validate={validateInput}>
                            {({ field, form }) => (
                                <FormControl isInvalid={form.errors.nome && form.touched.nome} mr="5">
                                    <FormLabel color="white">Nome</FormLabel>
                                    <Input {...field} placeholder='nome' color='white' _placeholder={{ color: 'white', opacity: 0.4 }} />
                                    <FormErrorMessage>{form.errors.nome}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Field name='cpf' validate={validateInput}>
                            {({ field, form }) => (
                                <FormControl isInvalid={form.errors.cpf && form.touched.cpf} mr="5">
                                    <FormLabel color="white">CPF</FormLabel>
                                    <Input {...field} placeholder='cpf' color='white' _placeholder={{ color: 'white', opacity: 0.4 }} />
                                    <FormErrorMessage>{form.errors.cpf}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>

                        <Field name='rg' validate={validateInput}>
                            {({ field, form }) => (
                                <FormControl isInvalid={form.errors.rg && form.touched.rg} mr="5">
                                    <FormLabel color="white">RG</FormLabel>
                                    <Input {...field} placeholder='rg' color='white' _placeholder={{ color: 'white', opacity: 0.4 }} />
                                    <FormErrorMessage>{form.errors.rg}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Field name='genero' validate={validateInput}>
                            {({ field, form }) => (
                                <FormControl isInvalid={form.errors.genero && form.touched.genero}>
                                    <FormLabel color="white">Genero</FormLabel>
                                    <Input {...field} placeholder='genero' color='white' _placeholder={{ color: 'white', opacity: 0.4 }} />
                                    <FormErrorMessage>{form.errors.genero}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                    </Flex>
                    <Flex mt="20px">
                        <Field name='idade' validate={validateInput}>
                            {({ field, form }) => (
                                <FormControl isInvalid={form.errors.idade && form.touched.idade} mr="5">
                                    <FormLabel color="white">Idade</FormLabel>
                                    <Input {...field} placeholder='idade' color='white' _placeholder={{ color: 'white', opacity: 0.4 }} />
                                    <FormErrorMessage>{form.errors.idade}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Field name='logradouro' validate={validateInput}>
                            {({ field, form }) => (
                                <FormControl isInvalid={form.errors.logradouro && form.touched.logradouro} mr="5">
                                    <FormLabel color="white">Logradouro</FormLabel>
                                    <Input {...field} placeholder='logradouro' color='white' _placeholder={{ color: 'white', opacity: 0.4 }} />
                                    <FormErrorMessage>{form.errors.logradouro}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Field name='numero' validate={validateInput}>
                            {({ field, form }) => (
                                <FormControl isInvalid={form.errors.numero && form.touched.numero} mr="5">
                                    <FormLabel color="white">Número</FormLabel>
                                    <Input {...field} placeholder='numero' color='white' _placeholder={{ color: 'white', opacity: 0.4 }} />
                                    <FormErrorMessage>{form.errors.numero}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Field name='municipio' validate={validateInput}>
                            {({ field, form }) => (
                                <FormControl isInvalid={form.errors.municipio && form.touched.municipio}  >
                                    <FormLabel color="white">Município</FormLabel>
                                    <Input {...field} placeholder='municipio' color='white' _placeholder={{ color: 'white', opacity: 0.4 }} />
                                    <FormErrorMessage>{form.errors.municipio}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                    </Flex>
                    <Text fontWeight="bold" fontSize="2rem" color="white">Perguntas</Text>

                    {
                        perguntas && <Box>
                            <FormLabel color="white" fontSize="1rem" mt="15px">
                                Onde você reside possui saneamento básico? - 73
                            </FormLabel>
                            <RadioGroup onChange={setQ1} value={q1}>
                                <Stack direction='row' color="white">
                                    <Radio value='Sim' color="white">SIM</Radio>
                                    <Radio value='Não' color="white">NÃO</Radio>
                                </Stack>
                            </RadioGroup>
                            <FormLabel color="white" fontSize="1rem" mt="15px">
                                Onde você reside sistema de eletricidade? - 74
                            </FormLabel>
                            <RadioGroup onChange={setQ2} value={q2}>
                                <Stack direction='row' color="white">
                                    <Radio value='Sim' color="white">SIM</Radio>
                                    <Radio value='Não' color="white">NÃO</Radio>
                                </Stack>
                            </RadioGroup>
                            <FormLabel color="white" fontSize="1rem" mt="15px">
                                Onde você reside é asfaltado? - 75
                            </FormLabel>
                            <RadioGroup onChange={setQ3} value={q3}>
                                <Stack direction='row' color="white">
                                    <Radio value='Sim' color="white">SIM</Radio>
                                    <Radio value='Não' color="white">NÃO</Radio>
                                </Stack>
                            </RadioGroup>
                            <FormLabel color="white" fontSize="1rem" mt="15px">
                                Onde você reside possui sistema de esgoto? - 76
                            </FormLabel>
                            <RadioGroup onChange={setQ4} value={q4}>
                                <Stack direction='row' color="white">
                                    <Radio value='Sim' color="white">SIM</Radio>
                                    <Radio value='Não' color="white">NÃO</Radio>
                                </Stack>
                            </RadioGroup>
                            <FormLabel color="white" fontSize="1rem" mt="15px">
                                Onde você reside possui acesso a internet? - 77
                            </FormLabel>
                            <RadioGroup onChange={setQ5} value={q5}>
                                <Stack direction='row' color="white">
                                    <Radio value='Sim' color="white">SIM</Radio>
                                    <Radio value='Não' color="white">NÃO</Radio>
                                </Stack>
                            </RadioGroup>
                            <FormLabel color="white" fontSize="1rem" mt="15px">
                                Onde você reside possui acesso a rede de água? - 78
                            </FormLabel>
                            <RadioGroup onChange={setQ6} value={q6}>
                                <Stack direction='row' color="white">
                                    <Radio value='Sim' color="white">SIM</Radio>
                                    <Radio value='Não' color="white">NÃO</Radio>
                                </Stack>
                            </RadioGroup>
                            <FormLabel color="white" fontSize="1rem" mt="15px">
                                Onde você reside possui policiamento frequente? - 79
                            </FormLabel>
                            <RadioGroup onChange={setQ7} value={q7}>
                                <Stack direction='row' color="white">
                                    <Radio value='Sim' color="white">SIM</Radio>
                                    <Radio value='Não' color="white">NÃO</Radio>
                                </Stack>
                            </RadioGroup>
                            <FormLabel color="white" fontSize="1rem" mt="15px">
                                Onde você reside possui acesso a transporte coletivo? - 80
                            </FormLabel>
                            <RadioGroup onChange={setQ8} value={q8}>
                                <Stack direction='row' color="white">
                                    <Radio value='Sim' color="white">SIM</Radio>
                                    <Radio value='Não' color="white">NÃO</Radio>
                                </Stack>
                            </RadioGroup>
                        </Box>
                    }



                    <Flex>

                    </Flex>

                    <Box w="full" justifyContent='end' display="flex">
                        <Button
                            w="20%"
                            bgColor="grey"
                            mt={4}
                            isLoading={props.isSubmitting}
                            onClick={() => window.location.href = "/gestao"}
                            color="white"
                            mr="10"
                        >
                            Cancelar
                        </Button>
                        <Button
                            w="20%"
                            bgColor="orange"
                            mt={4}
                            isLoading={props.isSubmitting}
                            type='submit'
                            color="white"
                        >
                            Concluir
                        </Button>
                    </Box>
                    <Text color="white">Caso não seja digitado a quantidade correta no cpf e rg, o processo não sera concluído.</Text>
                </Form>
            )}
        </Formik >;

    };

    return (
        <HStack justifyContent="space-between" bgColor="green">
            <Box w="full" bgColor="#007F3F" p="50px">
                <Box mb={isDesktop ? "50px" : "15px"} onClick={() => window.location.href = "/gestao"} cursor="pointer">
                    <Image src={logo} w="336px" h="56px" />
                </Box>
                <Box mb={isDesktop ? "50px" : "15px"}>
                    <Text fontSize="32px" fontWeight="bold" color="white">Bem-vindo ao CensoUFMS</Text>
                    <Text fontSize="20px" color="white" >Preencha os dados do usuario.</Text>
                </Box>
                {getCompStep()}
            </Box>
        </HStack>
    )
}