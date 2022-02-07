import { separator } from "@components/utils/formatters";
import React from "react";

export default function RemainderBlock({ amount, symbol }) {
  return (
    <div
      className={`flex space-x-px items-stretch text-sm bg-none font-semibold ml-2`}
      style={{
        flexGrow: amount,
      }}
    >
      <div
        className={`pt-1 w-56 relative flex flex-col justify-start text-gray-400`}
      >
        <p>
          {symbol}
          {separator(Math.round(amount))}
        </p>
      </div>
    </div>
  );
}
