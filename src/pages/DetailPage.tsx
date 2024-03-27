import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { typeProduct } from "./HomePage";

type Props = {};
export default function DetailPage({}: Props) {
  const { productId } = useParams();
  const [product, setProduct] = useState<typeProduct[]>([]);

  useEffect(() => {
    getProductById();
  }, []);
  const getProductById = async () => {
    try {
      const response = await axios.get<typeProduct>(
        `https://dummyjson.com/products/${productId}`
      );
      console.log(response.data);
      setProduct([response.data]);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      {product.map((el) => (
        <>
          {el.images.map((img) => (
            <img src={img} width={150} height={150} />
          ))}
          <div>
            <div>Title : {el.title}</div>
            <div>Price : {el.price}</div>
            <div>stock : {el.stock}</div>
          </div>
        </>
      ))}
    </div>
  );
}
