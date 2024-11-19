import React from "react";
import { useState } from "react";
import { Button } from "./button";
import { IoIosAdd, IoIosRemove } from "react-icons/io";
import { Link } from "react-router-dom";
import { axiosInstance } from "@/lib/axios";
import { useSelector } from "react-redux";
import { getCartItems } from "../services/cartService";

const ProductCard = (props) => {
  const { imgUrl, productName, price, stock, id } = props;

  const userSelector = useSelector((state) => state.user);
  const [quantity, setQuantity] = useState(0);

  const addToCart = async () => {
    try {
      if (!userSelector.id) {
        alert("Please login first");
        return;
      }

      const cartResponse = await axiosInstance.get("/carts", {
        params: {
          userId: useSelector.id,
          _embed: "product",
        },
      });

      const existingProduct = cartResponse.data.find((cart) => {
        return cart.productId === id;
      });

      if (!existingProduct) {
        await axiosInstance.post("/carts", {
          userId: userSelector.id,
          productId: id,
          quantity,
        });
      } else {
        if (
          existingProduct.quantity + quantity >
          existingProduct.product.stock
        ) {
          alert("Quantity is over the stock!");
          return;
        }
        await axiosInstance.patch("/carts/" + existingProduct.id, {
          quantity: existingProduct.quantity + quantity,
        });
      }
      getCartItems(userSelector.id);
      alert("Product added to cart!");
    } catch (err) {
      console.log(err);
    }
  };

  const incrementQuantity = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="p-4 border rounded-md md:max-w-96 flex flex-col gap-4">
      <Link
        to={"/product/" + id}
        className="aspect-square w-full overflow-hidden"
      >
        <img className="w-full" src={imgUrl} alt="product" />
      </Link>
      <Link to={"/product/" + id}>
        <p className="text-md">{productName}</p>
        <p className="text-xl font-semibold">
          Rp {price.toLocaleString("id-ID")}
        </p>
        <p className="text-muted-foreground text-sm">In stock : {stock}</p>
      </Link>
      <div className="flex justify-between items-center">
        <Button
          size="icon"
          variant="ghost"
          onClick={decrementQuantity}
          disabled={quantity <= 0}
        >
          <IoIosRemove className="h-6 w-6" />
        </Button>
        <p className="text-lg font-bold">{quantity}</p>
        <Button
          size="icon"
          variant="ghost"
          onClick={incrementQuantity}
          disabled={quantity >= stock}
        >
          <IoIosAdd className="h-6 w-6" />
        </Button>
      </div>
      <Button onClick={addToCart} disabled={!stock || quantity < 1}>
        {stock > 0 ? "Add to cart" : "Out of stock"}
      </Button>
    </div>
  );
};

export default ProductCard;
