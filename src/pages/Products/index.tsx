/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Card,
  Input,
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
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import packageAnimation from "../../assets/package-animation.json";
import { useDebounce } from "../../hooks/UseDebounce";
import ActionButtons from "./components/ActionButtons";
import {
  DEFAULT_VALUE,
  ProductType,
  useProduct,
} from "./context/ProductContext";
import { getAndSearchProducts } from "./service";
import style from "./style.module.css";
export default function Products() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const debouncedSearchText = useDebounce<string>(searchText, 500);

  const { setProduct } = useProduct();

  useEffect(() => {
    setProduct(DEFAULT_VALUE.product);
  }, []);

  useEffect(() => {
    getAndSearchProducts(searchText).then((res) => {
      setProducts(res);
    });
  }, [debouncedSearchText]);

  function handleChangeSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchText(e.target.value);
  }

  return (
    <>
      <div className={style.container}>
        <Player autoplay src={packageAnimation} keepLastFrame speed={0.5} />
        <TableContainer mt={10}>
          <Card
            variant="outline"
            rounded="lg"
            maxWidth="90vw"
            minWidth={"500px"}
            p={10}
            display="flex"
            flexDir="column"
            alignItems="center"
          >
            <Input
              placeholder="Pesquisar"
              width={300}
              mb={5}
              onChange={handleChangeSearch}
            />
            <Link to="/create-product" style={{ alignSelf: "flex-end" }}>
              <Button
                colorScheme="blue"
                variant="outline"
                leftIcon={<FiPlus />}
              >
                Criar produto
              </Button>
            </Link>
            <br />
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th>Nome</Th>
                  <Th>Ações</Th>
                </Tr>
              </Thead>
              <Tbody>
                {products.map((product) => (
                  <Tr key={product.id}>
                    <Td>
                      <div className={style["product-text"]}>
                        {product.title}
                      </div>
                    </Td>
                    <Td>
                      <ActionButtons
                        id={product.id as number}
                        setProducts={setProducts}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Card>
        </TableContainer>
      </div>
    </>
  );
}
