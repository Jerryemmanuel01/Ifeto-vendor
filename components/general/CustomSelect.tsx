"use client";

import { ChevronDown, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/utils/utils";

interface Option {
  label: string;
  value: string | number;
  image?: string;
}

interface CustomSelectProps {
  label: React.ReactNode;
  name: string;
  value: string | number;
  onChange: (name: string, value: string | number) => void;
  options: Option[];
  placeholder?: string;
  error?: string;
  touched?: boolean;
  disabled?: boolean;
  className?: string; // For the trigger element
  containerClassName?: string; // For the outer wrapper
  labelClassName?: string; // For the label
  optionClassName?: string; // For dropdown options
  contentClassName?: string; // For dropdown content wrapper
}

export const CustomSelect = ({
  label,
  name,
  value,
  onChange,
  options,
  placeholder = "Select an option",
  error,
  touched,
  disabled = false,
  className,
  containerClassName,
  labelClassName,
  optionClassName,
  contentClassName,
}: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((option) => option.value === value);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  useEffect(() => {
    if (!isOpen) {
      setSearchTerm("");
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (optionValue: string | number) => {
    onChange(name, optionValue);
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <div
      className={cn("w-full relative", containerClassName)}
      ref={dropdownRef}
    >
      <label
        className={cn("block font-medium text-sm mb-1", labelClassName)}
        htmlFor={name}
      >
        {label}
      </label>
      <div
        className={cn(
          "w-full border rounded-md h-14 px-4 flex items-center justify-between cursor-pointer transition-colors bg-white",
          touched && error ? "border-red-500" : "border-gray-200",
          disabled
            ? "opacity-50 cursor-not-allowed bg-gray-50"
            : "hover:border-primary",
          className,
        )}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <span
          className={cn(
            "text-sm truncate flex items-center gap-2",
            !selectedOption ? "text-gray-400" : "text-black",
          )}
        >
          {selectedOption?.image && (
            <img
              src={selectedOption.image}
              alt=""
              className="w-6 h-6 rounded-sm object-cover"
            />
          )}
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={cn(
            "w-5 h-5 text-gray-500 transition-transform duration-200",
            isOpen && "transform rotate-180",
          )}
        />
      </div>

      {isOpen && (
        <div
          className={cn(
            "absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-hidden flex flex-col",
            contentClassName,
          )}
        >
          <div className="p-2 border-b border-gray-100 sticky top-0 bg-white z-10">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                autoFocus
              />
            </div>
          </div>
          <div className="overflow-y-auto flex-1">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  className={cn(
                    "px-4 py-3 text-sm cursor-pointer hover:bg-gray-50 transition-colors flex items-center gap-3",
                    option.value === value &&
                      "bg-primary/5 text-primary font-medium",
                    optionClassName,
                  )}
                  onClick={() => handleSelect(option.value)}
                >
                  {option.image && (
                    <img
                      src={option.image}
                      alt=""
                      className="w-8 h-8 rounded-sm object-cover bg-gray-100"
                    />
                  )}
                  <span>{option.label}</span>
                </div>
              ))
            ) : (
              <div className="px-4 py-8 text-sm text-gray-500 text-center flex flex-col items-center justify-center">
                <Search className="w-8 h-8 text-gray-300 mb-2" />
                <p>No results found</p>
              </div>
            )}
          </div>
        </div>
      )}

      {touched && error && (
        <div className="text-red-600 text-xs mt-1">{error}</div>
      )}
    </div>
  );
};
