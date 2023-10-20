import axios from "axios";
import { ProductsType } from "../../../types/Products";

export function GetProductById(id: number) {
  return new Promise<ProductsType>((resolve) => {
    axios
      .get(`https://dummyjson.com/products/${id}`)
      .then((res) => {
        const product: ProductsType = res.data;
        resolve(product);
      })
      .catch((err) => {
        console.error(err);
      });
  });
}
