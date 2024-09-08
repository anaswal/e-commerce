import ProductForm from "@/components/forms/ProductForm";
import AdminLayout from "@/components/layout/AdminLayout";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "@/lib/axios";

const EditProductPage = () => {
  const [product, setProduct] = useState({
    productName: "",
    price: 0,
    imgUrl: "",
    description: "",
    id: 0,
  });
  const params = useParams();

  const navigate = useNavigate();

  const handleEditProduct = async (values) => {
    try {
      await axiosInstance.patch("/products/" + params.productId, {
        productName: values.productName,
        imgUrl: values.imgUrl,
        price: values.price,
        stock: values.stock,
      });
      alert("Product edited!");
      navigate("/admin/products");
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDetailProduct = async () => {
    try {
      const response = await axiosInstance.get(`/products/` + params.productId);
      setProduct(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDetailProduct();
  }, []);

  return (
    <AdminLayout
      title="Edit Product Page"
      description="Edit your selected product"
    >
      {product.id ? (
        <ProductForm
          title={"Edit " + product.productName}
          defaultProductName={product.productName}
          defaultImgUrl={product.imgUrl}
          defaultPrice={product.price}
          defaultStock={product.stock}
          description="Edit Product"
          onSubmit={handleEditProduct}
        />
      ) : null}
    </AdminLayout>
  );
};

export default EditProductPage;
