"use client";

import ErrorBoundary from "@/src/components/error/ErrorBoundary";
import ServiceContent from "@/src/features/services/components/ServiceContent";

const ServicesPage = () => {
  return (
    <ErrorBoundary>
      <ServiceContent />
    </ErrorBoundary>
  );
};

export default ServicesPage;
