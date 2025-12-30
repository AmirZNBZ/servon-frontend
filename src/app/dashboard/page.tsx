"use client";
import { Button } from "@/src/components/atoms/Button";
import ErrorBoundary from "@/src/components/error/ErrorBoundary";
import { useRouter } from "next/navigation";

const DashboardPage = () => {
  const router = useRouter();
  return (
    <ErrorBoundary fallback={<div className="text-5xl text-orange-400">Dashboard Error</div>}>
      <Button variant="primary" size="lg" onClick={() => router.replace("/dashboard/services")}>
        Services
      </Button>
      <h1>Dashboard (Protected)</h1>
    </ErrorBoundary>
  );
};

export default DashboardPage;
