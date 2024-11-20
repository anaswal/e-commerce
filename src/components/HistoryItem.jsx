import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const HistoryItem = (props) => {
  return (
    <div>
      <div className="flex justify-between items-center rounded-md bg-slate-50 p-4">
        <div className="flex flex-col justify-center">
          <span className="text-muted-foreground text-sm">{props.date}</span>
          <span className="text-muted-foreground font-semibold">
            INV-{props.id}
          </span>
        </div>
        <div className="flex flex-col justify-center items-end">
          <span className="text-2xl font-bold">
            Rp {props.totalPrice.toLocaleString("id-ID")}
          </span>
          <Link to={"/history/" + props.id}>
            <Button variant="link">View details</Button>
          </Link>
        </div>
      </div>

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
          {props.items.map((cartItem) => {
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
                  Rp {props.totalPrice.toLocaleString("id-ID")}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default HistoryItem;
