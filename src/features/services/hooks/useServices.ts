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

  useEffect(() => {
    fetchServices();
  }, []);

  return {
    error,
    loading,
    services,
    refetch: fetchServices,
  };
};
