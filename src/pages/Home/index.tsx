import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Player } from "@lottiefiles/react-lottie-player";
import { useEffect, useState } from "react";
import packageAnimation from "../../assets/package-animation.json";
import ActionButtons from "../../components/ActionButtons";
import { getProducts } from "./service";
import style from "./style.module.css";
import { Products } from "../../types/Products";
export default function Home() {
  const [products, setProducts] = useState<Products[]>([]);

  useEffect(() => {
    getProducts.then((res) => {
      setProducts(res);
    });
  }, []);

  return (
    <>
      <div className={style.container}>
        <Player autoplay src={packageAnimation} keepLastFrame />
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
                    <ActionButtons id={product.id} setProducts={setProducts} />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
