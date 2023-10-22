/* eslint-disable react-hooks/exhaustive-deps */
import { Card } from "@chakra-ui/card";
import { FormControl } from "@chakra-ui/form-control";
import { Text } from "@chakra-ui/layout";
import {
  Button,
  Skeleton,
  useColorModeValue,
  useToast,
  Box,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Form from "../components/Form";
import { DEFAULT_VALUE, useProduct } from "../context/ProductContext";
import { editProduct } from "./service";
import { GetProductById, hasEmptyOrNullString } from "../service";
import style from "../style.module.css";
import ImagesForm from "../components/ImagesForm";

export default function EditProduct() {
  const { product, setProduct } = useProduct();
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    GetProductById(Number(id)).then((res) => {
      setProduct(res);
      setTimeout(() => {
        setLoading(false);
      }, 700);
    });

    setProduct(DEFAULT_VALUE.product);
  }, []);

  return (
    <Box bg={useColorModeValue("blackAlpha.50", "gray.900")}>
      <Card variant="outline" rounded="lg" maxWidth="90vw" p={6} m="0 auto">
        <Text className={style.title}>Editar Produto</Text>
        <FormControl className={style.form}>
          {loading ? (
            <div id="skeleton-loading" className={style["skeleton-container"]}>
              {[...Array(20)].map((item, index) => (
                <Skeleton id={item} key={index} width={300} height={10} />
              ))}
            </div>
          ) : (
            <>
              <Form />
              <ImagesForm />
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
              id="save-button"
              colorScheme="blue"
              onClick={() => {
                if (hasEmptyOrNullString(product)) {
                  toast({
                    title: "Erro",
                    description: "Preencha todos os campos",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                  });
                  return;
                } else {
                  editProduct(product)
                    .then(() => {
                      toast({
                        title: "Sucesso",
                        description: "Produto alterado com sucesso",
                        status: "success",
                        duration: 3000,
                        isClosable: true,
                      });
                      navigate("/");
                    })
                    .catch(() => {
                      toast({
                        title: "Erro",
                        description: "Não foi possível alterar o produto",
                        status: "error",
                        duration: 3000,
                        isClosable: true,
                      });
                    });
                }
              }}
            >
              Salvar
            </Button>
          </div>
        </FormControl>
      </Card>
    </Box>
  );
}
