/* eslint-disable no-fallthrough */
import React, { useState, useContext, useEffect } from "react";
import {
    Text, HStack, Flex, Box, Image, Link, Input, Alert, AlertIcon, FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Button
} from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik';
import { CreatePessoa } from "../../fetchers/CreatePessoa"

import loginImg from "../../dist/login.svg"
import logo from "../../dist/logo.svg"
import { useMediaContext } from "../../hook/useMediaContext";

export const NovaPesquisa = () => {

    const { isDesktop } = useMediaContext();
    const [formStage, setFormStage] = useState(1);
    const [idEntrevistado, setIdEntrevistado] = useState();

    function validateInput(value) {
        let error
        if (!value) {
            error = 'Campo Obrigatório!'
        }
        return error
    }

    const valuesUserData = {
        nome: '',
        cpf: '',
        rg: ''
    }
    const valuesEndereco = {
        "cep": "",
        "fkbairro": 61,
        "logradouro": '',
        "numero": '',
        "complemento": "nenhum"
    }

    const getCompStep = () => {
        switch (formStage) {
            case 1:
            case 2:
                return <Formik
                    initialValues={valuesEndereco}
                    onSubmit={async (values, actions) => {
                        const getPessoa = await CreatePessoa(values.nome, values.cpf, values.rg, localStorage.getItem("token"));
                        if (getPessoa.status === 200) {
                            if (getPessoa.data.message === "Pessoa já cadastrada!") {
                                window.alert('Pessoa ja cadastrada!');
                            } else {
                                console.log(getPessoa);
                                setIdEntrevistado(getPessoa.data.idpessoa);
                                setFormStage(2);
                            }
                        }


                    }}
                >
                    {(props) => (
                        <Form>
                            <Field name='cep' validate={validateInput}>
                                {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.cep && form.touched.cep}>
                                        <FormLabel color="white">CEP</FormLabel>
                                        <Input {...field} placeholder='cep' color='white' _placeholder={{ color: 'white', opacity: 0.4 }} />
                                        <FormErrorMessage>{form.errors.cep}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                            <Field name='logradouro' validate={validateInput}>
                                {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.logradouro && form.touched.logradouro} mt="10px">
                                        <FormLabel color="white">Logradouro</FormLabel>
                                        <Input {...field} placeholder='logradouro' color='white' _placeholder={{ color: 'white', opacity: 0.4 }} />
                                        <FormErrorMessage>{form.errors.logradouro}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                            <Field name='numero' validate={validateInput}>
                                {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.numero && form.touched.numero} mt="10px">
                                        <FormLabel color="white">Número</FormLabel>
                                        <Input {...field} placeholder='numero' color='white' _placeholder={{ color: 'white', opacity: 0.4 }} />
                                        <FormErrorMessage>{form.errors.numero}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                            <Button
                                w="full"
                                bgColor="orange"
                                mt={4}
                                isLoading={props.isSubmitting}
                                type='submit'
                                color="white"
                            >
                                Avançar
                            </Button>
                            <Text color="white">Caso não seja digitado a quantidade correta no cpf e rg, o processo não sera concluído.</Text>
                        </Form>
                    )}
                </Formik>;

            default: return <Text>{idEntrevistado} dsadsa</Text>;
        }
    };

    return (
        <HStack h="100vh" justifyContent="space-between">
            {isDesktop &&
                <Flex w="726px" alignItems="center" justifyContent="center">
                    <Image src={loginImg} w="480px" h="480px" />
                </Flex>}
            <Box w={isDesktop ? "640px" : "full"} h="100vh" bgColor="#007F3F" p="50px">
                <Box mb={isDesktop ? "50px" : "15px"}>
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