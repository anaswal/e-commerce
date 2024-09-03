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
import { ChevronLeft, ChevronRight, Ellipsis } from "lucide-react";
import { axiosInstance } from "@/lib/axios";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "../../ui/pagination";
import { Link, useSearchParams } from "react-router-dom";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";

const ProductManagementPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [productName, setProductName] = useState("");

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
          <Link to="/admin/products/create">
            <Button>
              <IoAdd className="h-6 w-6 mr-2" />
              Add product
            </Button>
          </Link>
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
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.productName}</TableCell>
                  <TableCell>
                    Rp {product.price.toLocaleString("id-ID")}
                  </TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <Ellipsis className="w-6 h-6" />
                    </Button>
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
