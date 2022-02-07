import React from "react";

export default function ColumnContainer({
  children,
  className = "",
  heading = null,
  headingMargin = false,
}) {
  return (
    <div className={`flex flex-col space-y-px relative ${className} `}>
      {heading && (
        <h2
          className={`font-semibold mb-2 text-gray-300 text-3xl ${
            headingMargin && "ml-14"
          }`}
        >
          {heading}
        </h2>
      )}
      {children}
    </div>
  );
}
