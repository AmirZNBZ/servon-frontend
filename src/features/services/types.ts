export type ServiceStatus = "ACTIVE" | "INACTIVE";

export interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  status: ServiceStatus;
  optimistic?: boolean;
  error?: string;
}
