import { usePermission } from "../../auth/hooks/usePermission";
import { useServices } from "../hooks/useServices";
import ServiceList from "./ServiceList";

const ServiceContent = () => {
  const { error, loading, services, createService, deleteService } = useServices();

  const canCreate = usePermission("CREATE_SERVICE");

  if (loading) return <div>Loading services....</div>;
  if (error) return <div>{error}</div>;

  // 🔥 تست boundary
  if (services.length > 2) throw new Error("Boom");

  return (
    <div className="space-y-4">
      {canCreate && (
        <button
          onClick={() =>
            createService({
              title: "Optimistic Service",
              description: "Instant UI",
              price: 1000,
            })
          }
          className="rounded bg-primary px-4 py-2 text-white"
        >
          Create Service
        </button>
      )}

      <ServiceList services={services} onDelete={deleteService} />
    </div>
  );
};

export default ServiceContent;
