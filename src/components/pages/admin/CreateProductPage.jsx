import ProductForm from "@/components/forms/ProductForm";
import AdminLayout from "@/components/layout/AdminLayout";
import { axiosInstance } from "@/lib/axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const CreateProductPage = () => {
  const navigate = useNavigate();

  const handleCreateProduct = async (values) => {
    try {
      await axiosInstance.post("/products", {
        productName: values.productName,
        imgUrl: values.imgUrl,
        price: values.price,
        stock: values.stock,
      });
      alert("Product created!");
      navigate("/admin/products");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AdminLayout title="Create Products" description="Add new products">
      <ProductForm
        title="Add Your Product"
        description="Add Product"
        onSubmit={handleCreateProduct}
      />
    </AdminLayout>
  );
};

export default CreateProductPage;
