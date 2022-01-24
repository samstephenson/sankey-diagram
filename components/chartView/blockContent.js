import React, { useState } from "react";
import { shiftHue } from "../utils/colors";
import { deleteDoc, useDocument } from "swr-firestore-v9";
import { DocumentContext } from "./documentContext";
import { Plus, X } from "react-feather";
import CircleButton from "../circleButton";

export default function BlockContent({
  item,
  hue = shiftHue(0, 4000, item.amount, 0),
  isRemainder = false,
  remainder = null,
  isIncome = false,
  isOverBudget,
  hasChildren = false,
  handleAddChild,
}) {
  const docContext = React.useContext(DocumentContext);
  const documentPath = `documents/${docContext.id}/items/${item.id}`;
  const handleDelete = () => {
    if (isIncome) {
      const incomeItems = docContext.items.filter((x) => x.isIncome === true);
      if (incomeItems.length <= 1) return;
    }
    deleteDoc(documentPath);
  };
  const [isHovering, setIsHovering] = useState(false);

  const { update } = useDocument(documentPath);
  const handleUpdateValue = (type, value) => {
    console.log("updating value to ", type, value);
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

  const isCompact = item.amount < docContext.totalIncome / 10;

  return (
    <div
      className="relative flex items-stretch group"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div
        className={`bg-gray-100 w-56 overflow-hidden py-1 flex flex-col relative justify-between text-right items-end transition-all duration-100 ${
          isRemainder && "text-gray-400"
        } ${isOverBudget && "text-red-600"}`}
        style={{
          minHeight: 12,
          textAlign: "right",
          background:
            remainder >= 0
              ? `hsla(${hue}, 80%, 70%, ${isHovering ? 0.9 : 1})`
              : `red`,
          borderTopRightRadius: !isIncome && !hasChildren ? 1 : 0,
          borderBottomRightRadius:
            !isIncome && (!hasChildren || remainder > 0) ? 32 : 0,
          borderTopLeftRadius: isIncome && 32,
          borderBottomLeftRadius: isIncome && 32,
        }}
      >
        <div
          className={`max-w-48 absolute opacity-80`}
          style={{
            fontSize: isCompact ? 16 : 20,
          }}
        >
          <Input
            type="text"
            initialValue={item.title}
            handleBlur={handleUpdateValue}
            className={"col-span-2"}
          />

          <p className="font-semibold bg-blend-overlay text-black grow">
            <Input
              type="number"
              initialValue={Math.round(item.amount)}
              handleBlur={handleUpdateValue}
              className={isCompact && "w-16"}
            />
          </p>
        </div>
      </div>

      <div className="opacity-0 group-hover:opacity-100 absolute top-1/2 -right-10 flex flex-col space-y-1 z-30 transform -translate-y-1/2">
        <CircleButton color="red" onClick={() => handleDelete(item)}>
          <X size={20} />
        </CircleButton>
        {!isIncome && (
          <CircleButton
            color="green"
            onClick={() => handleAddChild(item.id, false)}
          >
            <Plus size={20} />
          </CircleButton>
        )}
      </div>
    </div>
  );
}

function Input({ initialValue, type, handleBlur, className }) {
  const [value, setValue] = useState(initialValue);
  const [isHovering, setIsHovering] = useState(false);

  function onSubmit() {
    console.log("submitting", type, value);
    if (type === "number") handleBlur("number", value);
    if (type === "text") handleBlur("text", value);
  }

  return (
    <input
      type={type}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={() => onSubmit()}
      onClick={(e) => e.target.select()}
      className={`bg-transparent font-semibold bg-blend-overlay text-black focus:opacity-70 min-w-12 w-full outline-none px-2 text-right m-0 ${className}`}
      style={{
        // marginRight: type === "number" && "-1rem",
        background: isHovering ? "rgba(0,0,0,0.1)" : "none",
        appearance: "textfield",
      }}
    />
  );
}
