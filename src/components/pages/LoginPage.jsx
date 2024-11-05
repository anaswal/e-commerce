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
import { useForm } from "react-hook-form";
import {
  Form,
  FormMessage,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
} from "../ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { axiosInstance } from "@/lib/axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import GuestPage from "../guard/GuestPage";

const loginSchema = z.object({
  username: z
    .string()
    .min(3, "Your username needs to be 3 characters or more")
    .max(16, "Your username is over 16 characters"),
  password: z.string().min(8, "Your password needs to be 8 characters or more"),
});

const LoginPage = () => {
  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const dispatch = useDispatch();

  const [isChecked, setIsChecked] = useState(false);

  const loginHandle = async (values) => {
    try {
      const userResponse = await axiosInstance.get("/users", {
        params: {
          username: values.username,
        },
      });
      if (
        !userResponse.data.length ||
        userResponse.data[0].password !== values.password
      ) {
        alert("Invalid credentials");
        return;
      }
      alert(`Successfully loged in as ${userResponse.data[0].username}`);
      dispatch({
        type: "USER_LOGIN",
        payload: {
          username: userResponse.data[0].username,
          id: userResponse.data[0].id,
          role: userResponse.data[0].role,
        },
      });

      localStorage.setItem("current-user", userResponse.data[0].id);

      form.reset();
    } catch (err) {
      console.log(err);
    }
    // alert(`Username : ${values.username} | Password : ${values.password}`);
  };

  return (
    <GuestPage>
      <main className="container px-4 py-8 flex flex-col justify-center items-center max-w-screen-md h-[80vh]">
        <Form {...form}>
          <form
            className="w-full max-w-[540px]"
            onSubmit={form.handleSubmit(loginHandle)}
          >
            <Card>
              <CardHeader>
                <CardTitle>Enter your credentials</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <div>
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type={isChecked ? "text" : "password"}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="show-password"
                    onCheckedChange={(checked) => {
                      setIsChecked(checked);
                    }}
                  />
                  <Label htmlFor="show-password">Show password</Label>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col">
                <Button type="submit" className="w-full">
                  Login
                </Button>
                <Link to="/register">
                  <Button variant="link" className="w-full">
                    Sign up instead
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </main>
    </GuestPage>
  );
};

export default LoginPage;
