import React, { useState, useEffect, useRef } from "react";

export function Dropdown({ children, onClickOutside, className = "" }) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          onClickOutside();
        }
      }

      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  return (
    <div
      className={`absolute left-0 top-10 bg-white shadow-xl rounded flex flex-col justify-start pb-2 z-50 w-80 ${className}`}
      ref={wrapperRef}
    >
      {children}
    </div>
  );
}

export function DropdownItem({
  onClick,
  doc,
  isActive = false,
  action = <></>,
}) {
  return (
    <button
      className={`px-4 py-1 hover:bg-gray-100 w-full  flex justify-between text-left ${
        isActive && "text-gray-400"
      }`}
      onClick={onClick}
      disabled={isActive}
    >
      {doc.title !== "" ? doc.title : "No name"}
      {action}
    </button>
  );
}
