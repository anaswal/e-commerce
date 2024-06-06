import React from "react";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";

const LoginPage = () => {
  const [inputUsername, setInputUsername] = useState();
  const [inputPassword, setInputPassword] = useState();
  const [isChecked, setIsChecked] = useState(false);

  const loginHandle = () => {
    alert(`Username : ${inputUsername} | Password : ${inputPassword}`);
  };

  return (
    <main className="container px-4 py-8 flex flex-col justify-center items-center max-w-screen-md h-[80vh]">
      <Card className="w-full max-w-[540px]">
        <CardHeader>
          <CardTitle>Enter your credentials</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <div>
            <Label>Username</Label>
            <Input
              onChange={(event) => {
                setInputUsername(event.target.value);
              }}
            />
          </div>
          <div>
            <Label>Password</Label>
            <Input
              type={isChecked ? "text" : "password"}
              onChange={(event) => {
                setInputPassword(event.target.value);
              }}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="show-password"
              onCheckedChange={(checked) => {
                setIsChecked(checked);
                console.log(checked);
              }}
            />
            <Label htmlFor="show-password">Show password</Label>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button className="w-full" onClick={loginHandle}>
            Login
          </Button>
          <Button variant="link" className="w-full">
            Sign up instead
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
};

export default LoginPage;
