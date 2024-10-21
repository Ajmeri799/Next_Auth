"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { useFormik } from "formik";
import { validationSchema } from "@/schemas";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AuthService from "@/appwrite/auth";
import { useState } from "react";
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function Register() {
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  //   const navigate = useNavigate();
  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: validationSchema,
      onSubmit: async (value) => {
        try {
          await AuthService.createAccount(value);
          console.log(value);
          router.push("/Login");
        } catch (error) {
          setErrorMessage(
            "A user with the same id, email, or phone already exists"
          );
          console.log(error);
        }
      },
    });
  return (
    <>
      <div className="grid grid-cols-1">
        <Card className="sm:w-[450px] bg-customYellow">
          <CardHeader>
            <CardTitle className="font-bold  underline">REGISTER</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">First Name</Label>
                  <Input
                    id="fname"
                    placeholder="First Name"
                    name="firstName"
                    type="text"
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.firstName && touched.firstName ? (
                    <p className="form-error text-red-600">
                      {errors.firstName}
                    </p>
                  ) : null}
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Last Name</Label>
                  <Input
                    id="lname"
                    placeholder="Last Name"
                    name="lastName"
                    type="text"
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.lastName && touched.lastName ? (
                    <p className="form-error text-red-600">{errors.lastName}</p>
                  ) : null}
                </div>
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
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="confirm Password">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.confirmPassword && touched.confirmPassword ? (
                    <p className="form-error text-red-600">
                      {errors.confirmPassword}
                    </p>
                  ) : null}
                </div>
                <Button type="submit">SIGN UP</Button>
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
            router.push("/Login");
          }}
        >
          LOGIN
        </Button>
      </div>
    </>
  );
}

export default Register;
