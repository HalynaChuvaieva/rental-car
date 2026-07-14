"use client";

import { useState, useRef, useEffect } from "react";
import css from "./CustomSelect.module.css";

export interface Option {
  value: string | number;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  value: string | number;
  onChange: (value: string | number) => void;
  placeholder: string;
  prefix?: string;
}

export default function CustomSelect({
  options,
  value,
  onChange,
  placeholder,
  prefix = "",
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (selectedValue: string | number) => {
    onChange(selectedValue);
    setIsOpen(false);
  };

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className={css.container} ref={selectRef}>
      <div className={css.trigger} onClick={() => setIsOpen(!isOpen)}>
        <span className={selectedOption ? css.selectedValue : css.placeholder}>
          {selectedOption ? `${prefix}${selectedOption.label}` : placeholder}
        </span>
        <svg
          className={`${css.icon} ${isOpen ? css.iconOpen : ""}`}
          width="16"
          height="16"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <use href="/sprite.svg#list-down"></use>
        </svg>
      </div>

      {isOpen && (
        <div className={css.dropdownWrapper}>
          <ul className={css.dropdown}>
            {options.map((opt) => (
              <li
                key={opt.value}
                className={`${css.option} ${
                  value === opt.value ? css.active : ""
                }`}
                onClick={() => handleSelect(opt.value)}
              >
                {opt.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
