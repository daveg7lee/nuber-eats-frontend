interface IButtonProps {
  isValid: boolean;
  loading: boolean;
  actionText: string;
}

export const Button: React.FC<IButtonProps> = ({
  isValid,
  loading,
  actionText,
}) => (
  <button
    className={`py-3 text-white transition-colors text-lg font-medium focus:outline-none ${
      !isValid
        ? "bg-gray-300 pointer-events-none"
        : "bg-lime-500 hover:bg-lime-600"
    }`}
    disabled={!isValid}
  >
    {loading ? "Loading..." : actionText}
  </button>
);
