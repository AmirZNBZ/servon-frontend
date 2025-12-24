import { Service } from "../types";

type ServiceCardProps = {
  service: Service;
};

const ServiceCard = ({ service }: ServiceCardProps) => {
  return (
    <div className="round border p-4">
      <h3 className="font-semibold">{service.title}</h3>
      <p className="text-sm opacity-80">{service.description}</p>
      <div className="mt-2 flex justify-between">
        <span>{service.price} تومان</span>
        <span>{service.status}</span>
      </div>
    </div>
  );
};

export default ServiceCard;
