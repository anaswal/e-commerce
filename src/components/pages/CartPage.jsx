import React from "react";
import SignedInPage from "../guard/SignedInPage";

const CartPage = () => {
  return (
    <SignedInPage>
      <div className="font-bold text-3xl flex justify-center min-h-[90vh]">
        CartPage
      </div>
    </SignedInPage>
  );
};

export default CartPage;
