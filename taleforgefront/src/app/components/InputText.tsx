'client use'
import React from 'react'


const InputText = ({ id, label, type, placeholder, value, onChange }) => {
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
          />
      </div>
  )
}

export default InputText