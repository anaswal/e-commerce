import React from "react";
import { useState } from "react";
import { Button } from "./button";
import { IoIosAdd, IoIosRemove } from "react-icons/io";
import { Link } from "react-router-dom";

const addToCart = () => alert("Clicked");

const ProductCard = (props) => {
  const { imgUrl, productName, price, stock, id } = props;

  const [quantity, setQuantity] = useState(0);

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
      <Button onClick={addToCart} disabled={!stock}>
        {stock > 0 ? "Add to cart" : "Out of stock"}
      </Button>
    </div>
  );
};

export default ProductCard;
