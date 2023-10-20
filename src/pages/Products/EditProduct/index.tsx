/* eslint-disable react-hooks/exhaustive-deps */
import { Card, CardBody, CardHeader } from "@chakra-ui/card";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Image } from "@chakra-ui/image";
import { Input } from "@chakra-ui/input";
import { Text } from "@chakra-ui/layout";
import { Box, Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { useParams } from "react-router-dom";
import { ProductType } from "../context/ProductContext";
import { GetCategories, GetProductById } from "./service";
import emptyImage from "../../../assets/empty-image.svg";
import style from "./style.module.css";

export default function EditProduct() {
  const [product, setProduct] = useState<ProductType>();
  const [categories, setCategories] = useState<string[]>();

  const { id } = useParams();

  useEffect(() => {
    GetProductById(Number(id)).then((res) => {
      setProduct(res);
    });

    GetCategories().then((res) => {
      setCategories(res);
    });
  }, []);

  function handleChange(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) {
    e.preventDefault();
    setProduct({ ...product, [e.target.name]: e.target.value } as ProductType);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProduct({
          ...product,
          [e.target.name]: reader.result as string,
        } as ProductType);
      };
      reader.readAsDataURL(file);
    }
  }

  return (
    <>
      <Box
        borderWidth="1px"
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        maxWidth="90vw"
        minWidth={"500px"}
        p={6}
        m="10px auto"
      >
        <Text className={style.title}>Editar Produto</Text>
        <FormControl padding="0 100px">
          <div className={style.container}>
            <div>
              <FormLabel>Nome</FormLabel>
              <Input
                onChange={handleChange}
                w={300}
                type="text"
                name="title"
                value={product?.title}
              />
            </div>

            <div>
              <FormLabel>Marca</FormLabel>
              <Input
                onChange={handleChange}
                w={300}
                type="text"
                name="brand"
                value={product?.brand}
              />
            </div>

            <div>
              <FormLabel>Descrição</FormLabel>
              <Input
                onChange={handleChange}
                w={300}
                type="text"
                name="description"
                value={product?.description}
              />
            </div>

            <div>
              <FormLabel>Preço</FormLabel>
              <NumericFormat
                onChange={handleChange}
                value={product?.price}
                name="price"
                decimalScale={2}
                fixedDecimalScale
                decimalSeparator=","
                thousandSeparator="."
                customInput={Input}
                w={300}
                prefix="R$ "
              />
            </div>

            <div>
              <FormLabel>Porcentagem de desconto</FormLabel>
              <NumericFormat
                onChange={handleChange}
                type="text"
                name="discountPercentage"
                value={product?.discountPercentage}
                customInput={Input}
                w={300}
                decimalScale={2}
                fixedDecimalScale
                decimalSeparator=","
                thousandSeparator="."
                suffix=" %"
              />
            </div>

            <div>
              <FormLabel>Categoria</FormLabel>
              <Select
                name="category"
                placeholder="Selecione uma categoria"
                value={product?.category}
                w={300}
                onChange={handleChange}
              >
                {categories?.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <FormLabel>Avaliação</FormLabel>
              <NumericFormat
                onChange={handleChange}
                name="rating"
                value={product?.rating}
                customInput={Input}
                w={300}
              />
            </div>

            <div>
              <FormLabel>Estoque</FormLabel>
              <NumericFormat
                onChange={handleChange}
                name="stock"
                value={product?.stock}
                customInput={Input}
                w={300}
              />
            </div>
          </div>

          <div className={style.container} style={{ marginTop: "30px" }}>
            <Card maxW="auto">
              <CardHeader>
                <Text as="b">Imagem principal</Text>
              </CardHeader>
              <CardBody
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                <Image
                  src={product?.thumbnail ?? emptyImage}
                  alt={product?.title}
                  width={300}
                  height="auto"
                />
                <input
                  type="file"
                  accept="image/*"
                  name="thumbnail"
                  id="thumbnail"
                  onChange={handleFileChange}
                  className={style["input-file"]}
                />
                <label htmlFor="thumbnail" className={style["label-file"]}>
                  Troque a imagem
                </label>
              </CardBody>
            </Card>

            <Card maxW="auto">
              <CardHeader>
                <Text as="b">Imagens</Text>
              </CardHeader>
              <CardBody
                display="flex"
                justifyContent="center"
                flexWrap="wrap"
                gap="20px"
              >
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
      </Box>
    </>
  );
}
