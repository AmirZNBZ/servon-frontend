import { http } from "@/src/lib/http";
import { Service } from "../types";

export const serviceApi = {
  list() {
    return http.get<Service[]>("/services");
  },

  create(payload: Omit<Service, "id" | "status">) {
    return http.post<Service>("/services", payload);
  },

  update(id: string, payload: Partial<Service>) {
    return http.patch(`/services/${id}`, payload);
  },

  remove(id: string) {
    return http.delete(`services/${id}`);
  },
};
