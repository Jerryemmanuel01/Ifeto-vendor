interface CircularProgressProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  className?: string; // Container class
  trackColor?: string; // Class for the background circle
  progressColor?: string; // Class for the progress circle
  textColor?: string; // Class for the text
  textWeight?: string; // Class for the font weight
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  percentage,
  size = 48,
  strokeWidth = 4,
  className = "",
  trackColor = "text-gray-200",
  progressColor = "text-primary",
  textColor = "text-gray-900",
  textWeight = "font-bold",
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <svg className="w-full h-full transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className={trackColor}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={`${progressColor} transition-all duration-500 ease-out`}
        />
      </svg>
      <div
        className={`absolute inset-0 flex items-center justify-center text-[10px] ${textWeight} ${textColor}`}
      >
        {Math.round(percentage)}%
      </div>
    </div>
  );
};

export default CircularProgress;
