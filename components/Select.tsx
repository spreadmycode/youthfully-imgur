type Props = {
  label: string;
  value: string;
  onChange: Function;
  options: Array<{ label: string; value: string }>;
};

const Select = ({ label, value, onChange, options }: Props) => {
  return (
    <div>
      <label htmlFor={label} className="mr-2 font-bold">
        {label}:
      </label>
      <select
        id={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border rounded py-1 px-2"
      >
        {options.map((item) => {
          return (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;
