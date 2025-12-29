import { useEffect, useState } from "react";
import { Service } from "../types";
import { serviceApi } from "../api/services.api";

export const useServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchServices = async () => {
    try {
      const res = await serviceApi.list();
      setServices(res.data);
    } catch (e) {
      setError("Failed to load services");
    } finally {
      setLoading(false);
    }
  };

  const createService = async (payload: Omit<Service, "id" | "status">) => {
    const tempId = `temp-${Date.now()}`;

    const optimisticService: Service = {
      ...payload,
      id: tempId,
      optimistic: true,
      status: "ACTIVE",
    };
    setServices((prev) => [optimisticService, ...prev]);

    try {
      const res = await serviceApi.create(payload);

      setServices((prev) => prev.map((service) => (service.id === tempId ? res.data : service)));
    } catch (error) {
      setServices((prev) =>
        prev.map((service) =>
          service.id === tempId ? { ...service, optimisticService: false, error: "create failed" } : service
        )
      );
    }
  };

  const deleteService = async (id: string) => {
    const snapShot = services;

    setServices((prev) => prev.filter((service) => service.id !== id));

    try {
      await serviceApi.remove(id);
    } catch (error) {
      setServices(snapShot);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return {
    error,
    loading,
    services,
    createService,
    deleteService,
    refetch: fetchServices,
  };
};
