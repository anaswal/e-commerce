import { axiosInstance } from "@/lib/axios";
import { globalStore } from "@/store/store";

export const getCartItems = async (userId) => {
  try {
    const response = await axiosInstance.get("/carts", {
      params: {
        userId,
        _embed: "product",
      },
    });
    globalStore.dispatch({
      type: "CART_GET",
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};
