'client use'
import React from 'react'


const InputText = ({ id, label, type, placeholder, value, onBlur, onChange }: {
  id: string
  label: string
  type: string
  placeholder: string
  value: string
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}) => {
  return (
      <div className="mb-4">
          <label htmlFor={id} className="block text-sm font-medium mb-1">
              {label}
          </label>
          <input
              type={type}
              id={id}
              placeholder={placeholder}
              className="input input-bordered w-full bg-teal-700"
              value={value}
              onChange={onChange}
              onBlur={onBlur}
          />
      </div>
  )
}

export default InputText