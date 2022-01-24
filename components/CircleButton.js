export default function CircleButton({
  color = "blue",
  onClick,
  children,
  className = "",
}) {
  return (
    <button
      className={`text-${color}-600 bg-white w-8 h-8 rounded-full grid place-items-center shadow hover:bg-${color}-100 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
