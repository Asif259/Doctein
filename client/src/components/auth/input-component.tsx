import { Input } from "@nextui-org/react";

interface InputComponentProps {
  placeholder: string;
  type?: string; 
}

export default function InputComponent({ placeholder, type = "text" }: InputComponentProps) {
  return (
    <div className="flex-wrap md:flex-nowrap gap-4">
      <Input
        variant="underlined"
        type={type}
        placeholder={placeholder}
        size="md"
        labelPlacement="outside"
        style={{ color: 'black' }} 
        endContent={
          type === "email" && (
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">@gmail.com</span>
            </div>
          )
        }
      />
    </div>
  );
}
