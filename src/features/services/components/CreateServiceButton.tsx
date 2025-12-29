import { Button } from "@/src/components/atoms/Button";
import React, { useState } from "react";
import { serviceApi } from "../api/services.api";

type CreateServiceButtonProps = {
  onCreated: () => void;
};

const CreateServiceButton = ({ onCreated }: CreateServiceButtonProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleCreate = async () => {
    setLoading(true);
    await serviceApi.create({
      title: "New Service",
      description: "description",
      price: 100000,
    });
    setLoading(false)
    onCreated()
  };

  return (
    <Button variant="primary" size="md" disabled={loading} onClick={handleCreate}>
      {loading ? "Creating..." : "Create Service"}
    </Button>
  );
};

export default CreateServiceButton;
