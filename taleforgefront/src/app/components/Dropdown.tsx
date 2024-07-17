interface DropdownProps {
    id: string;
    name: string;
    value: string;
    onChange: (value: string) => void;
    options: string[];
  }
  
  const DropDown: React.FC<DropdownProps> = ({ id, name, value, onChange, options }) => {
    return (
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">{name}</span>
        </div>
        <select
          id={id}
          className="select select-bordered w-full bg-teal-600"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="" disabled>Select an option</option>
          {options.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </select>
      </label>
    );
  };
  
  export default DropDown;
  