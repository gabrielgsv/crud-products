import { useEffect, useState } from "react";
import { FormLabel, Input, Select } from "@chakra-ui/react";
import { ProductType, useProduct } from "../../context/ProductContext";
import { NumericFormat } from "react-number-format";
import { GetCategories } from "../../EditProduct/service";
import style from "./style.module.css"

export default function Form() {
  const { product, setProduct } = useProduct();
  const [categories, setCategories] = useState<string[]>();

  useEffect(() => {
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
  return (
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
  );
}