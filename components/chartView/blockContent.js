import React from "react";
import { shiftHue } from "../utils/colors";
import { deleteDoc } from "swr-firestore-v9";

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
  const handleDelete = () => {
    deleteDoc(`documents/UEXue3UyAZM8SvFyBhZP/items/${item.id}`);
  };

  return (
    <div
      className={`bg-gray-100 w-56 relative flex flex-col justify-center ${
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
      <div className="absolute flex space-x-2 right-2 max-w-48 overflow-hidden">
        <p className="truncate" onClick={() => console.dir(item)}>
          {item.title}
        </p>
        <p>£{Math.round(item.amount)}</p>
        {item.id && (
          <button className="text-red-600" onClick={() => handleDelete(item)}>
            X
          </button>
        )}
        {!isIncome && (
          <button
            className="text-green-600"
            onClick={() => handleAddChild(item.id, false)}
          >
            +
          </button>
        )}
      </div>
    </div>
  );
}
