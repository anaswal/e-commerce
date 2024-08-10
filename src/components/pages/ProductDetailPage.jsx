import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { IoIosAdd, IoIosRemove } from "react-icons/io";
import { IoHeartOutline } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { axiosInstance } from "@/lib/axios";
import { Skeleton } from "../ui/skeleton";

// 1. Get the ID
// 2. Fetch product with the right ID
// 3. Add the ID to state
// 4. Render data from the state to UI

const ProductDetailPage = () => {
  const [product, setProduct] = useState({
    title: "",
    price: 0,
    image: "",
    description: "",
    id: 0,
  });
  const params = useParams();
  const [productIsLoading, setProductIsLoading] = useState(true);

  const fetchDetailProduct = async () => {
    try {
      const response = await axiosInstance.get(`/products/${params.productId}`);
      setProduct(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setProductIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDetailProduct();
  }, []);

  return (
    <main className="min-h-screen max-w-screen-lg mx-auto px-4 mt-8">
      <div className="grid grid-cols-2 gap-8">
        {productIsLoading ? (
          <Skeleton className="w-[400px] h[400px]" />
        ) : (
          <img src={product.image} alt={product.title} className="w-full" />
        )}

        <div className="flex flex-col justify-center gap-1">
          {productIsLoading ? (
            <Skeleton className="w-[200px] h-[20px]" />
          ) : (
            <h1 className="text-xl">{product.title}</h1>
          )}

          {productIsLoading ? (
            <Skeleton className="w-[200px] h-[20px]" />
          ) : (
            <h3 className="text-3xl font-bold">
              Rp {product.price.toLocaleString("id-ID")}
            </h3>
          )}

          {productIsLoading ? (
            <Skeleton className="w-[400px] h-[200px]" />
          ) : (
            <p className="text-muted-foreground">{product.description}</p>
          )}

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
