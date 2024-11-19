import React from "react";
import SignedInPage from "../guard/SignedInPage";
import { Separator } from "../ui/separator";
import { CartItem } from "../CartItem";
import { useSelector } from "react-redux";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { axiosInstance } from "@/lib/axios";
import { getCartItems } from "../services/cartService";

const CartPage = () => {
  const cartSelector = useSelector((state) => state.cart);
  const userSelector = useSelector((state) => state.user);

  const totalPrice = cartSelector.items.reduce((a, b) => {
    return a + b.quantity * b.product.price;
  }, 0);
  const tax = totalPrice / 10;
  const orderTotal = totalPrice + tax;

  const handleCheckout = async () => {
    // checking items are available
    for (let i = 0; i < cartSelector.items.length; i++) {
      const currentCartItem = cartSelector.items[i];
      if (currentCartItem.quantity > currentCartItem.product.stock) {
        alert("One of your items is unavailable");
        return;
      }
    }

    // post all items to transactions history
    await axiosInstance.post("/transactions", {
      userId: userSelector.id,
      totalPrice,
      tax,
      transactionDate: new Date(),
      items: cartSelector.items,
    });

    // update stock
    cartSelector.items.forEach(async (cartItem) => {
      await axiosInstance.patch("/products/" + cartItem.productId, {
        stock: cartItem.product.stock - cartItem.quantity,
      });
    });

    //delete items in cart
    cartSelector.items.forEach(async (cartItem) => {
      await axiosInstance.delete("/carts/" + cartItem.id);
    });
    getCartItems(userSelector.id);
    alert("Checkout success!");
  };

  return (
    <SignedInPage>
      <main className="min-h-screen max-w-screen-lg mx-auto mt-8">
        <h1 className="font-bold text-3xl">My Cart</h1>
        <div className="mt-10">
          <Separator />
          <div className="grid grid-cols-12 gap-8 my-8">
            <div className="col-span-7 gap-6 flex flex-col">
              {cartSelector.items.length > 0 ? (
                cartSelector.items.map((cartItem) => {
                  return (
                    <CartItem
                      imgUrl={cartItem.product.imgUrl}
                      price={cartItem.product.price}
                      name={cartItem.product.productName}
                      stock={cartItem.product.stock}
                      quantity={cartItem.quantity}
                      cartId={cartItem.id}
                    />
                  );
                })
              ) : (
                <p className="text-muted-foreground">Cart Empty</p>
              )}
            </div>
            <Card className="col-span-5 bg-gray-50 border-0 h-min">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex pb-4 justify-between">
                  <span className="text-sm text-muted-foreground">
                    Subtotal
                  </span>
                  <span>Rp {totalPrice.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex py-4 justify-between border-b">
                  <span className="text-sm text-muted-foreground">
                    Taxes (10%)
                  </span>
                  <span>Rp {tax.toLocaleString("id-ID")}</span>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-6">
                <div className="flex pb-4 justify-between w-full">
                  <span className="font-semibold text-muted-foreground">
                    Order Total
                  </span>
                  <span className="font-semibold">
                    Rp {orderTotal.toLocaleString("id-ID")}
                  </span>
                </div>
                <Button className="w-full" onClick={handleCheckout}>
                  Checkout
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </SignedInPage>
  );
};

export default CartPage;
