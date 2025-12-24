import { useEffect, useState } from "react";
import { Service } from "../types";
import { serviceApi } from "../api/services.api";

export const useServices = () => {
  const [data, setData] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    serviceApi
      .list()
      .then((res) => setData(res.data))
      .catch(() => {
        setError("Failed to load services");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return {
    error,
    loading,
    services: data,
  };
};
