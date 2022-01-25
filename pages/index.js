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

  console.log("data", data);

  return (
    <>
      <Header
        documents={data}
        activeDoc={activeDoc}
        setActiveDoc={setActiveDoc}
        createDoc={createDoc}
      />
      <ChartView documentId={activeDoc} />
    </>
  );
}
