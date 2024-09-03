import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";

const createProductSchema = z.object({
  productName: z
    .string()
    .min(3, "Product Name needs to be 3 characters or more")
    .max(30, "Product Name is over 30 characters"),
  imgUrl: z.string().url("Use a valid URL"),
  price: z.coerce.number().min(10000, "Price must be Rp 10.000 or more"),
  stock: z.coerce.number().min(1, "Stock cannot be 0"),
});

const ProductForm = (props) => {
  const { onSubmit, title, description } = props;
  const [button, setButton] = useState(false);
  const form = useForm({
    defaultValues: {
      productName: "",
      imgUrl: "",
      price: 0,
      stock: 0,
    },
    resolver: zodResolver(createProductSchema),
  });
  return (
    <Form {...form}>
      <form
        className="w-full max-w-[540px]"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Card>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name="productName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imgUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={button}>
              {description}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default ProductForm;
