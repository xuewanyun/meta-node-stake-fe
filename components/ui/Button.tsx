import classNames from "classnames";
interface ButtonProps {
  disabled: boolean;
  loading: boolean;
  children: React.ReactNode;
  handleClick: () => void;
}
const Button = ({ handleClick, disabled, loading, children }: ButtonProps) => {
  return (
    <button
      //   className="w-full bg-blue-500 hover:bg-blue-600 transition py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
      onClick={handleClick}
      disabled={disabled}
      className={classNames(
        "w-full bg-blue-500 hover:bg-blue-600 transition py-3 rounded-xl font-semibold flex items-center justify-center gap-2",
        {
          "opacity-50 cursor-not-allowed": disabled || loading,
        }
      )}
    >
      {loading ? (
        <>
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          <span>Loading....</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
