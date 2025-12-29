"use client";

import ErrorBoundary from "@/src/components/error/ErrorBoundary";
import ServiceContent from "@/src/features/services/components/ServiceContent";

const ServicesPage = () => {
  return (
    <ErrorBoundary fallback={<div className="h-52 font-bold">در گرفتن دیتا مشکلی یش امده لطفا مجددا تلاش کنید</div>}>
      <ServiceContent />
    </ErrorBoundary>
  );
};

export default ServicesPage;
