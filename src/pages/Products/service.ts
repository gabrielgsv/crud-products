import api from "../../services/api";
import { ProductType } from "./context/ProductContext";

export function getAndSearchProducts(search?: string) {
  return new Promise<ProductType[]>((resolve) => {
    const url = search ? `/products/search?q=${search}` : "/products";
    api
      .get(url)
      .then((res) => {
        const products: ProductType[] = res.data.products;
        resolve(products);
      })
      .catch((err) => {
        console.error(err);
      });
  });
}

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
