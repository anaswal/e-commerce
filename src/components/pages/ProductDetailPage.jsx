import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { IoIosAdd, IoIosRemove } from "react-icons/io";
import { IoHeartOutline } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { axiosInstance } from "@/lib/axios";

const ProductDetailPage = () => {
  const [product, setProduct] = useState({
    productName: "",
    price: 0,
    imgSrc: "",
    stock: 0,
    id: 0,
  });
  const params = useParams();

  const fetchDetailProduct = async () => {
    try {
      const response = await axiosInstance.get(`/products/${params.productId}`);
      setProduct(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDetailProduct();
  }, []);

  return (
    <main className="min-h-screen max-w-screen-lg mx-auto px-4 mt-8">
      <div className="grid grid-cols-2 gap-8">
        <img
          src={product.imgSrc}
          alt={product.productName}
          className="w-full"
        />
        <div className="flex flex-col justify-center gap-1">
          <h1 className="text-xl">{product.productName}</h1>
          <h3 className="text-3xl font-bold">
            Rp {product.price.toLocaleString("id-ID")}
          </h3>
          <p className="text-muted-foreground">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis,
            fugiat iste nemo deleniti nisi possimus molestias expedita suscipit
            earum minima.
          </p>
          <div className="flex items-center gap-8">
            <Button size="icon" variant="ghost">
              <IoIosRemove className="h-6 w-6" />
            </Button>
            <p className="text-lg font-bold">0</p>
            <Button size="icon" variant="ghost">
              <IoIosAdd className="h-6 w-6" />
            </Button>
          </div>
          <div className="flex gap-2">
            <Button className="w-full">Add to cart</Button>
            <Button size="icon" variant="ghost">
              <IoHeartOutline className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetailPage;
