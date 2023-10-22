import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Image,
  Text,
} from "@chakra-ui/react";
import { FiPlus, FiXCircle } from "react-icons/fi";
import emptyImage from "../../../../assets/empty-image.svg";
import { useProduct } from "../../context/ProductContext";
import style from "./style.module.css";

export default function ImagesForm({ isReadOnly }: { isReadOnly?: boolean }) {
  const { product, setProduct } = useProduct();

  function handleFileChange(
    e: React.ChangeEvent<HTMLInputElement>,
    multiple?: boolean
  ) {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = URL.createObjectURL(file);
        if (multiple) {
          setProduct((prevProduct) => ({
            ...prevProduct,
            images: [...product.images, imageUrl],
          }));
        } else {
          setProduct((prevProduct) => ({
            ...prevProduct,
            [e.target.name]: imageUrl,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  }
  return (
    <div style={{ marginTop: "30px" }}>
      <Card variant="filled" maxW={500} mb={5}>
        <CardHeader>
          <Text as="b">Imagem principal</Text>
        </CardHeader>
        <CardBody display="flex" flexDirection="column" alignItems="center">
          <Image
            id="thumbnail"
            src={product?.thumbnail}
            alt={product?.title}
            fallbackSrc={emptyImage}
            width={300}
            height="auto"
          />
          {!isReadOnly && (
            <>
              <input
                id="thumbnail-input"
                type="file"
                accept="image/*"
                name="thumbnail"
                onChange={handleFileChange}
                className={style["input-file"]}
              />
              <label htmlFor="thumbnail" className={style["label-file"]}>
                Troque a imagem
              </label>
            </>
          )}
        </CardBody>
      </Card>

      <Card maxW="auto" variant="elevated">
        <CardHeader>
          <Text as="b">Imagens adicionais</Text>
        </CardHeader>
        <CardBody className={style["card-images"]}>
          {product?.images.map((image, index) => (
            <div key={index} className={style["container-images"]}>
              <Image
                id={`image-${index}`}
                key={image}
                src={image}
                alt={product?.title}
                className={style.images}
                fallbackSrc={emptyImage}
              />
              {!isReadOnly && (
                <Button
                  id={`remove-image-${index}`}
                  colorScheme="gray"
                  leftIcon={<FiXCircle size={20} />}
                  onClick={() =>
                    setProduct({
                      ...product,
                      images: product.images.filter((item) => item !== image),
                    })
                  }
                >
                  Remover
                </Button>
              )}
            </div>
          ))}

          {!isReadOnly && (
            <div
              className={style["container-images"]}
              style={{ width: "100%", height: 250 }}
            >
              <input
                id="add-image-input"
                type="file"
                accept="image/*"
                name="images"
                onChange={(e) => handleFileChange(e, true)}
                className={style["input-file"]}
              />
              <label
                htmlFor="images"
                className={style["label-file"]}
                style={{
                  borderRadius: 30,
                  width: 50,
                  height: 50,
                  padding: 10,
                }}
              >
                <FiPlus size={30} />
              </label>
              Adicionar
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
