import api from "../../../services/api";
import { ProductType } from "../context/ProductContext";

export function editProduct(product: ProductType) {
  return new Promise((resolve, reject) => {
    api
      .put(`/products/${product.id}`, { ...product, id: undefined })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.error(err);
        reject();
      });
  });
}
