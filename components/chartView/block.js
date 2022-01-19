import React from "react";
import { useDocument } from "swr-firestore-v9";
import { getTopLevelOnly, sumAmounts } from "../utils/items";
import BlockContent from "./blockContent";
import ColumnContainer from "./columnContainer";
import Remainder from "./remainderBlock";

export default function Block({
  item,
  className = "",
  handleDelete,
  isIncome = false,
  handleAddChild,
}) {
  const { data, update, error } = useDocument(`users/1wWcVVtzSUguRNZtAgqy`, {
    listen: true,
  });
  if (error) return <p>Error!</p>;
  if (!data) return <p>Loading...</p>;

  const children = () => {
    const allItems = isIncome ? data.income : data.outgoings;
    const children = item.id
      ? allItems.filter((x) => x.childOf === item.id)
      : getTopLevelOnly(allItems);
    return children.sort((a, b) => b.amount - a.amount);
  };

  const remainder = () => {
    const childSum =
      children().length > 0 ? sumAmounts(children()) : item.amount;
    const remainder = item.amount - childSum;
    return remainder > 0 ? remainder : null;
  };

  return (
    <div
      className={`flex space-x-px items-stretch text-sm ${className}`}
      style={{
        flexGrow: item.amount,
      }}
    >
      <BlockContent
        item={item}
        hasRemainder={remainder()}
        isIncome={isIncome}
        index={0}
        isOverBudget={false}
        handleDelete={handleDelete}
        handleAddChild={handleAddChild}
        hasChildren={children().length > 0}
      />

      <ColumnContainer>
        {children().map((child) => {
          return (
            <Block
              item={child}
              key={child.id}
              handleAddChild={handleAddChild}
              handleDelete={handleDelete}
            />
          );
        })}
        {remainder() && <Remainder amount={remainder()} />}
      </ColumnContainer>
    </div>
  );
}
