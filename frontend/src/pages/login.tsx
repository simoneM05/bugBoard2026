"use client";
import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Login failed");
      }

      // ✅ Accedi correttamente alla struttura annidata
      if (result.data?.accessToken) {
        // Salva access token
        localStorage.setItem("accessToken", result.data.accessToken);

        // Opzionale: salva anche i dati utente
        localStorage.setItem("user", JSON.stringify(result.data.user));

        toast.success(result.message || "Login successful!");
        navigate("/");
      } else {
        throw new Error("No access token received");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to login");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="flex items-center justify-center min-h-screen">
      <Card className="w-[400px]">
        <CardHeader className="flex justify-center items-center font-semibold text-2xl border-none">
          Welcome Back
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 max-w-3xl mx-auto py-2"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="name@example.com"
                        className="py-5"
                        type="email"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Enter your email</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <PasswordInput
                        placeholder="password"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Enter your password.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading ? "Loading..." : "Submit"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
}
