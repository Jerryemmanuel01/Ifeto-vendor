"use client";

import { ChevronDown, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

interface Option {
  label: string;
  value: string | number;
}

interface CustomSelectProps {
  label: string;
  name: string;
  value: string | number;
  onChange: (name: string, value: string | number) => void;
  options: Option[];
  placeholder?: string;
  error?: string;
  touched?: boolean;
  disabled?: boolean;
}

const CustomSelect = ({
  label,
  name,
  value,
  onChange,
  options,
  placeholder = "Select an option",
  error,
  touched,
  disabled = false,
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
    <div className="w-full relative" ref={dropdownRef}>
      <label className="block font-medium text-sm mb-1" htmlFor={name}>
        {label}
      </label>
      <div
        className={clsx(
          "w-full border rounded-md h-14 px-4 flex items-center justify-between cursor-pointer transition-colors bg-white",
          touched && error ? "border-red-500" : "border-light-active",
          disabled
            ? "opacity-50 cursor-not-allowed bg-gray-50"
            : "hover:border-primary",
        )}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <span
          className={clsx(
            "text-sm truncate",
            !selectedOption ? "text-light-active" : "text-black",
          )}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={clsx(
            "w-5 h-5 text-gray-500 transition-transform duration-200",
            isOpen && "transform rotate-180",
          )}
        />
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-light-active rounded-md shadow-lg max-h-60 overflow-hidden flex flex-col">
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
                  className={clsx(
                    "px-4 py-3 text-sm cursor-pointer hover:bg-gray-50 transition-colors",
                    option.value === value &&
                      "bg-primary/5 text-primary font-medium",
                  )}
                  onClick={() => handleSelect(option.value)}
                >
                  {option.label}
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

export default CustomSelect;
