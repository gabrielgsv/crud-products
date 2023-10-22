/* eslint-disable react-hooks/exhaustive-deps */
import { Card } from "@chakra-ui/card";
import { FormControl } from "@chakra-ui/form-control";
import { Text } from "@chakra-ui/layout";
import { Button, Skeleton, useColorModeValue, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Form from "../components/Form";
import ImagesForm from "../components/ImagesForm";
import { useProduct } from "../context/ProductContext";
import { GetProductById } from "../service";
import style from "../style.module.css";

export default function ViewProduct() {
  const { setProduct } = useProduct();
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    GetProductById(Number(id)).then((res) => {
      setProduct(res);
      setTimeout(() => {
        setLoading(false);
      }, 700);
    });
  }, []);

  return (
    <Box bg={useColorModeValue("blackAlpha.50", "gray.900")}>
      <Card variant="outline" rounded="lg" maxWidth="90vw" p={6} m="0 auto">
        <Text id="title" className={style.title}>
          Visualizar Produto
        </Text>
        <FormControl className={style.form}>
          {loading ? (
            <div id="skeleton-loading" className={style["skeleton-container"]}>
              {[...Array(20)].map((item, index) => (
                <Skeleton id={item} key={index} width={300} height={10} />
              ))}
            </div>
          ) : (
            <>
              <Form isReadOnly />
              <ImagesForm isReadOnly />
            </>
          )}
          <div className={style.buttons}>
            <Button
              id="cancel-button"
              colorScheme="red"
              onClick={() => navigate("/")}
            >
              Cancelar
            </Button>
            <Button
              id="edit-button"
              colorScheme="blue"
              onClick={() => navigate(`/edit-product/${id}`)}
            >
              Editar
            </Button>
          </div>
        </FormControl>
      </Card>
    </Box>
  );
}
