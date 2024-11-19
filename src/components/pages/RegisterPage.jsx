import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
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
import GuestPage from "../guard/GuestPage";

const registerSchema = z
  .object({
    username: z
      .string()
      .min(3, "Your username needs to be 3 characters or more")
      .max(16, "Your username is over 16 characters"),
    password: z
      .string()
      .min(8, "Your password needs to be 8 characters or more"),
    repeatPassword: z
      .string()
      .min(8, "Your password needs to be 8 characters or more"),
  })
  .superRefine(({ repeatPassword, password }, ctx) => {
    if (repeatPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Your password didn't match",
        path: ["repeatPassword"],
      });
    }
  });

const RegisterPage = () => {
  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
      repeatPassword: "",
    },
    resolver: zodResolver(registerSchema),
  });

  const registerHandle = async (values) => {
    try {
      await axiosInstance.post("/users", {
        username: values.username,
        password: values.password,
        role: values.role,
      });
      alert("User registered");
      form.reset();
    } catch (error) {
      console.log(error);
    }
    // alert(
    //   `Username : ${values.username} | Password : ${values.password} | Repeat Password : ${values.repeatPassword}`
    // );
  };

  return (
    <GuestPage>
      <main className="container px-4 py-8 flex flex-col justify-center items-center max-w-screen-md h-[80vh]">
        <Form {...form}>
          <form
            className="w-full max-w-[540px]"
            onSubmit={form.handleSubmit(registerHandle)}
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
                          <Input {...field} type="password" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="repeatPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Repeat Password</FormLabel>
                        <FormControl>
                          <Input {...field} type="password" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col">
                <Button type="submit" className="w-full">
                  Register
                </Button>
                <Button variant="link" className="w-full">
                  Login instead
                </Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </main>
    </GuestPage>
  );
};

export default RegisterPage;
