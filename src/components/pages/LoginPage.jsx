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

  const [isChecked, setIsChecked] = useState(false);

  const loginHandle = (values) => {
    alert(`Username : ${values.username} | Password : ${values.password}`);
  };

  return (
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
              <Button variant="link" className="w-full">
                Sign up instead
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </main>
  );
};

export default LoginPage;
