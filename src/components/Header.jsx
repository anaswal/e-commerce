import React from "react";
import { Input } from "./ui/input";
import { IoCart, IoHeart } from "react-icons/io5";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

const Header = () => {
  return (
    <header className="border-b border-gray-300 flex justify-between items-center px-8 h-16">
      <p className="font-bold text-2xl">e-Kommers</p>

      <Input className="max-w-[600px]" placeholder="Search products..." />
      <div className="flex space-x-4 h-6 items-center">
        <div className="flex space-x-2 ">
          <Button size="icon" variant="ghost">
            <IoCart className="h-6 w-6" />
          </Button>
          <Button size="icon" variant="ghost">
            <IoHeart className="h-6 w-6" />
          </Button>
        </div>

        <Separator orientation="vertical" className="h-full" />

        <div className="flex space-x-2">
          <Button>Log in</Button>
          <Button variant="outline">Sign up</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
