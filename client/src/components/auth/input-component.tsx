import { Input } from "@nextui-org/react";

interface InputComponentProps {
  placeholder: string;
  type?: string; 
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
}

export default function InputComponent({ placeholder, type = "text", value, onChange }: InputComponentProps) {
  return (
    <div className="flex-wrap md:flex-nowrap gap-4">
      <Input
        variant="underlined"
        type={type}
        placeholder={placeholder}
        value={value}          
        onChange={onChange}    
        size="md"
        labelPlacement="outside"
        style={{ color: 'black' }} 
      />
    </div>
  );
}
