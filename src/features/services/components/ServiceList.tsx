import { Service } from "../types";
import ServiceCard from "./ServiceCard";
import { ServiceItem } from "./ServiceItem";

type ServiceListProps = {
  services: Service[];
  onDelete: (id: string) => Promise<void>;
};

const ServiceList = ({ services,onDelete }: ServiceListProps) => {
  if (services.length === 0) return <div>No services available</div>;
  return (
     <div className="grid grid-cols-3">
      {services.map((service) => (
        <ServiceItem key={service.id} service={service} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default ServiceList;
