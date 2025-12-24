"use client";

import ServiceList from "@/src/features/services/components/ServiceList";
import { useServices } from "@/src/features/services/hooks/useServices";

const ServicesPage = () => {
  const { error, loading, services } = useServices();

  if (loading) return <div>Loading services....</div>;
  if (error) return <div>{error}</div>;

  return <ServiceList services={services} />;
};

export default ServicesPage;
