import {
  Button,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { deleteProduct, getProducts } from "../../pages/Home/service";
import { Link } from "react-router-dom";
import { FiEye, FiXCircle } from "react-icons/fi";
import { Products } from "../../types/Products";

type PropsTypes = {
  id: number;
  setProducts: React.Dispatch<React.SetStateAction<Products[]>>;
};
export default function ActionButtons({ id, setProducts }: PropsTypes) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const onClickDelete = () => {
    deleteProduct(id).then(() => {
      toast({
        title: "Sucesso",
        description: "Produto excluído com sucesso",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      getProducts.then((res) => {
        setProducts(res);
      });
    });
    onClose();
  };

  const DeleteModal = () => {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Excluir Produto</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>Você tem certeza que deseja excluir este produto?</p>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button colorScheme="red" onClick={onClickDelete}>
              Excluir
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };

  return (
    <>
      <DeleteModal />
      <Link to={`/product/${id}`}>
        <Button m={2} colorScheme="blue" leftIcon={<FiEye />}>
          Ver Dados / Alterar
        </Button>
      </Link>
      <Button m={2} colorScheme="red" onClick={onOpen} leftIcon={<FiXCircle />}>
        Excluir
      </Button>
    </>
  );
}
