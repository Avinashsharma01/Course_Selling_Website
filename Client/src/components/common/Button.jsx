const Button = ({ children, onClick, type = 'button', variant = 'primary', className = '' }) => {
  const base = 'px-4 py-2 rounded font-semibold transition-all duration-200 focus:outline-none';

  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-green-600 text-white hover:bg-green-700',
    outline: 'border border-blue-600 text-blue-600 hover:bg-blue-50',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;

