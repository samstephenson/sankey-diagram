import React from "react";
import { useDocument, useCollection } from "swr-firestore-v9";
import { getRandomItem, sumAmounts } from "../utils/items";
import { DocumentContext } from "./documentContext";
import Block from "./block";
import ColumnContainer from "./columnContainer";
import CircleButton from "@components/circleButton";
import { Plus } from "react-feather";

export default function ChartView({ documentId }) {
  const { data, add, error } = useCollection(`documents/${documentId}/items`, {
    listen: true,
  });
  if (error) return <p>Error!</p>;
  if (!data) return <p>Loading...</p>;

  console.log("items: ", data);

  if (data.length === 0) {
    add(
      {
        title: "My income",
        amount: 100,
        id: "1",
        childOf: null,
        isIncome: true,
      },
      { merge: true }
    );
  }

  const income = data.filter((item) => item.isIncome);

  return (
    <DocumentContext.Provider
      value={{
        id: documentId,
        items: data,
        totalIncome: sumAmounts(income),
      }}
    >
      <div className="flex flex-grow">
        <ColumnContainer className="group">
          {income.map((item) => {
            return <Block item={item} isIncome key={item.id} />;
          })}
          <CircleButton
            color="green"
            onClick={() =>
              add({
                ...getRandomItem(),
                isIncome: true,
              })
            }
            className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100"
          >
            <Plus size={20} />
          </CircleButton>
        </ColumnContainer>
        <ColumnContainer>
          <Block
            item={{
              title: "all income",
              amount: sumAmounts(income),
              id: null,
            }}
            isReadOnly={true}
          />
        </ColumnContainer>
      </div>
    </DocumentContext.Provider>
  );
}
