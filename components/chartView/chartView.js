import React from "react";
import { useDocument, useCollection } from "swr-firestore-v9";
import { getRandomItem, sumAmounts } from "../utils/items";
import { DocumentContext } from "./documentContext";
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

  return (
    <DocumentContext.Provider
      value={{
        id: documentId,
        items: data,
      }}
    >
      <div className="flex" style={{ height: "80vh" }}>
        <ColumnContainer>
          {income.map((item) => {
            return <Block item={item} isIncome key={item.id} />;
          })}
          {/* <button onClick={() => addItem(null, true)}>Add income</button> */}
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
