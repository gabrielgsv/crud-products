import api from "../../../../services/api";

export function GetCategories() {
  return new Promise<string[]>((resolve) => {
    api
      .get(`/products/categories`)
      .then((res) => {
        const categories: string[] = res.data;
        resolve(categories);
      })
      .catch((err) => {
        console.error(err);
      });
  });
}
