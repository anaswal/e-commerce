import React, { useEffect, useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import { Button } from "../ui/button";
import { IoAdd } from "react-icons/io5";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { ChevronLeft, ChevronRight, Ellipsis } from "lucide-react";
import { axiosInstance } from "@/lib/axios";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "../ui/pagination";

const ProductManagementPage = () => {
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get("/products", {
        params: {
          limit: 5,
        },
      });
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <>
      <AdminLayout
        title="Product Management Page"
        description="Manage our store's products"
        rightSection={
          <Button>
            <IoAdd className="h-6 w-6 mr-2" />
            Add product
          </Button>
        }
      >
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
                  <TableCell>{product.title}</TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell>{product.rating.count}</TableCell>
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
              <Button variant="ghost">
                <ChevronLeft className="w-6 h-6 mr-2" /> Previous
              </Button>
            </PaginationItem>
            <PaginationItem className="mx-b font-semibold">
              Page 1
            </PaginationItem>
            <PaginationItem>
              <Button variant="ghost">
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
