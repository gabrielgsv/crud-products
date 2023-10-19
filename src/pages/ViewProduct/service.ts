import axios from "axios";
import { Products } from "../../types/Products";

export function GetProductById(id: number) {
  return new Promise<Products>((resolve) => {
    axios
      .get(`https://dummyjson.com/products/${id}`)
      .then((res) => {
        const product: Products = res.data;
        resolve(product);
      })
      .catch((err) => {
        console.error(err);
      });
  });
}
