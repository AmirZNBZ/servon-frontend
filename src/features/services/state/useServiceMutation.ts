import { useState } from "react";
import { MutationStatus } from "../types";

const useServiceMutation = <T>() => {
  const [status, setStatus] = useState<MutationStatus>("idle");
  const [error, setError] = useState<string | null>("");

  return {
    status,
    error,
    isLoading: status === "loading",
    isSuccess: status === "success",
    isError: status === "error",
    start: () => {
      setStatus("loading");
      setError(null);
    },
    success: () => {
      setStatus("success");
    },
    fail: (message: string) => {
      setStatus("error");
      setError(message);
    },

    reset: () => setStatus("idle"),
  };
};

export default useServiceMutation;
