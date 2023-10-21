/* eslint-disable react-hooks/exhaustive-deps */
import { Card } from "@chakra-ui/card";
import { FormControl } from "@chakra-ui/form-control";
import { Text } from "@chakra-ui/layout";
import { Button, Skeleton } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Form from "../components/Form";
import ImagesForm from "../components/ImagesForm";
import { useProduct } from "../context/ProductContext";
import { GetProductById } from "./service";
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
    <>
      <Card
        variant="outline"
        rounded="lg"
        maxWidth="90vw"
        minWidth={"500px"}
        p={6}
        m="10px auto"
      >
        <Text className={style.title}>Visualizar Produto</Text>
        <FormControl padding="0 100px">
          {loading ? (
            <div className={style["skeleton-container"]}>
              {[...Array(20)].map((index) => (
                <Skeleton key={index} width={300} height={50} />
              ))}
            </div>
          ) : (
            <>
              <Form isReadOnly />
              <ImagesForm isReadOnly />
            </>
          )}
          <div className={style.buttons}>
            <Button colorScheme="red" onClick={() => navigate("/")}>
              Cancelar
            </Button>
            <Button
              colorScheme="blue"
              onClick={() => navigate(`/edit-product/${id}`)}
            >
              Editar
            </Button>
          </div>
        </FormControl>
      </Card>
    </>
  );
}
