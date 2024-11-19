import { IoIosAdd, IoIosRemove } from "react-icons/io";
import { Button } from "./ui/button";
import { IoCheckmark, IoClose } from "react-icons/io5";
import { axiosInstance } from "@/lib/axios";
import { getCartItems } from "./services/cartService";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export const CartItem = (props) => {
  const userSelector = useSelector((state) => state.user);
  const [quantity, setQuantity] = useState(props.quantity);
  const debounceUpdateCart = useDebouncedCallback(() => {
    updateCartQuantity();
  }, 2000);

  const removeCartItem = async () => {
    try {
      await axiosInstance.delete("/carts/" + props.cartId);
      getCartItems(userSelector.id);
      alert("Item removed!");
    } catch (error) {
      console.log(error);
    }
  };

  const updateCartQuantity = async () => {
    try {
      await axiosInstance.patch("/carts/" + props.cartId, {
        quantity: quantity,
      });
      getCartItems(useSelector.id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    debounceUpdateCart();
  }, [quantity]);

  return (
    <div className="flex gap-4">
      <div className="aspect-square w-full overflow-hidden rounded-md max-w-32">
        <img src={props.imgUrl} alt={props.name} className="w-full" />
      </div>

      <div className="flex flex-col justify-between w-full">
        <div className="flex flex-col">
          <p>{props.name}</p>
          <p className="font-bold">Rp {props.price.toLocaleString("id-ID")}</p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            disabled={quantity < 2}
            variant="ghost"
            size="icon"
            onClick={() => setQuantity(quantity - 1)}
          >
            <IoIosRemove className="w-4 h-4" />
          </Button>
          <p className="text-lg font-bold">{quantity}</p>
          <Button
            disabled={quantity >= props.stock}
            variant="ghost"
            size="icon"
            onClick={() => setQuantity(quantity + 1)}
          >
            <IoIosAdd className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex gap-5">
          <div className="flex gap-2 items-center">
            {props.stock >= props.quantity ? (
              <>
                <IoCheckmark className="text-green-600 h-6 w-6" />
                <span className="text-sm text-muted-foreground">Available</span>
              </>
            ) : (
              <>
                <IoClose className="text-red-600 h-6 w-6" />
                <span className="text-sm text-muted-foreground">
                  Not Available
                </span>
              </>
            )}
          </div>
          <Button
            onClick={removeCartItem}
            variant="link"
            className="text-destructive"
          >
            Remove Item
          </Button>
        </div>
      </div>
    </div>
  );
};
