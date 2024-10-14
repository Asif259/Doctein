import React from "react";
import { Button } from "@nextui-org/react";

function FormButton({
  onClose,
  handleSubmit,
}: {
  onClose: () => void;
  handleSubmit: () => void;
}) {
  const handleSave = () => {
    handleSubmit();
    onClose();
  };
  return (
    <div className="flex flex-row gap-3 justify-end">
      <Button
        className="text-danger-500 border-danger-500"
        variant="bordered"
        onPress={onClose}
      >
        Close
      </Button>
      <Button
        className="bg-secondary-600 text-secondary-50"
        variant="solid"
        onPress={() => handleSave()}
      >
        Save
      </Button>
    </div>
  );
}

export default FormButton;
