import { useEffect, useState } from "react";
import { FormLabel, Input, Select } from "@chakra-ui/react";
import { ProductType, useProduct } from "../../context/ProductContext";
import { NumericFormat } from "react-number-format";
import { GetCategories } from "./service";
import style from "./style.module.css";

export default function Form({ isReadOnly }: { isReadOnly?: boolean }) {
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
    setProduct(
      (prevProduct) =>
        ({ ...prevProduct, [e.target.name]: e.target.value } as ProductType)
    );
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
          readOnly={isReadOnly}
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
          readOnly={isReadOnly}
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
          readOnly={isReadOnly}
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
          readOnly={isReadOnly}
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
          readOnly={isReadOnly}
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
          isReadOnly={isReadOnly}
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
          decimalScale={2}
          fixedDecimalScale
          decimalSeparator=","
          maxLength={5}
          w={300}
          readOnly={isReadOnly}
        />
      </div>

      <div>
        <FormLabel>Estoque</FormLabel>
        <NumericFormat
          onChange={handleChange}
          name="stock"
          value={product?.stock}
          customInput={Input}
          decimalScale={0}
          w={300}
          readOnly={isReadOnly}
        />
      </div>
    </div>
  );
}
