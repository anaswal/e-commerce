import React, { useEffect } from "react";
import { Input } from "./ui/input";
import { IoCart } from "react-icons/io5";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCartItems } from "./services/cartService";
import { History } from "lucide-react";

const Header = () => {
  const userSelector = useSelector((state) => state.user);
  const cartSelector = useSelector((state) => state.cart);

  const handleLogout = () => {
    localStorage.removeItem("current-user");
    dispatch({
      type: "USER_LOGOUT",
    });
  };

  useEffect(() => {
    getCartItems(userSelector.id);
  }, []);

  return (
    <header className="border-b border-gray-300 flex justify-between items-center px-8 h-16">
      <Link to="/">
        <p className="font-bold text-2xl">e-Kommers</p>
      </Link>

      <Input className="max-w-[600px]" placeholder="Search products..." />
      <div className="flex space-x-4 h-6 items-center">
        <div className="flex space-x-2 ">
          <Link to={"/cart"}>
            <Button className="mr-2" variant="ghost">
              <IoCart className="h-6 w-6" />
              <span className="font-bold text-lg">
                {cartSelector.items.length}
              </span>
            </Button>
          </Link>
          <Link to={"/history"}>
            <Button size="icon" variant="ghost">
              <History className="h-6 w-6" />
            </Button>
          </Link>
        </div>

        <Separator orientation="vertical" className="h-full" />

        <div className="flex space-x-2">
          {userSelector.id ? (
            <>
              <p>
                Hello, {userSelector.username} ({userSelector.role})
              </p>
              <Button onClick={handleLogout} variant="destructive">
                Log out
              </Button>
            </>
          ) : (
            <>
              <Link to={"/login"}>
                <Button>Log in</Button>
              </Link>
              <Button variant="outline">Sign up</Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
