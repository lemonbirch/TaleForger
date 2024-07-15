'use client'
import React from 'react'

const AdvancedDropDown = ({ id, name, options, value, onChange }) => {
  return (
      <div>
          <label htmlFor={id} className="block text-sm font-medium mb-1">{name}</label>
          <select 
              id={id} 
              className="select select-bordered w-full bg-teal-600"
              value={value}
              onChange={(e) => onChange(e.target.value)}
          >
              <option value="">Select an option</option>
              {options.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
              ))}
          </select>
      </div>
  )
}

export default AdvancedDropDown