/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useContext } from "react";

export type ProductType = {
  id: number | null;
  title: string;
  description: string;
  price: number | null | string;
  discountPercentage: number | null;
  rating: number | null;
  stock: number | null;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
};

type ProductTypeContext = {
  product: ProductType | null;
  setProduct: React.Dispatch<React.SetStateAction<ProductType>>;
};

export const DEFAULT_VALUE = {
  product: {
    id: null,
    title: "",
    description: "",
    price: null,
    discountPercentage: null,
    rating: null,
    stock: null,
    brand: "",
    category: "",
    thumbnail: "",
    images: [""],
  },
  setProduct: () => {},
};

const ProductContext = createContext<ProductTypeContext>(DEFAULT_VALUE);

type Props = {
  children: JSX.Element;
};
export default function ProductProvider({ children }: Props) {
  const [product, setProduct] = useState<ProductType>(DEFAULT_VALUE.product);

  return (
    <ProductContext.Provider
      value={{
        product,
        setProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProduct() {
  const context = useContext(ProductContext);
  if (!context)
    throw new Error("useProduct must be used within a FormProvider");
  const { product, setProduct } = context;

  return {
    product,
    setProduct,
  };
}
