import React, { useEffect, useState } from "react";
import SignedInPage from "../guard/SignedInPage";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Navigate, useParams } from "react-router-dom";
import { axiosInstance } from "@/lib/axios";
import { format } from "date-fns";
import { useSelector } from "react-redux";

const HistoryDetailPage = () => {
  const [transaction, setTransaction] = useState({
    id: "",
    userId: "",
    totalPrice: 0,
    tax: 0,
    transactionDate: null,
    items: [],
  });
  const params = useParams();
  const userSelector = useSelector((state) => state.user);

  const fetchTransactionData = async () => {
    try {
      const response = await axiosInstance.get(
        "/transactions/" + params.transactionId
      );
      setTransaction(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTransactionData();
  }, []);

  // resource ownership
  if (userSelector.id !== transaction.userId && transaction.userId) {
    <Navigate to={"/"} />;
  }

  return (
    <SignedInPage>
      <main className="min-h-screen max-w-screen-lg mx-auto px-4 mt-8">
        <h1 className="text-3xl font-bold">INV-{transaction.id}</h1>
        <h2 className="text-xl font-bold">
          {format(new Date(transaction.transactionDate), "dd/MM/yyyy")}
        </h2>

        <Card className="col-span-5 bg-gray-50 border-0 h-min">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex pb-4 justify-between">
              <span className="text-sm text-muted-foreground">Subtotal</span>
              <span>Rp {transaction.totalPrice.toLocaleString("id-ID")}</span>
            </div>
            <div className="flex py-4 justify-between border-b">
              <span className="text-sm text-muted-foreground">Taxes (10%)</span>
              <span>Rp {transaction.tax.toLocaleString("id-ID")}</span>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-6">
            <div className="flex pb-4 justify-between w-full">
              <span className="font-semibold text-muted-foreground">
                Order Total
              </span>
              <span className="font-semibold">
                Rp{" "}
                {(transaction.totalPrice + transaction.tax).toLocaleString(
                  "id-ID"
                )}
              </span>
            </div>
          </CardFooter>
        </Card>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead colSpan={2}>Product</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Total Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transaction.items.map((cartItem) => {
              return (
                <TableRow className="text-muted-foreground font-semibold">
                  <TableCell colSpan={2}>
                    <div className="flex items-center gap-6">
                      <div className="aspect-square w-[100px] overflow-hidden rounded-md">
                        <img src={cartItem.product.imgUrl} alt="Product" />
                      </div>
                      <p className="font-semibold text-primary">
                        {cartItem.product.productName}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    Rp {cartItem.product.price.toLocaleString("id-ID")}
                  </TableCell>
                  <TableCell>{cartItem.quantity}</TableCell>
                  <TableCell>
                    Rp {transaction.totalPrice.toLocaleString("id-ID")}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </main>
    </SignedInPage>
  );
};

export default HistoryDetailPage;
