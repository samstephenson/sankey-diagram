import React from "react";
import { useCollection } from "swr-firestore-v9";
import { shiftHue } from "../utils/colors";
import {
  getTopLevelOnly,
  sumAmounts,
  getChildren,
  getRemainder,
} from "../utils/items";
import { DocumentContext } from "./documentContext";
import { getRandomItem } from "../utils/items";
import BlockContent from "./blockContent";
import ColumnContainer from "./columnContainer";
import Remainder from "./remainderBlock";
import { Plus } from "react-feather";
import { separator } from "@components/utils/formatters";
import CircleButton from "@components/circleButton";

export default function Block({
  item,
  className = "",
  isIncome = false,
  hue = 0,
  index,
}) {
  const document = React.useContext(DocumentContext);
  const allItems = document.items.filter((x) => x.isIncome === isIncome);

  const children = getChildren(item, allItems);
  const hasChildren = children.length > 0;
  const remainder = getRemainder(item, allItems);

  const { data, add, error } = useCollection(`documents/${document.id}/items`, {
    listen: true,
  });
  if (error) return <p>Error!</p>;
  if (!data) return <p>Loading...</p>;

  const getDepth = () => {
    let depth = 0;
    let itemToCheck = item;
    const getParent = (itemToCheck) =>
      data.find((x) => x.id === itemToCheck.childOf);
    while (getParent(itemToCheck)) {
      depth++;
      itemToCheck = getParent(itemToCheck);
    }
    return depth;
  };

  const addChild = () => {
    add(
      {
        ...getRandomItem(item.amount),
        childOf: item.id ?? null,
        isIncome: isIncome,
      },
      { merge: true }
    );
  };

  function howMuchToGrow() {
    if (item.isLocked) return 0;
    if (item.amount === 0 || !item.amount) return 1;
    return item.amount;
  }

  return (
    <div
      className={`flex space-x-px flex-shrink-0 items-stretch min-h-8 text-sm ${className}`}
      style={{
        flexGrow: howMuchToGrow(),
      }}
    >
      {item.id ? (
        <BlockContent
          item={item}
          remainder={remainder}
          isIncome={isIncome}
          hue={hue}
          index={0}
          isOverBudget={false}
          handleAddChild={addChild}
          hasChildren={hasChildren}
        />
      ) : (
        <div
          className="text-xl font-semibold p-2 bg-gray-200 relative w-12 group"
          style={{
            borderBottomRightRadius: remainder > 0 ? 32 : 0,
          }}
        >
          <h2 className="transform rotate-90 origin-left inline-block absolute top-0 left-6 whitespace-nowrap">
            £{separator(item.amount)} total
          </h2>
          <CircleButton
            className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100"
            color="green"
            onClick={() =>
              add({
                ...getRandomItem(),
                childOf: null,
                isIncome: false,
              })
            }
          >
            <Plus size={20} />
          </CircleButton>
        </div>
      )}

      <ColumnContainer>
        {children.map((child, i) => {
          return (
            <Block
              hue={shiftHue(hue, i, getDepth())}
              item={child}
              key={child.id}
              isReadOnly={false}
              index={i}
            />
          );
        })}
        {remainder > 0 && <Remainder amount={remainder} />}
      </ColumnContainer>
    </div>
  );
}
