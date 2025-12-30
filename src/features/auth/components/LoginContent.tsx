"use client";

import { Button } from "@/src/components/atoms/Button";
import { useAuth } from "../hooks/useAuth";

type LoginContentProps = {};

const LoginContent = ({}: LoginContentProps) => {
  const { login, register } = useAuth();
  return (
    <div className="flex gap-4">
      <h1>not logged in</h1>
      <Button onClick={() => login("admin@example.com", "asdfasdf")}>Login as Admin</Button>
      <Button onClick={() => login("amir@example.com", "asdfasdf")}>Login as User</Button>
      <Button onClick={() => register("admin@example.com", "asdfasdf")}>Register as Admin</Button>
      <Button onClick={() => register("amir@example.com", "asdfasdf")}>Register as User</Button>
    </div>
  );
};

export default LoginContent;
