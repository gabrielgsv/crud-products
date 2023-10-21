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
