import React, { useContext, useEffect, useState } from "react"
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Select,
    Checkbox,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Link,
    Alert,
    Input,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider
} from '@chakra-ui/react'
import { UserContext } from "../../context/HandleUser"
// import { Input } from "../../components/Input/index.js"
import { DeleteUser } from "../../fetchers/DeleteUser"
import {
    Button, Flex, Image, Text, Box, Table, Thead, Tbody, Tr, Th, Td, TableContainer,
} from '@chakra-ui/react'
import { useMediaContext } from "../../hook/useMediaContext.js";
import { EditIcon, SmallAddIcon, DeleteIcon, ChevronDownIcon } from '@chakra-ui/icons'
import logo from "../../dist/logo-black.svg"
import { Papel } from "../../components/Papel/index.js";
import { GetUser } from "../../fetchers/GetUser.js";
import { GetAll } from "../../fetchers/GetAll.js";
import { CreateUser } from "../../fetchers/CreateUser";
// import { formatRg } from "../../helpers/format.js"
import iconFirstAcess from "../../dist/iconFirstAcess.svg"

export const Gestao = () => {
    const { isDesktop } = useMediaContext();
    const [user, setUser] = useState();
    const [allUsers, setAllUsers] = useState();
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
            const responseUser = await GetAll(token)
            setToken(token);
            setUser(response);
            setAllUsers(responseUser);
            console.log('response', response);
            console.log('responseUser', responseUser);
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
        console.log(response?.data);
        window.location.reload();
    }

    return (
        user && allUsers && (
            isDesktop ? (
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
                            <Text cursor="pointer" mx="15px" onClick={() => window.location.href = "/pesquisas"}>Pesquisas</Text>
                            <Text cursor="pointer" mx="15px" color="#00A954" fontWeight="medium">Usuários</Text>
                        </Flex>
                    </Flex>
                    <Box p="19px" px="171px" py="33px">
                        <Flex justifyContent='space-between' w="full" align="center" mb="30px" p="20px">
                            <Text fontSize='20px'>Listagem de usuários</Text>
                            <Flex>
                                <Button bgColor="#00A954" color='white' onClick={onOpen}>Novo <SmallAddIcon w={5} h={5} ml="5px" /></Button>
                            </Flex>
                            <Modal isOpen={isOpen} onClose={onClose} size="xl">
                                <ModalOverlay />
                                <ModalContent>
                                    <ModalHeader>Adicionar Usuário</ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody bgColor="#007F3F">
                                        <Box >
                                            <Box mb="20px">
                                                <Text fontSize="32px" fontWeight="bold" color="white">Novo usuário de acesso</Text>
                                                <Text fontSize="18px" color="white" >Consulte uma pessoa com perfil de gestor para liberação do cadastro!</Text>
                                            </Box>
                                            <Box mb="18px">
                                                <Text color="white">{"Nome"}</Text>
                                                <Input type={"text"} value={inputName} onChange={e => setInputName(e.target.value)} placeholder={"Nome do usuário"} bgColor="white" />
                                            </Box>
                                            <Box mb="18px">
                                                <Flex justifyContent='space-between'>
                                                    <Box w='90%' mr='10px'>
                                                        <Text color="white">{"CPF"}</Text>
                                                        <Input type={"text"} value={cpf} onChange={e => setCpf(e.target.value)} placeholder={"00000000000"} bgColor="white" />
                                                    </Box>
                                                    <Box w='90%' ml='10px'>
                                                        <Text color="white">{"RG"}</Text>
                                                        <Input type={"text"} value={rg} onChange={e => setRg(e.target.value)} placeholder={"000000000"} bgColor="white" />
                                                    </Box>
                                                </Flex>
                                            </Box>
                                            <Flex justifyContent='space-between' mb="18px">
                                                <Box w="full">
                                                    <Text color="white">{"Papel"}</Text>
                                                    <Select placeholder='Selecione o papel' bgColor="white" cursor={'pointer'} onChange={e => setPapel(e.target.value)} value={papel}>
                                                        <option value={1}>MS</option>
                                                        <option value={2}>GG</option>
                                                        <option value={3}>GS</option>
                                                        <option value={4}>ER</option>
                                                        <option value={5}>ET</option>
                                                    </Select>
                                                </Box>
                                            </Flex>
                                            <Box mb="18px">
                                                <Text color="white">{"E-mail"}</Text>
                                                <Input type={"text"} value={email} onChange={e => setEmail(e.target.value)} placeholder={"Informe o e-mail"} bgColor="white" />
                                            </Box>
                                            <Box mb="18px">
                                                <Text color="white">{"Senha"}</Text>
                                                <Input type={"password"} value={password} onChange={e => setPassword(e.target.value)} placeholder={"Informe sua senha"} bgColor="white" />
                                            </Box>
                                            <Box mb={isDesktop ? "18px" : '40px'}>
                                                <Text color="white">{"Confirme sua senha"}</Text>
                                                <Input type={"password"} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder={"Confirme sua senha"} bgColor="white" />
                                            </Box>
                                            <Checkbox size='md' colorScheme='green' mb="18px" color="white" isChecked={handleCheckbox} onChange={(e) => { setHandleCheckBox(e.target.checked) }}>
                                                Aceito os termos de uso (Link para os termos de uso)
                                            </Checkbox>
                                            {error && <Alert status='error' mb="10px">
                                                <AlertIcon />
                                                <AlertTitle>Houve um erro!</AlertTitle>
                                                <AlertDescription>Verifique o checkbox e seus dados</AlertDescription>
                                            </Alert>}
                                            <Flex w="full" justifyContent="center"><Link href="/login" color="white" mr="5px">Tenho Cadastro</Link> <Image src={iconFirstAcess} /></Flex>

                                        </Box>
                                    </ModalBody>

                                    <ModalFooter>
                                        <Button variant='ghost' mr={3} onClick={onClose}>
                                            Cancelar
                                        </Button>
                                        <Button colorScheme='blue' onClick={handleSubmit}>Salvar</Button>
                                    </ModalFooter>
                                </ModalContent>
                            </Modal>
                        </Flex>
                        <TableContainer border='solid 0.1px grey'>
                            <Table variant='simple' >
                                <Thead bgColor="grey" >
                                    <Tr>
                                        <Th color="white">Usuário</Th>
                                        <Th color="white">Papel</Th>
                                        <Th color="white">Supervisor</Th>
                                        <Th color="white"></Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {
                                        allUsers.data.map((e, index) => {
                                            return (
                                                <Tr key={e.idusuario}>
                                                    <Td>
                                                        <Box>
                                                            <Text fontWeight="bold">{e.Pessoa.nome}</Text>
                                                            <Text>{e.email}</Text>
                                                        </Box>
                                                    </Td>
                                                    <Td>
                                                        <Papel textContent={e.Papel.sigla} />
                                                    </Td>
                                                    <Td>{user.data.Pessoa.nome}</Td>
                                                    <Td w="30px">
                                                        <Flex justifyContent="space-around">
                                                            {/* <EditIcon w={5} h={5} mr="10px" /> */}
                                                            {<DeleteIcon w={5} h={5} ml="10px" color="red" onClick={() => handleDelete(e.idusuario, e.Pessoa.cpf)} cursor="pointer" />}
                                                        </Flex>
                                                    </Td>
                                                </Tr>
                                            );
                                        })
                                    }
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </Box>
                </>) : (
                <>
                    <Flex p="19px" borderBottom="solid 0.1px grey" justifyContent='space-between'>

                        <Menu>
                            <MenuButton
                                px={4}
                                py={2}
                                transition='all 0.2s'
                                borderRadius='md'
                                borderWidth='1px'
                                _hover={{ bg: 'gray.400' }}
                                _expanded={{ bg: 'blue.400' }}
                                _focus={{ boxShadow: 'outline' }}
                            >
                                Menu <ChevronDownIcon />
                            </MenuButton>
                            <MenuList>
                                <Text cursor="pointer" mx="15px">Dashboard</Text>
                                <Text cursor="pointer" mx="15px" color="#00A954" fontWeight="medium">Gestão</Text>
                                <Text cursor="pointer" mx="15px">Relatórios</Text>
                                <Text cursor="pointer" mx="15px">Saiba Mais</Text>
                                <Text cursor="pointer" mx="15px">Pesquisa</Text>
                                <Text cursor="pointer" mx="15px" color="#00A954" fontWeight="medium">Usuário</Text>
                                <Text cursor="pointer" mx="15px">Papeis</Text>
                                <Text cursor="pointer" mx="15px">Regiões</Text>
                                <Text cursor="pointer" mx="15px">Endereços</Text>
                                <Text cursor="pointer" mx="15px">Bairros</Text>
                            </MenuList>
                        </Menu>
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
                    <Box>
                        <Flex justifyContent='space-between' w="full" align="center" mb="30px">
                            <Text fontSize='20px' mt="10px">Listagem de usuários</Text>
                            <Box mt="10px">
                                {/* <Button mr="10px" border='solid 1px grey' color="grey">Exportar  <EditIcon w={5} h={5} ml="10px" /></Button> */}
                                <Button bgColor="#00A954" color='white' onClick={onOpen}>Novo <SmallAddIcon w={5} h={5} ml="5px" /></Button>
                            </Box>
                            <Modal isOpen={isOpen} onClose={onClose} size="xl">
                                <ModalOverlay />
                                <ModalContent>
                                    <ModalHeader>Adicionar Usuário</ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody bgColor="#007F3F">
                                        <Box >
                                            <Box mb="20px">
                                                <Text fontSize="32px" fontWeight="bold" color="white">Novo usuário de acesso</Text>
                                                <Text fontSize="18px" color="white" >Consulte uma pessoa com perfil de gestor para liberação do cadastro!</Text>
                                            </Box>
                                            <Box mb="18px">
                                                <Text color="white">{"Nome"}</Text>
                                                <Input type={"text"} value={inputName} onChange={e => setInputName(e.target.value)} placeholder={"Nome do usuário"} bgColor="white" />
                                            </Box>
                                            <Box mb="18px">
                                                <Flex justifyContent='space-between'>
                                                    <Box w='90%' mr='10px'>
                                                        <Text color="white">{"CPF"}</Text>
                                                        <Input type={"text"} value={cpf} onChange={e => setCpf(e.target.value)} placeholder={"00000000000"} bgColor="white" />
                                                    </Box>
                                                    <Box w='90%' ml='10px'>
                                                        <Text color="white">{"RG"}</Text>
                                                        <Input type={"text"} value={rg} onChange={e => setRg(e.target.value)} placeholder={"000000000"} bgColor="white" />
                                                    </Box>
                                                </Flex>
                                            </Box>
                                            <Flex justifyContent='space-between' mb="18px">
                                                <Box w="full">
                                                    <Text color="white">{"Papel"}</Text>
                                                    <Select placeholder='Selecione o papel' bgColor="white" cursor={'pointer'} onChange={e => setPapel(e.target.value)} value={papel}>
                                                        <option value={1}>MS</option>
                                                        <option value={2}>GG</option>
                                                        <option value={3}>GS</option>
                                                        <option value={4}>ER</option>
                                                        <option value={5}>ET</option>
                                                    </Select>
                                                </Box>
                                            </Flex>
                                            <Box mb="18px">
                                                <Text color="white">{"E-mail"}</Text>
                                                <Input type={"text"} value={email} onChange={e => setEmail(e.target.value)} placeholder={"Informe o e-mail"} bgColor="white" />
                                            </Box>
                                            <Box mb="18px">
                                                <Text color="white">{"Senha"}</Text>
                                                <Input type={"password"} value={password} onChange={e => setPassword(e.target.value)} placeholder={"Informe sua senha"} bgColor="white" />
                                            </Box>
                                            <Box mb={isDesktop ? "18px" : '40px'}>
                                                <Text color="white">{"Confirme sua senha"}</Text>
                                                <Input type={"password"} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder={"Confirme sua senha"} bgColor="white" />
                                            </Box>
                                            <Checkbox size='md' colorScheme='green' mb="18px" color="white" isChecked={handleCheckbox} onChange={(e) => { setHandleCheckBox(e.target.checked) }}>
                                                Aceito os termos de uso (Link para os termos de uso)
                                            </Checkbox>
                                            {error && <Alert status='error' mb="10px">
                                                <AlertIcon />
                                                <AlertTitle>Houve um erro!</AlertTitle>
                                                <AlertDescription>Verifique o checkbox e seus dados</AlertDescription>
                                            </Alert>}
                                            <Flex w="full" justifyContent="center"><Link href="/login" color="white" mr="5px">Tenho Cadastro</Link> <Image src={iconFirstAcess} /></Flex>

                                        </Box>
                                    </ModalBody>

                                    <ModalFooter>
                                        <Button variant='ghost' mr={3} onClick={onClose}>
                                            Cancelar
                                        </Button>
                                        <Button colorScheme='blue' onClick={handleSubmit}>Salvar</Button>
                                    </ModalFooter>
                                </ModalContent>
                            </Modal>
                        </Flex>
                        <TableContainer border='solid 0.1px grey'>
                            <Table variant='simple' >
                                <Thead bgColor="grey" >
                                    <Tr>
                                        <Th color="white">Usuário</Th>
                                        <Th color="white">Papel</Th>
                                        <Th color="white"></Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {
                                        allUsers.data.map((e) => {
                                            return (
                                                <Tr>
                                                    <Td>
                                                        <Box>
                                                            <Text fontWeight="bold">{e.Pessoa.nome}</Text>
                                                            <Text>{e.email}</Text>
                                                        </Box>
                                                    </Td>
                                                    <Td>
                                                        <Papel textContent={e.Papel.sigla} />
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
            ))
    )
}