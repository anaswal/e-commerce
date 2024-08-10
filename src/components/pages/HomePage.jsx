import React from "react";
import ProductCard from "../ui/ProductCard";
import { useState, useEffect } from "react";
import { axiosInstance } from "@/lib/axios";

const HomePage = () => {
  const [data, setData] = useState([]);
  const [productLoading, setProductLoading] = useState(false);

  const fetchProducts = async () => {
    setProductLoading(true);
    try {
      const response = await axiosInstance.get("/products");
      setData(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setProductLoading(false);
    }
  };
  const products = data.map((product) => {
    return (
      <ProductCard
        id={product.id}
        productName={product.title}
        imgSrc={product.image}
        price={product.price}
        stock={product.rating.count}
      />
    );
  });

  // fetch data product once, when homepage is loaded
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <main className="min-h-[90vh] max-w-screen-md mx-auto px-4 mt-8">
        <div className="pb-20 mx-auto text-center flex flex-col items-center max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Become a trend setter with us.
          </h1>
          <p className="mt-6 text-lg max-w-prose text-muted-foreground">
            e-Kommers provide you with th finest clothings and ensures your
            confidence througout your days.
          </p>
        </div>
        {productLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-2 gap-4">{products}</div>
        )}
      </main>
    </>
  );
};

export default HomePage;
