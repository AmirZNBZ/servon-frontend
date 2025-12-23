import { useAuth } from "./useAuth";

export const usePermission = (permission: string) => {
  const { user } = useAuth();

  if (!user) return false;

  return user.permission.includes(permission);
};
