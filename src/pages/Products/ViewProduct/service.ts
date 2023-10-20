import axios from "axios";
import { ProductType } from "../context/ProductContext";

export function GetProductById(id: number) {
  return new Promise<ProductType>((resolve) => {
    axios
      .get(`https://dummyjson.com/products/${id}`)
      .then((res) => {
        const product: ProductType = res.data;
        resolve(product);
      })
      .catch((err) => {
        console.error(err);
      });
  });
}
