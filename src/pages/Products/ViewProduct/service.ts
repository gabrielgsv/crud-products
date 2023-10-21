import api from "../../../services/api";
import { ProductType } from "../context/ProductContext";

export function GetProductById(id: number) {
  return new Promise<ProductType>((resolve) => {
    api
      .get(`/products/${id}`)
      .then((res) => {
        const product: ProductType = res.data;
        resolve(product);
      })
      .catch((err) => {
        console.error(err);
      });
  });
}
