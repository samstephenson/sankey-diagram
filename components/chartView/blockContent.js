import React, { useState } from "react";
import { shiftHue } from "../utils/colors";
import { deleteDoc, useDocument } from "swr-firestore-v9";

export default function BlockContent({
  item,
  hue = shiftHue(0, 4000, item.amount, 0),
  isRemainder = false,
  hasRemainder = false,
  isIncome = false,
  isOverBudget,
  hasChildren = false,
  handleAddChild,
}) {
  const documentPath = `documents/UEXue3UyAZM8SvFyBhZP/items/${item.id}`;
  const handleDelete = () => {
    deleteDoc(documentPath);
  };
  const { update } = useDocument(documentPath);

  const handleUpdateValue = (type, value) => {
    console.log("updating value to ", value);
    if (!item.id) return; // Exclude 'all income' block
    if (type === "number")
      update({
        amount: Number(value),
      });

    if (type === "text")
      update({
        title: value,
      });
  };

  return (
    <div
      className={`bg-gray-100 w-56 p-2 group flex flex-col justify-between text-right items-end ${
        isRemainder && "text-gray-400"
      } ${isOverBudget && "text-red-600"}`}
      style={{
        textAlign: "right",
        background: `hsla(${hue}, 80%, 70%, 1)`,
        borderTopRightRadius: !isIncome && !hasChildren ? 32 : 0,
        borderBottomRightRadius:
          !isIncome && (!hasChildren || hasRemainder) ? 32 : 0,
        borderTopLeftRadius: isIncome && 32,
        borderBottomLeftRadius: isIncome && 32,
      }}
    >
      <div className="max-w-48 overflow-hidden">
        <Input
          type="text"
          initialValue={item.title}
          handleBlur={handleUpdateValue}
        />
        <p className="font-semibold text-xl opacity-70 bg-blend-overlay text-black">
          £
          <Input
            type="number"
            initialValue={Math.round(item.amount)}
            handleBlur={handleUpdateValue}
          />
        </p>
      </div>
      <div className="opacity-0 group-hover:opacity-100 flex space-x-1 m-2">
        {item.id && (
          <button
            className="text-red-600 bg-white w-8 h-8 rounded-full"
            onClick={() => handleDelete(item)}
          >
            X
          </button>
        )}
        {!isIncome && (
          <button
            className="text-green-600 bg-white w-8 h-8 rounded-full"
            onClick={() => handleAddChild(item.id, false)}
          >
            +
          </button>
        )}
      </div>
    </div>
  );
}

function Input({ initialValue, type, handleBlur }) {
  const [value, setValue] = useState(initialValue);

  function onSubmit() {
    console.log("submitting", type, value);
    if (type === "number") handleBlur("number", value);
    if (type === "text") handleBlur("title", value);
  }

  return (
    <input
      type={type}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={() => onSubmit()}
      className="bg-transparent font-semibold text-xl opacity-70 bg-blend-overlay text-black focus:text-gray-800 min-w-12 w-24 rounded outline-none px-1 text-right"
    />
  );
}
