const Input = ({ label, type = 'text', value, onChange, placeholder, name, className = '' }) => {
  return (
    <div className="mb-4">
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      <input
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none ${className}`}
      />
    </div>
  );
};

export default Input;
