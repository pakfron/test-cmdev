import axios, { AxiosError, all } from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
export interface typeProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: Array<string>;
}

interface typeProducts {
  products: Array<typeProduct>;
}
type Props = {};
const URL: string = "https://dummyjson.com/products";
export default function HomePage({}: Props) {
  const navigate = useNavigate();
  const [allProduct, setProduct] = useState<typeProduct[]>([]);
  const [findProduct, setFindProduct] = useState("");
  const [resultFindProduct, setResultFindProduct] = useState<typeProduct[]>([]);
  const [optionType, setOptionType] = useState<string>("allProduct");
  const [totals, setTotal] = useState<number>(0);
  useEffect(() => {
    const search = setTimeout(() => {
      const searchProduct = allProduct.filter((data) =>
        data.title.toLowerCase().includes(findProduct.toLowerCase())
      );
      setResultFindProduct(searchProduct);
      console.log(searchProduct);
    }, 1000);
    return () => clearTimeout(search);
  }, [findProduct]);

  useEffect(() => {
    if (optionType === "allProduct") {
      fetchProduct();
    
    }
    if (optionType === "1000") {
      console.log(optionType);
      const product = allProduct.filter((data) => {
        return data.price > 1000;
      });
      setProduct(product);
    }
    if (optionType === "eachPrice") {
      fetchProduct();
    }
  }, [optionType]);
  const fetchProduct = async () => {
    try {
      const response = await axios.get<typeProducts>(URL);
      setProduct(response.data.products);

      const totalPrice = response.data.products.reduce((acc: number, item) => {
        const total: number = item.price * item.stock;
        acc = acc + total;
        return acc;
      }, 0);
      setTotal(totalPrice);


    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
      }
    }
  };
  const findProductOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFindProduct(e.target.value);
  };

  const optionProductOnchange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOptionType(e.target.value);
    console.log(optionType);
  };

  return (
    <div>
      <div>
        <input type="text" onChange={(e) => findProductOnchange(e)} />
      </div>
      <div>
        <select
          value={optionType}
          onChange={(e) => {
            optionProductOnchange(e);
          }}
        >
          <option value="allProduct">All Product</option>
          <option value="1000">มากกว่า 1000</option>
          <option value="eachPrice">ราคารวมต่อชิ้น</option>
          <option value="TotalPrice">ราคารวมทั้งหมด</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Thumnal</th>
            <th>Title</th>
            <th>Price</th>
            <th>Stock</th>
            {optionType === "eachPrice" ? <th>Price</th> : ""}
            <th>Detail</th>
          </tr>
        </thead>
        <tbody>
          {resultFindProduct.length !== 0
            ? resultFindProduct.map((el) => (
                <tr key={el.id}>
                  <td>
                    <img src={el.thumbnail} width={30} height={30} />
                  </td>
                  <td>{el.title}</td>
                  <td>{el.price}</td>
                  <td>{el.stock}</td>
                  <td>
                    <button
                      onClick={(e) => {
                        navigate(`/product/${el.id}`);
                      }}
                    >
                      Detail
                    </button>
                  </td>
                </tr>
              ))
            : allProduct.map((el) => (
                <tr key={el.id}>
                  <td>
                    <img src={el.thumbnail} width={30} height={30} />
                  </td>
                  <td>{el.title}</td>
                  <td>{el.price}</td>
                  <td>{el.stock}</td>
                  {optionType === "eachPrice" ? (
                    <td>{el.price * el.stock}</td>
                  ) : (
                    ""
                  )}
                  <td>
                    <button
                      onClick={(e) => {
                        navigate(`/product/${el.id}`);
                      }}
                    >
                      Detail
                    </button>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
      <label>{totals}</label>
    </div>
  );
}
