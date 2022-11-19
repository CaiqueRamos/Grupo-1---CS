import React, { useContext, useEffect, useState } from "react"
import {
    useDisclosure,
    Input,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from '@chakra-ui/react'
import { UserContext } from "../../context/HandleUser"
// import { Input } from "../../components/Input/index.js"
import { DeleteUser } from "../../fetchers/DeleteUser"
import {
    Button, Flex, Image, Text, Box, Table, Thead, Tbody, Tr, Th, Td, TableContainer,
} from '@chakra-ui/react'
import { useMediaContext } from "../../hook/useMediaContext.js";
import { ViewIcon } from '@chakra-ui/icons'
import logo from "../../dist/logo-black.svg"
import { Papel } from "../../components/Papel/index.js";
import { CustomModal } from "../../components/CustomModal/index.js";
import { GetUser } from "../../fetchers/GetUser.js";
import { GetAll } from "../../fetchers/GetAll.js";
import { CreateUser } from "../../fetchers/CreateUser";
// import { formatRg } from "../../helpers/format.js"
import iconFirstAcess from "../../dist/iconFirstAcess.svg"
import { GetPesquisa } from "../../fetchers/GetPesquisa"

export const Pesquisa = () => {
    const { isDesktop } = useMediaContext();
    const [user, setUser] = useState();
    const [pesquisa, setPesquisa] = useState();
    const [listenForm, setListemForm] = useState();
    const { isOpen, onOpen, onClose } = useDisclosure()

    // const { authenticate, emailAndPasswordInvalid } = useContext(UserContext);

    const [inputName, setInputName] = useState();
    const [cpf, setCpf] = useState();
    const [rg, setRg] = useState();
    const [papel, setPapel] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [handleCheckbox, setHandleCheckBox] = useState();
    const [token, setToken] = useState();
    const [error, setError] = useState(false);

    function userLogout() {
        localStorage.removeItem("token");
        window.location.href = "/login"
    }

    useEffect(() => {
        (async function handleGetDataUser() {
            const token = localStorage.getItem("token");
            const userId = localStorage.getItem("userId");
            const response = await GetUser(token, userId);
            const responsePesquisa = await GetPesquisa(token)
            setToken(token);
            setUser(response);
            setPesquisa(responsePesquisa);
            // console.log('response', response);
            // console.log('responsePesquisa', responsePesquisa);
        })()
    }, [listenForm])


    const handleSubmit = async () => {
        if (inputName && cpf && rg && papel && email && password && confirmPassword && handleCheckbox) {
            const response = await CreateUser(email, password, parseInt(papel), 2, inputName, cpf, rg, token);
            setListemForm(true);
            window.location.reload();
        } else {
            setError(true);
        }
    }

    const handleDelete = async (id, cpf) => {
        const response = await DeleteUser(token, id, cpf);
        // console.log(response?.data);
        window.location.reload();
    }
    const renderContent = (e, index) => {
        return (
            <Text>{index}</Text>
        )
    }

    return (
        user && pesquisa && (
            <>
                <Flex p="19px" borderBottom="solid 0.1px grey" justifyContent='space-between'>
                    <Flex>
                        <Image src={logo} />
                    </Flex>
                    <Flex alignItems='center'>
                        <Text cursor="pointer" mx="15px" onClick={() => window.location.href = "/nova-pesquisa"}>Nova Pesquisa</Text>
                        <Text cursor="pointer" mx="15px" color="#00A954" fontWeight="medium">Gestão</Text>
                    </Flex>
                    <Flex>
                        <Flex>
                            <Box>
                                <Text fontWeight='bold'>{user.data.Pessoa.nome}</Text>
                                <Text>{user.data.Papel.descricao}</Text>
                            </Box>
                            <Image
                                mx="12px"
                                borderRadius='full'
                                boxSize='40px'
                                src='https://cdn-icons-png.flaticon.com/512/74/74472.png'
                                alt='Icone user'
                            />
                        </Flex>
                    </Flex>
                </Flex>
                <Flex p="19px" borderBottom="solid 0.1px grey" justifyContent='center'>
                    <Flex alignItems='center'>
                        <Text cursor="pointer" mx="15px" color="#00A954" fontWeight="medium">Pesquisas</Text>
                        <Text cursor="pointer" mx="15px" onClick={() => window.location.href = "/gestao"}>Gestão</Text>
                    </Flex>
                </Flex>
                <Box p="19px" px="171px" py="33px">
                    <TableContainer border='solid 0.1px grey'>
                        <Table variant='simple' >
                            <Thead bgColor="grey" >
                                <Tr>
                                    <Th color="white">Nome</Th>
                                    <Th color="white">Genero</Th>
                                    <Th color="white">Idade</Th>
                                    <Th color="white">Logradouro</Th>
                                    <Th color="white">Número</Th>
                                    <Th color="white">Cidade</Th>
                                    <Th color="white">Estado</Th>
                                    <Th color="white">Respostas</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {
                                    pesquisa.data.map((e, index) => {
                                        return (
                                            <Tr key={index}>
                                                <Td>
                                                    <Text>{e.Entrevistado.Pessoa.nome}</Text>
                                                </Td>
                                                <Td>
                                                    <Text>{e.Entrevistado.genero}</Text>
                                                </Td>
                                                <Td>
                                                    <Text>{e.Entrevistado.idade}</Text>
                                                </Td>
                                                <Td>
                                                    <Text>{e.Entrevistado.Endereco.logradouro}</Text>
                                                </Td>
                                                <Td>
                                                    <Text>{e.Entrevistado.Endereco.numero}</Text>
                                                </Td>
                                                <Td>
                                                    <Text>{e.Entrevistado.Endereco.cidade}</Text>
                                                </Td>
                                                <Td>
                                                    <Text>{e.Entrevistado.Endereco.estado}</Text>
                                                </Td>
                                                <Td>
                                                    <CustomModal
                                                        showModalButtonText="Edit"
                                                        modalBody={e}
                                                    />
                                                </Td>
                                            </Tr>
                                        );

                                    })
                                }
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Box>
            </>


        )
    )
}