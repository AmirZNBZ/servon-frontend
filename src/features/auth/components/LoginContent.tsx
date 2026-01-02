"use client";

import { Button } from "@/src/components/atoms/Button";
import { useAuth } from "../hooks/useAuth";
import { redirect } from "next/navigation";

type LoginContentProps = {};

const LoginContent = ({}: LoginContentProps) => {
  const { login, register } = useAuth();

  const handleAdminLogin = async () => {
    await login("admin@example.com", "asdfasdf");

    redirect("/dashboard/services");
  };

  return (
    <div className="flex gap-4">
      <h1>not logged in</h1>
      <Button onClick={handleAdminLogin}>Login as Admin</Button>
      <Button onClick={() => login("amir@example.com", "asdfasdf")}>Login as User</Button>
      <Button onClick={() => register("admin@example.com", "asdfasdf")}>Register as Admin</Button>
      <Button onClick={() => register("amir@example.com", "asdfasdf")}>Register as User</Button>
    </div>
  );
};

export default LoginContent;
