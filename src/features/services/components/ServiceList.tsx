import { Service } from "../types";
import ServiceCard from "./ServiceCard";

type ServiceListProps = {
  services: Service[];
};

const ServiceList = ({ services }: ServiceListProps) => {
  if (services.length === 0) return <div>No services available</div>;
  return (
    <div className="grid grid-cols-3">
      {services.map((service) => (
        <ServiceCard service={service} key={service.id} />
      ))}
    </div>
  );
};

export default ServiceList;
