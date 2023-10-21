import api from "../../services/api";
import { ProductType } from "./context/ProductContext";

export const getProducts = new Promise<ProductType[]>((resolve) => {
  api
    .get("/products")
    .then((res) => {
      const products: ProductType[] = res.data.products;
      resolve(products);
    })
    .catch((err) => {
      console.error(err);
    });
});

export function deleteProduct(id: number) {
  return new Promise((resolve) => {
    api
      .delete(`/products/${id}`)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.error(err);
      });
  });
}
