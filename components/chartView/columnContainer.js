import React from "react";

export default function ColumnContainer({ children, className = "" }) {
  return (
    <div className={`flex flex-col space-y-px relative ${className}`}>
      {children}
    </div>
  );
}
