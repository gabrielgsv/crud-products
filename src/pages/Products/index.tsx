/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Button,
  Card,
  Input,
  Skeleton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import { Player } from "@lottiefiles/react-lottie-player";
import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import packageAnimation from "../../assets/package-animation.json";
import { useDebounce } from "../../hooks/useDebounce";
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
      <Box
        bg={useColorModeValue("blackAlpha.50", "gray.900")}
        py={50}
        className={style.container}
      >
        <Player autoplay src={packageAnimation} keepLastFrame speed={0.5} />
        <TableContainer mt={5}>
          <Card
            variant="outline"
            rounded="lg"
            w={700}
            p={10}
            display="flex"
            flexDir="column"
            alignItems="center"
          >
            <Input
              placeholder="Pesquisar"
              id="search-input"
              width={300}
              mb={5}
              onChange={handleChangeSearch}
            />
            <Link to="/create-product" style={{ alignSelf: "flex-end" }}>
              <Button
                id="create-product-button"
                colorScheme="blue"
                variant="outline"
                leftIcon={<FiPlus />}
              >
                Criar produto
              </Button>
            </Link>
            <br />
            <Table className={style.table} size="sm" id="products-table">
              <Thead>
                <Tr>
                  <Th>Nome</Th>
                  <Th>Ações</Th>
                </Tr>
              </Thead>
              <Tbody>
                {products.length > 0 ? (
                  products.map((product) => (
                    <Tr key={product.id}>
                      <Td>
                        <div
                          id="product-title"
                          data-cy="product-title"
                          className={style["product-text"]}
                        >
                          {product.title}
                        </div>
                      </Td>
                      <Td id="product-actions">
                        <ActionButtons
                          id={product.id as number}
                          setProducts={setProducts}
                        />
                      </Td>
                    </Tr>
                  ))
                ) : (
                  <Tr>
                    <Td>
                      <Skeleton m={5} w={200} h={30} />
                      <Skeleton m={5} w={200} h={30} />
                      <Skeleton m={5} w={200} h={30} />
                    </Td>
                    <Td>
                      <Skeleton m={5} w={200} h={30} />
                      <Skeleton m={5} w={200} h={30} />
                      <Skeleton m={5} w={200} h={30} />
                    </Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          </Card>
        </TableContainer>
      </Box>
    </>
  );
}
