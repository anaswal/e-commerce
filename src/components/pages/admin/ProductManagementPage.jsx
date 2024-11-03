import React, { useEffect, useState } from "react";
import AdminLayout from "../../layout/AdminLayout";
import { Button } from "../../ui/button";
import { IoAdd } from "react-icons/io5";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { ChevronLeft, ChevronRight, Edit, Trash } from "lucide-react";
import { axiosInstance } from "@/lib/axios";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "../../ui/pagination";
import { Link, useSearchParams } from "react-router-dom";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Checkbox } from "@/components/ui/checkbox";

const ProductManagementPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [productName, setProductName] = useState("");
  const [selectedProductId, setSelectedProductId] = useState([]);

  const handleNextPage = () => {
    searchParams.set("page", Number(searchParams.get("page")) + 1);
    setSearchParams(searchParams);
  };

  const handlePreviousPage = () => {
    searchParams.set("page", Number(searchParams.get("page")) - 1);
    setSearchParams(searchParams);
  };

  const searchProduct = () => {
    if (productName) {
      searchParams.set("search", productName);
      setSearchParams(searchParams);
    } else {
      searchParams.delete("search");
      setSearchParams(searchParams);
    }
  };

  const handleDeleteProduct = async () => {
    const isDelete = confirm(
      `Are you sure you want to delete ${selectedProductId.length} products?`
    );
    if (!isDelete) return;

    const deletePromises = selectedProductId.map((productId) => {
      return axiosInstance.delete("/products/" + productId);
    });

    try {
      await Promise.all(deletePromises);
      alert(`Successfully deleted ${selectedProductId.length} products.`);
      searchParams.set("page", 1);
      setSearchParams(searchParams);
      setSelectedProductId([]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleOnCheckedBox = (productId, checked) => {
    if (checked) {
      setSelectedProductId([...selectedProductId, productId]);
    } else {
      const productIdIndex = selectedProductId.findIndex((id) => {
        return id == productId;
      });
      const prevSelectedProductId = [...selectedProductId];
      prevSelectedProductId.splice(productIdIndex, 1);
      setSelectedProductId(prevSelectedProductId);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get("/products", {
        params: {
          _per_page: 5,
          _page: Number(searchParams.get("page")),
          productName: searchParams.get("search"),
        },
      });
      setProducts(response.data.data);
      setHasNextPage(Boolean(response.data.next));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (searchParams.get("page")) {
      fetchProducts();
    }
  }, [searchParams.get("page"), searchParams.get("search")]);

  useEffect(() => {
    if (!searchParams.get("page")) {
      searchParams.set("page", 1);
      setSearchParams(searchParams);
    }
  }, []);

  return (
    <>
      <AdminLayout
        title="Product Management Page"
        description="Manage our store's products"
        rightSection={
          <div className="flex gap-4">
            {selectedProductId.length > 1 ? (
              <Button variant="destructive" onClick={handleDeleteProduct}>
                Delete {selectedProductId.length} Products
              </Button>
            ) : selectedProductId.length == 1 ? (
              <Button variant="destructive" onClick={handleDeleteProduct}>
                Delete {selectedProductId.length} Product
              </Button>
            ) : null}
            <Link to="/admin/products/create">
              <Button>
                <IoAdd className="h-6 w-6 mr-2" />
                Add product
              </Button>
            </Link>
          </div>
        }
      >
        <div className="mb-3">
          <Label>Search Product</Label>
          <div className="flex gap-4">
            <Input
              className="max-w-[400px]"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Input Product Name..."
            />
            <Button onClick={searchProduct}>Search</Button>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Product Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          {products.map((product) => {
            return (
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Checkbox
                      onCheckedChange={(checked) => {
                        handleOnCheckedBox(product.id, checked);
                      }}
                      checked={selectedProductId.includes(product.id)}
                    />
                  </TableCell>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.productName}</TableCell>
                  <TableCell>
                    Rp {product.price.toLocaleString("id-ID")}
                  </TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    <Link to={"/admin/products/edit/" + product.id}>
                      <Button variant="ghost" size="icon">
                        <Edit className="w-6 h-6" />
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              </TableBody>
            );
          })}
        </Table>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <Button
                variant="ghost"
                onClick={handlePreviousPage}
                disabled={searchParams.get("page") == 1}
              >
                <ChevronLeft className="w-6 h-6 mr-2" /> Previous
              </Button>
            </PaginationItem>
            <PaginationItem className="mx-8 font-semibold">
              Page {searchParams.get("page")}
            </PaginationItem>
            <PaginationItem>
              <Button
                variant="ghost"
                onClick={handleNextPage}
                disabled={!hasNextPage}
              >
                Next <ChevronRight className="w-6 h-6 ml-2" />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </AdminLayout>
    </>
  );
};

export default ProductManagementPage;
