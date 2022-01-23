import React from "react";
import { useCollection } from "swr-firestore-v9";
import { getTopLevelOnly, sumAmounts } from "../utils/items";
import { DocumentContext } from "./documentContext";
import { getRandomItem } from "../utils/items";
import BlockContent from "./blockContent";
import ColumnContainer from "./columnContainer";
import Remainder from "./remainderBlock";

export default function Block({
  item,
  className = "",
  isIncome = false,
  isReadOnly = false,
}) {
  const document = React.useContext(DocumentContext);
  const allItems = document.items.filter((x) => x.isIncome === isIncome);

  const getChildren = (item, allItems) => {
    if (!allItems) return [];

    const children = item.id
      ? allItems.filter((x) => x.childOf === item.id)
      : getTopLevelOnly(allItems);
    return children.sort((a, b) => b.amount - a.amount);
  };

  const getRemainder = (item) => {
    const children = getChildren(item, allItems);
    const childSum = children.length > 0 ? sumAmounts(children) : item.amount;
    const remainder = item.amount - childSum;
    return remainder;
  };

  const children = getChildren(item, allItems);
  const remainder = getRemainder(item);

  const { data, add, error } = useCollection(`documents/${document.id}/items`, {
    listen: true,
  });
  if (error) return <p>Error!</p>;
  if (!data) return <p>Loading...</p>;

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

  return (
    <div
      className={`flex space-x-px items-stretch text-sm ${className}`}
      style={{
        flexGrow: item.amount,
      }}
      onClick={() => console.log(children)}
    >
      <BlockContent
        item={item}
        remainder={remainder}
        isIncome={isIncome}
        index={0}
        isOverBudget={false}
        handleAddChild={addChild}
        hasChildren={children.length > 0}
        isReadOnly={isReadOnly}
      />

      <ColumnContainer>
        {children.map((child) => {
          return <Block item={child} key={child.id} isReadOnly={false} />;
        })}
        {remainder > 0 && <Remainder amount={remainder} />}
      </ColumnContainer>
    </div>
  );
}
