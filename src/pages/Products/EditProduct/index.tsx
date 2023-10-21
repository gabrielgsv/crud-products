/* eslint-disable react-hooks/exhaustive-deps */
import { Card } from "@chakra-ui/card";
import { FormControl } from "@chakra-ui/form-control";
import { Text } from "@chakra-ui/layout";
import { Button, Skeleton, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Form from "../components/Form";
import { DEFAULT_VALUE, useProduct } from "../context/ProductContext";
import { GetProductById, editProduct } from "./service";
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
          {loading ? (
            <div className={style["skeleton-container"]}>
              {[...Array(20)].map((index) => (
                <Skeleton key={index} width={300} height={50} />
              ))}
            </div>
          ) : (
            <>
              <Form />
              <ImagesForm />
            </>
          )}

          <div className={style.buttons}>
            <Button colorScheme="red" onClick={() => navigate("/")}>
              Cancelar
            </Button>
            <Button
              colorScheme="blue"
              onClick={() => {
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
