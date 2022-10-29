import React, { useState, useContext } from "react";
import { Text, HStack, Flex, Box, Image, Link, Input, Alert, AlertIcon } from '@chakra-ui/react'
import { UserContext } from "../../context/HandleUser"
import { Button } from "../../components/Button";

import loginImg from "../../dist/login.svg"
import logo from "../../dist/logo.svg"
import iconFirstAcess from "../../dist/iconFirstAcess.svg"
import { useMediaContext } from "../../hook/useMediaContext";

export const Login = () => {

    const { authenticate, setAuthenticate, handleLogin, emailAndPasswordInvalid, setEmailAndPasswordInvalid } = useContext(UserContext);
    const { isDesktop } = useMediaContext();
    const [inputLogin, setInputLogin] = useState('');
    const [inputPassword, setInputPassword] = useState('');


    const validLogin = () => {
        if (inputLogin && inputPassword) {
            handleLogin(inputLogin, inputPassword)
        } else {
            setEmailAndPasswordInvalid(true);
        }
    }

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
                    <Text fontSize="20px" color="white" >Valide suas credenciais para acessar.</Text>
                </Box>
                <Box mb="5px">
                    <Text color="white">{"Usuário"}</Text>
                    <Input type={"text"} value={inputLogin} onChange={e => setInputLogin(e.target.value)} placeholder={isDesktop ? "Informe o usuário ex: user@ufms.br" : "usuário ex: user@ufms.br"} bgColor="white" mb="20px" />
                </Box>
                <Box mb="40px">
                    <Text color="white">{"Senha"}</Text>
                    <Input type={"password"} value={inputPassword} onChange={e => setInputPassword(e.target.value)} placeholder={"Informe sua senha"} bgColor="white" mb="20px" />
                </Box>
                <Box mb="20px">
                    <Button activeButton={() => validLogin()} text={'Acessar'} />
                    <Box>
                        {!emailAndPasswordInvalid &&
                            <Alert status='error' mt="20px">
                                <AlertIcon />
                                Login ou senha incorreto
                            </Alert>}
                    </Box>
                </Box>
                <Flex w="full" justifyContent="center"><Link href="/register" color="white" mr="5px">Cadastrar novo acesso</Link> <Image src={iconFirstAcess} /></Flex>

            </Box>
        </HStack>
    )
}