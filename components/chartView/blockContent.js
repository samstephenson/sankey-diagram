import React, { useState, useRef, useEffect } from "react";

import { deleteDoc, useDocument } from "swr-firestore-v9";
import { DocumentContext } from "./documentContext";
import { Plus, X } from "react-feather";
import CircleButton from "../circleButton";
import { getChildren, sumAmounts } from "../utils/items";

export default function BlockContent({
  item,
  isRemainder = false,
  remainder = null,
  isIncome = false,
  isOverBudget,
  hasChildren = false,
  hue = 0,
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
  const [height, setHeight] = useState(0);
  const [isAuto, setIsAuto] = useState(item.isAuto ?? false);
  const divRef = useRef(null);

  useEffect(() => {
    setHeight(divRef.current.clientHeight);
  }, []);

  const { update } = useDocument(documentPath);

  const children = getChildren(item, docContext.items);
  const sumOfChildren = sumAmounts(children);

  // useEffect(() => {
  //   !isIncome && isAuto && updateValue("");
  // }, [sumOfChildren]);

  const updateValue = (newValue) => {
    newValue = Number(newValue);
    console.log("updating value", newValue);
    if (!item.id) return; // Exclude 'all income' block
    if (!newValue) {
      console.log("setting to auto");
      setIsAuto(true);
      newValue = sumOfChildren;
    } else {
      console.log("setting auto to false");
      setIsAuto(false);
    }
    update({
      amount: newValue,
      isAuto: isAuto,
    });
  };

  const updateTitle = (newTitle) =>
    update({
      title: newTitle,
    });

  const isCompact = height < 40;

  function decideColor() {
    if (isIncome) return "#ccc";
    if (remainder < 0) return "red";
    if (item.isLocked) return "#ccc";
    return `hsla(${hue}, 80%, 70%, ${isHovering ? 0.9 : 1})`;
  }

  function decideShouldRoundBottomCorner() {
    if (isIncome) return true;
    if (!hasChildren) return true;
    if (remainder > 0) return true;
    return false;
  }

  return (
    <div
      className="relative flex items-stretch group w-72"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={() => {
        console.log("item: ", item);
        console.log("sum of children", sumOfChildren);
      }}
    >
      <div
        className={`bg-gray-100 w-72 overflow-hidden py-1 flex flex-col absolute inset-0 justify-between text-right items-end transition-all duration-100 ${
          isRemainder && "text-gray-400"
        } ${isOverBudget && "text-red-600"}`}
        ref={divRef}
        style={{
          minHeight: 44,
          background: decideColor(),
          borderTopRightRadius: !isIncome && !hasChildren ? 1 : 0,
          borderBottomRightRadius: decideShouldRoundBottomCorner() ? 32 : 0,
        }}
      >
        <div
          className={`max-w-56 text-xl grid grid-cols-4 opacity-80 ${
            !isHovering && isCompact && "hidden"
          }`}
        >
          <Input
            type="text"
            initialValue={item.title}
            handleBlur={updateTitle}
            className={`col-span-3 ${item.isLocked && "text-gray-500"}`}
          />

          <p className="font-semibold bg-blend-overlay text-black grow">
            <Input
              type="number"
              initialValue={Math.round(item.amount)}
              handleBlur={updateValue}
              className={`${item.isLocked && "text-gray-500"}`}
              placeholder={item.isAuto ? sumOfChildren : "auto"}
              isAuto={isAuto}
            />
          </p>
        </div>
        <button
          className="absolute left-1 top-1 opacity-0 group-hover:opacity-100"
          onClick={() => update({ isLocked: !item.isLocked ?? false })}
        >
          {hue}
        </button>
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

function Input({
  initialValue,
  type,
  handleBlur,
  className,
  isAuto = false,
  placeholder = "",
}) {
  const [value, setValue] = useState(initialValue);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    setValue(initialValue);
  }, [isAuto]);

  function onSubmit() {
    console.log("submitting", type, value);
    handleBlur(value);
  }

  return (
    <input
      type={type}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      value={value}
      placeholder={placeholder}
      onChange={(e) => setValue(e.target.value)}
      onBlur={() => onSubmit()}
      onClick={(e) => e.target.select()}
      className={`bg-transparent font-semibold bg-blend-overlay text-black focus:opacity-70 min-w-12 w-full outline-none px-2 text-right m-0 ${className}`}
      style={{
        background: isHovering ? "rgba(0,0,0,0.1)" : "none",
        appearance: "textfield",
        color: isAuto && "rgba(0,0,0,0.3)",
      }}
    />
  );
}
