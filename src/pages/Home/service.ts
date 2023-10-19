import axios from "axios";
import { Products } from "../../types/Products";

export const getProducts = new Promise<Products[]>((resolve) => {
  axios
    .get("https://dummyjson.com/products")
    .then((res) => {
      const products: Products[] = res.data.products;
      resolve(products);
    })
    .catch((err) => {
      console.error(err);
    });
});

export function deleteProduct(id: number) {
  return new Promise((resolve) => {
    axios
      .delete(`https://dummyjson.com/products/${id}`)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.error(err);
      });
  });
}
