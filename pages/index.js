import React, { useState } from "react";
import { useCollection } from "swr-firestore-v9";
import ChartView from "@components/chartView/chartView";
import Header from "@components/header";

export default function IndexPage() {
  const userId = "1wWcVVtzSUguRNZtAgqy";
  const [activeDoc, setActiveDoc] = useState(null);

  const { data, add, error } = useCollection(`documents`, {
    where: ["owner", "==", `${userId}`],
    listen: true,
  });
  if (error) return <p>Error!</p>;
  if (!data) return <p>Loading...</p>;

  function createDoc() {
    add({
      owner: userId,
      title: "Untitled Document",
    });
  }

  return (
    <>
      <Header
        documents={data}
        activeDoc={activeDoc ? data.find((x) => activeDoc.id === x.id) : null}
        setActiveDoc={setActiveDoc}
        createDoc={createDoc}
      />
      {activeDoc && <ChartView doc={activeDoc} />}
    </>
  );
}
