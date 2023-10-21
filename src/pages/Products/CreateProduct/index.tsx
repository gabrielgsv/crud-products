/* eslint-disable react-hooks/exhaustive-deps */
import { Card } from "@chakra-ui/card";
import { FormControl } from "@chakra-ui/form-control";
import { Text } from "@chakra-ui/layout";
import { Button, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Form from "../components/Form";
import ImagesForm from "../components/ImagesForm";
import { DEFAULT_VALUE, useProduct } from "../context/ProductContext";
import style from "../style.module.css";
import { saveProduct } from "./service";
import { useEffect } from "react";

export default function CreateProduct() {
  const { product, setProduct } = useProduct();

  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    setProduct(DEFAULT_VALUE.product);
  }, []);

  return (
    <>
      <Card
        variant="outline"
        rounded="lg"
        maxWidth="90vw"
        minWidth={"500px"}
        p={6}
        m="10px auto"
      >
        <Text className={style.title}>Editar Produto</Text>
        <FormControl padding="0 100px">
          <Form />
          <ImagesForm />

          <div className={style.buttons}>
            <Button colorScheme="red" onClick={() => navigate("/")}>
              Cancelar
            </Button>
            <Button
              colorScheme="blue"
              onClick={() => {
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
              }}
            >
              Salvar
            </Button>
          </div>
        </FormControl>
      </Card>
    </>
  );
}
