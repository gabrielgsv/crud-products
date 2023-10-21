/* eslint-disable react-hooks/exhaustive-deps */
import { Card } from "@chakra-ui/card";
import { FormControl } from "@chakra-ui/form-control";
import { Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Form from "../components/Form";
import { useProduct } from "../context/ProductContext";
import { GetProductById } from "./service";
import style from "./style.module.css";
import ImagesForm from "../components/ImagesForm";

export default function EditProduct() {
  const { setProduct } = useProduct();

  const { id } = useParams();

  useEffect(() => {
    GetProductById(Number(id)).then((res) => {
      setProduct(res);
    });
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
            <Button colorScheme="red">Cancelar</Button>
            <Button colorScheme="blue">Salvar</Button>
          </div>
        </FormControl>
      </Card>
    </>
  );
}
