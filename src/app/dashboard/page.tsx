"use client";
import authService from "@/appwrite/auth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
export default function Bord() {
  const [user, setUser] = useState<{ email: string; name: string } | null>(
    null
  );
  const router = useRouter();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const response = await authService.getCurrentUser();
      if (response) {
        setUser({
          email: response.email,
          name: response.name,
        });
      } else {
        router.push("/Login");
      }
    };

    fetchUserDetails();
  }, [router]);

  const handleLogout = async () => {
    await authService.logout();
    router.push("/Login");
  };

  if (!user) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className=" flex justify-evenly">
      <div>
        <h1 className=" text-yellow-400 font-bold text-3xl">Welcome</h1>
        <h2 className=" text-xl font-bold">{user.name}</h2>
      </div>
      <div>
        <Button onClick={handleLogout}>LogOut</Button>
      </div>
    </div>
  );
}
