import ProductForm from "@/components/forms/ProductForm";
import AdminLayout from "@/components/layout/AdminLayout";
import React from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "@/lib/axios";

const EditProductPage = () => {
  const navigate = useNavigate();

  const handleEditProduct = async (values) => {
    try {
      await axiosInstance.put("/products", {
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
  return (
    <AdminLayout
      title="Edit Product Page"
      description="Edit your selected product"
    >
      <ProductForm
        title="Edit Your Product"
        description="Edit Product"
        onSubmit={handleEditProduct}
      />
    </AdminLayout>
  );
};

export default EditProductPage;
