"use client";
import { FC } from "react";

interface AppLoaderProps {
  color?: string;      // Hex color e.g. "#ffffff"
  size?: string;       // Tailwind size e.g. "h-6 w-6"
  className?: string;  // Extra Tailwind classes like "bg-red-100 p-2"
}

const AppLoader: FC<AppLoaderProps> = ({
  color = "#3b82f6", // Default: Tailwind blue-500 hex
  size = "h-8 w-8",
  className = "",
}) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg
        className={`animate-spin ${size}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        style={{ color }} // apply custom color from hex
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="6"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        ></path>
      </svg>
    </div>
  );
};

export default AppLoader;
