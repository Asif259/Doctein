import React from 'react';

interface InputComponentProps {
  placeholder: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const InputComponent: React.FC<InputComponentProps> = ({ placeholder, type, value, onChange, onBlur, ...props }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      {...props} 
      className="w-full border border-gray-300 rounded-lg px-3 py-2"
    />
  );
};

export default InputComponent;
