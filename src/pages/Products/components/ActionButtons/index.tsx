import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FiEdit, FiEye, FiXCircle } from "react-icons/fi";
import { Link } from "react-router-dom";
import { ProductType } from "../../context/ProductContext";
import { deleteProduct, getAndSearchProducts } from "../../service";

type PropsTypes = {
  id: number;
  setProducts: React.Dispatch<React.SetStateAction<ProductType[]>>;
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

      getAndSearchProducts().then((res) => {
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
          Ver Dados
        </Button>
      </Link>
      <Link to={`/edit-product/${id}`}>
        <Button m={2} colorScheme="blue" leftIcon={<FiEdit />}>
          Alterar
        </Button>
      </Link>
      <Button m={2} colorScheme="red" onClick={onOpen} leftIcon={<FiXCircle />}>
        Excluir
      </Button>
    </>
  );
}
