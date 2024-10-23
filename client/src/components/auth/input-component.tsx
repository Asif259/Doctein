import React from 'react';

interface InputComponentProps {
  placeholder: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  isInvalid?: boolean; 
  errorMessage?: string; 
}

const InputComponent: React.FC<InputComponentProps> = ({
  placeholder,
  type,
  value,
  onChange,
  onBlur,
  isInvalid,
  errorMessage,
  ...props
}) => {
  return (
    <div className="relative w-full">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`w-full border rounded-lg px-3 py-2  ${
          isInvalid ? 'border-red-500' : 'border-gray-300'
        }`}
        {...props}
      />
      {isInvalid && <span className="text-red-500">{errorMessage}</span>} 
    </div>
  );
};

export default InputComponent;
