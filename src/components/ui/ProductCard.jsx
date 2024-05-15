import React from "react";
import { useState } from "react";
import { Button } from "./button";
import { IoIosAdd, IoIosRemove } from "react-icons/io";

const addToCart = () => alert("Clicked");

const ProductCard = (props) => {
  const { imgSrc, productName, price, stock } = props;

  const [quantity, setQuantity] = useState(0);

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    setQuantity(quantity - 1);
  };

  let disabled = false;
  if (quantity <= 0) {
    disabled = true;
  }
  return (
    <div className="p-4 border rounded-md md:max-w-96 flex flex-col gap-4">
      <div className="aspect-square w-full overflow-hidden">
        <img className="w-full" src={imgSrc} alt="product" />
      </div>
      <div>
        <p className="text-md">{productName}</p>
        <p className="text-xl font-semibold">
          Rp {price.toLocaleString("id-ID")}
        </p>
        <p className="text-muted-foreground text-sm">In stock : {stock}</p>
      </div>
      <div className="flex justify-between items-center">
        <Button
          size="icon"
          variant="ghost"
          onClick={decrementQuantity}
          disabled={disabled}
        >
          <IoIosRemove className="h-6 w-6" />
        </Button>
        <p className="text-lg font-bold">{quantity}</p>
        <Button size="icon" variant="ghost" onClick={incrementQuantity}>
          <IoIosAdd className="h-6 w-6" />
        </Button>
      </div>
      <Button onClick={addToCart}>Add to cart</Button>
    </div>
  );
};

export default ProductCard;
