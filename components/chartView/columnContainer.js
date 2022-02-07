import React from "react";

export default function ColumnContainer({
  children,
  className = "",
  heading = null,
}) {
  return (
    <div className={`flex flex-col space-y-px relative ${className} `}>
      {children}
      {heading && (
        <h2 className={`font-semibold mb-2 text-gray-900 text-3xl`}>
          {heading}
        </h2>
      )}
    </div>
  );
}
