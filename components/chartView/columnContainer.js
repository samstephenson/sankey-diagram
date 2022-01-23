import React from "react";

export default function ColumnContainer({ children }) {
  return <div className="flex flex-col space-y-px">{children}</div>;
}
