import { useParams } from "react-router-dom";

export default function EditProduct() {
  const { id } = useParams();
  return (
    <>
      <h1>EditProduct</h1>
      <p>Id: {id}</p>
    </>
  );
}
