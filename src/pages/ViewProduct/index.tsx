import { useParams } from "react-router-dom";

export default function ViewProduct() {
  const {id} = useParams();
  return (
    <>
      <h1>ViewProduct</h1>
      <p>ID: {id}</p>
    </>
  );
}
