import {
  Box,
  Modal,
  Text,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button
} from '@chakra-ui/react'

export const CustomModal = ({ showModalButtonText, modalBody }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>
        VER RESPOSTAS
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Respostas</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {
              modalBody.Resposta.map((e) => {
                return (
                  <Box mb="5">
                    <Text>
                      <strong>{e.Pergunta.descricao}</strong>
                    </Text>
                    <Text>R:{e.valor} </Text>
                  </Box>
                )
              })
            }

          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Fechar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};