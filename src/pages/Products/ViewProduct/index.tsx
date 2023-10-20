import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { useParams } from "react-router-dom";
import style from "./style.module.css";
import { ProductsType } from "../../../types/Products";
import { useEffect, useState } from "react";
import { GetProductById } from "./service";
import { Image } from "@chakra-ui/image";
import { Card, CardBody, CardHeader } from "@chakra-ui/card";
import { Text } from "@chakra-ui/layout";
import { priceFormat } from "../../../services/priceFormat";

export default function ViewProduct() {
  const [product, setProduct] = useState<ProductsType>();

  const { id } = useParams();

  useEffect(() => {
    GetProductById(Number(id)).then((res) => {
      setProduct(res);
    });
  }, []);

  return (
    <>
      <Text className={style.title}>Visualizar Produto</Text>
      <FormControl padding="0 100px">
        <div className={style.container}>
          <div>
            <FormLabel>Nome</FormLabel>
            <Input w={300} type="text" value={product?.title} isReadOnly />
          </div>

          <div>
            <FormLabel>Marca</FormLabel>
            <Input w={300} type="text" value={product?.brand} isReadOnly />
          </div>

          <div>
            <FormLabel>Descrição</FormLabel>
            <Input
              w={300}
              type="text"
              value={product?.description}
              isReadOnly
            />
          </div>

          <div>
            <FormLabel>Preço</FormLabel>
            <Input
              w={300}
              type="text"
              value={product?.price && priceFormat(product.price)}
              isReadOnly
            />
          </div>

          <div>
            <FormLabel>Porcentagem de desconto</FormLabel>
            <Input w={300} type="text" value={product?.discountPercentage} isReadOnly />
          </div>

          <div>
            <FormLabel>Categoria</FormLabel>
            <Input w={300} type="text" value={product?.category} isReadOnly />
          </div>

          <div>
            <FormLabel>Avaliação</FormLabel>
            <Input w={300} type="text" value={product?.rating} isReadOnly />
          </div>

          <div>
            <FormLabel>Estoque</FormLabel>
            <Input w={300} type="text" value={product?.stock} isReadOnly />
          </div>
        </div>

        <div className={style.container} style={{ marginTop: "30px" }}>
          <Card maxW="auto">
            <CardHeader>
              <Text as="b">Imagem principal</Text>
            </CardHeader>
            <CardBody display="flex" justifyContent="center">
              <Image
                src={product?.thumbnail}
                alt={product?.title}
                width={300}
                height="auto"
                />
            </CardBody>
          </Card>

          <Card maxW="auto">
            <CardHeader>
              <Text as="b">Imagens</Text>
            </CardHeader>
            <CardBody display="flex" justifyContent="center">
              {product?.images.map((image) => (
                <Image
                  key={image}
                  src={image}
                  alt={product?.title}
                  width={300}
                  height="auto"
                />
              ))}
            </CardBody>
          </Card>
        </div>
      </FormControl>
    </>
  );
}
