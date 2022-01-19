import React from "react";
import { useDocument, useCollection } from "swr-firestore-v9";
import { getRandomItem, sumAmounts } from "../utils/items";
import { AllItemsContext } from "./allItemsContext";
import Block from "./block";
import ColumnContainer from "./columnContainer";

export default function ChartView({ documentId }) {
  const { data, update, error } = useCollection(
    `documents/${documentId}/items`,
    {
      listen: true,
    }
  );
  if (error) return <p>Error!</p>;
  if (!data) return <p>Loading...</p>;

  const income = data.filter((item) => item.isIncome);
  const outgoings = data.filter((item) => !item.isIncome);

  function addItem(childOf = null, isIncome = false) {
    add(
      {
        ...getRandomItem(),
        childOf: childOf ?? null,
        isIncome: isIncome,
      },
      { merge: true }
    );
  }

  function deleteItem(item) {
    const newArray = outgoings.filter((x) => x.id !== item.id);
    update(
      {
        outgoings: newArray,
      },
      { merge: true }
    );
  }

  return (
    <AllItemsContext.Provider value={data}>
      <div className="flex" style={{ height: "80vh" }}>
        <ColumnContainer>
          {income.map((item) => {
            return (
              <Block
                item={item}
                handleDelete={deleteItem}
                isIncome
                handleAddChild={addItem}
                allItems={income}
                key={item.id}
              />
            );
          })}
          <button onClick={() => addItem(null, true)}>Add income</button>
        </ColumnContainer>
        <ColumnContainer>
          <Block
            item={{
              title: "all income",
              amount: sumAmounts(income),
              id: null,
            }}
            handleDelete={deleteItem}
            handleAddChild={addItem}
          />
        </ColumnContainer>
      </div>
    </AllItemsContext.Provider>
  );
}
