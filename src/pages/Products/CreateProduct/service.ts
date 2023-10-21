import api from "../../../services/api";
import { ProductType } from "../context/ProductContext";

export function saveProduct(product: ProductType) {
  return new Promise((resolve, reject) => {
    api
      .post(`/products/add`, { ...product, id: undefined })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.error(err);
        reject();
      });
  });
}
