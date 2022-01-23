import React, { useState } from "react";
import { shiftHue } from "../utils/colors";
import { deleteDoc, useDocument } from "swr-firestore-v9";
import { DocumentContext } from "./documentContext";

export default function BlockContent({
  item,
  hue = shiftHue(0, 4000, item.amount, 0),
  isRemainder = false,
  remainder = null,
  isIncome = false,
  isOverBudget,
  hasChildren = false,
  handleAddChild,
  isReadOnly,
}) {
  const documentPath = `documents/UEXue3UyAZM8SvFyBhZP/items/${item.id}`;
  const docContext = React.useContext(DocumentContext);
  const handleDelete = () => {
    if (isIncome) {
      const incomeItems = docContext.items.filter((x) => x.isIncome === true);
      if (incomeItems.length <= 1) return;
    }
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
      className={`bg-gray-100 w-56 p-2 group flex flex-col relative justify-between text-right items-end ${
        isRemainder && "text-gray-400"
      } ${isOverBudget && "text-red-600"}`}
      style={{
        textAlign: "right",
        background: remainder >= 0 ? `hsla(${hue}, 80%, 70%, 1)` : `red`,
        borderTopRightRadius: !isIncome && !hasChildren ? 32 : 0,
        borderBottomRightRadius:
          !isIncome && (!hasChildren || remainder > 0) ? 32 : 0,
        borderTopLeftRadius: isIncome && 32,
        borderBottomLeftRadius: isIncome && 32,
      }}
    >
      <div className="max-w-48 overflow-hidden">
        {isReadOnly ? (
          <p className="font-semibold text-xl opacity-70 bg-blend-overlay text-black">
            {item.title}
          </p>
        ) : (
          <Input
            type="text"
            initialValue={item.title}
            handleBlur={handleUpdateValue}
          />
        )}
        <p className="font-semibold text-xl opacity-70 bg-blend-overlay text-black">
          {isReadOnly ? (
            Math.round(item.amount)
          ) : (
            <Input
              type="number"
              initialValue={Math.round(item.amount)}
              handleBlur={handleUpdateValue}
            />
          )}
        </p>
      </div>
      <div className="opacity-0 group-hover:opacity-100 absolute bottom-3 right-3 flex space-x-1">
        {!isReadOnly && (
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
      className="bg-transparent font-semibold text-xl bg-blend-overlay text-black focus:opacity-70 min-w-12 w-full rounded outline-none px-1 text-right appearance-none m-0"
      style={{
        marginRight: type === "number" && "-1rem",
      }}
    />
  );
}
