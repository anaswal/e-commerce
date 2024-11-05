import React from "react";
import { Input } from "./ui/input";
import { IoCart, IoHeart } from "react-icons/io5";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const userSelector = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("current-user");
    dispatch({
      type: "USER_LOGOUT",
    });
  };

  return (
    <header className="border-b border-gray-300 flex justify-between items-center px-8 h-16">
      <p className="font-bold text-2xl">e-Kommers</p>

      <Input className="max-w-[600px]" placeholder="Search products..." />
      <div className="flex space-x-4 h-6 items-center">
        <div className="flex space-x-2 ">
          <Link to={"/cart"}>
            <Button size="icon" variant="ghost">
              <IoCart className="h-6 w-6" />
            </Button>
          </Link>
          <Button size="icon" variant="ghost">
            <IoHeart className="h-6 w-6" />
          </Button>
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
