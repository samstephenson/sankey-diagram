import React from 'react';

export default function RemainderBlock({ amount }) {
  return (
    <div
      className={`flex space-x-px items-stretch text-sm bg-none`}
      style={{
        flexGrow: amount,
      }}
    >
      <div
        className={`w-56 relative flex flex-col justify-center text-gray-400`}
      >
        <p>+£{Math.round(amount)}</p>
      </div>
    </div>
  );
}
