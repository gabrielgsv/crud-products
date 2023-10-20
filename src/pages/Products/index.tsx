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
import { ProductType } from "./context/ProductContext";
import ProductProvider from "./context/ProductContext";
export default function Products() {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    getProducts.then((res) => {
      setProducts(res);
    });
  }, []);

  return (
    <>
      <ProductProvider>
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
                      <ActionButtons
                        id={product.id}
                        setProducts={setProducts}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </div>
      </ProductProvider>
    </>
  );
}
