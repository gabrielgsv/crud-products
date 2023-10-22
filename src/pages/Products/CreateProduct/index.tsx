/* eslint-disable react-hooks/exhaustive-deps */
import { Card } from "@chakra-ui/card";
import { FormControl } from "@chakra-ui/form-control";
import { Text } from "@chakra-ui/layout";
import { Button, useColorModeValue, useToast, Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Form from "../components/Form";
import ImagesForm from "../components/ImagesForm";
import { DEFAULT_VALUE, useProduct } from "../context/ProductContext";
import style from "../style.module.css";
import { saveProduct } from "./service";
import { useEffect } from "react";
import { hasEmptyOrNullString } from "../service";

export default function CreateProduct() {
  const { product, setProduct } = useProduct();

  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    setProduct(DEFAULT_VALUE.product);
  }, []);

  return (
    <Box bg={useColorModeValue("blackAlpha.50", "gray.900")}>
      <Card variant="outline" rounded="lg" maxWidth="90vw" p={6} m="0 auto">
        <Text id="title" className={style.title}>
          Criar Produto
        </Text>
        <FormControl className={style.form}>
          <Form />
          <ImagesForm />

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
                  saveProduct(product)
                    .then(() => {
                      toast({
                        title: "Sucesso",
                        description: "Produto criado com sucesso",
                        status: "success",
                        duration: 3000,
                        isClosable: true,
                      });
                      navigate("/");
                    })
                    .catch(() => {
                      toast({
                        title: "Erro",
                        description: "Não foi possível criar o produto",
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
