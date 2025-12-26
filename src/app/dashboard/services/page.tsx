"use client";

import { usePermission } from "@/src/features/auth/hooks/usePermission";
import CreateServiceButton from "@/src/features/services/components/CreateServiceButton";
import ServiceList from "@/src/features/services/components/ServiceList";
import { useServices } from "@/src/features/services/hooks/useServices";

const ServicesPage = () => {
  const { error, loading, services, refetch } = useServices();

  const canCreate = usePermission("CREATE_SERVICE");

  if (loading) return <div>Loading services....</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="space-y-4">
      {canCreate && <CreateServiceButton onCreated={refetch} />}
      <ServiceList services={services} />
    </div>
  );
};

export default ServicesPage;
