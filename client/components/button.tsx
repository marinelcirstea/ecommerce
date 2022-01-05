interface ButtonProps {
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ className, children, ...props }) => {
  const cname = `inline-block text-center bg-indigo-600 border border-transparent rounded-md py-3 px-8 font-medium text-white hover:bg-indigo-700 ${
    className || ""
  }`;
  return (
    <button {...props} className={cname}>
      {children}
    </button>
  );
};

export default Button;
