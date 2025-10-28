export default function InputField({ type, name, value, onChange, placeholder, required = true }) {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full border rounded p-2"
    />
  );
}
