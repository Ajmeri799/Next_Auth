"use client";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFormik } from "formik";
import { LoginVali } from "@/schemas";
import AuthService from "@/appwrite/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
const initialValues = {
  email: "",
  password: "",
};

function Login() {
  const showToast = () => {
    toast.success("Login Successfully");
  };
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: LoginVali,
      onSubmit: async (value) => {
        try {
          await AuthService.login(value);
          router.push("/");
          showToast();
          console.log(value);
        } catch (error) {
          setErrorMessage(
            "Invalid credentials. Please check the email and password."
          );
          console.log(error);
        }
      },
    });
  const router = useRouter();

  return (
    <>
      <div className="grid grid-cols-1">
        <Card className=" sm:w-[400px] bg-customYellow">
          <CardHeader>
            <CardTitle className="font-bold  underline">LOGIN</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="xyz@exaple.com"
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.email && touched.email ? (
                    <p className="form-error text-red-600">{errors.email}</p>
                  ) : null}
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="Password">Password</Label>
                  <Input
                    id="pass"
                    placeholder="Password"
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.password && touched.password ? (
                    <p className="form-error text-red-600">{errors.password}</p>
                  ) : null}
                </div>
                <Button type="submit">SIGN IN</Button>
              </div>
            </form>
          </CardContent>
        </Card>
        {errorMessage && (
          <p className="form-error text-red-600">{errorMessage}</p>
        )}

        <p className="pt-5 pb-3"> do have an account ?</p>
        <Button
          className="w-28"
          onClick={() => {
            router.push("/Register");
          }}
        >
          SIGNUP
        </Button>
      </div>
    </>
  );
}
export default Login;
