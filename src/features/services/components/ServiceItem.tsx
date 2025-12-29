import { Service } from "../types";

interface ServiceItemProps {
  service: Service;
  onDelete: (id: string) => void;
}

export function ServiceItem({ service, onDelete }: ServiceItemProps) {
  return (
    <div
      className={`
        rounded border p-4
        ${service.optimistic ? "opacity-50" : ""}
        ${service.error ? "border-red-500" : ""}
      `}
    >
      <div className="flex justify-between">
        <h3 className="font-bold">{service.title}</h3>
        <button onClick={() => onDelete(service.id)} className="text-red-500">
          Delete
        </button>
      </div>

      <p>{service.description}</p>

      {service.optimistic && <p className="text-sm text-gray-400">Saving...</p>}

      {service.error && <p className="text-sm text-red-500">{service.error}</p>}
    </div>
  );
}
