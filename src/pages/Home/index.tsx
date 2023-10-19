import {
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import style from "./style.module.css";
import { useEffect, useState } from "react";
import { Products, deleteProduct, getProducts } from "./service";
import { Link } from "react-router-dom";
export default function Home() {
  const [products, setProducts] = useState<Products[]>([]);

  useEffect(() => {
    getProducts.then((res) => {
      setProducts(res);
    });
  }, []);

  const toast = useToast();

  function ActionButtons({ id }: { id: number }) {
    const onClickDelete = () =>
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

    return (
      <>
        <Link to={`/product/${id}`}>
          <Button m={2} color="blue">
            Ver Dados
          </Button>
        </Link>
        <Link to={`/edit-product/${id}`}>
        <Button m={2} color="blue">
          Alterar
        </Button>
        </Link>
        <Button m={2} color="red" onClick={onClickDelete}>
          Excluir
        </Button>
      </>
    );
  }

  return (
    <div className={style.container}>
      <TableContainer>
        <Table variant="simple" className={style.table}>
          <Thead>
            <Tr>
              <Th>Nome</Th>
              <Th>Ações</Th>
            </Tr>
          </Thead>
          <Tbody>
            {products.map((product) => (
              <Tr key={product.id}>
                <Td>{product.title}</Td>
                <Td>
                  <ActionButtons id={product.id} />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}
