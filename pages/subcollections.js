import React from "react";
import { useDocument, useCollection } from "swr-firestore-v9";
import ChartView from "../components/chartView/chartView";

export default function IndexPage() {
  const user = { id: "1wWcVVtzSUguRNZtAgqy" };
  const { data, update, error } = useCollection(
    `documents/UEXue3UyAZM8SvFyBhZP/items`,
    {
      listen: true,
    }
  );

  if (error) return <p>Error!</p>;
  if (!data) return <p>Loading...</p>;

  console.log("data", data);

  return data.map((item) => (
    <p key={item.id}>
      {item.title}, {item.amount}
    </p>
  ));
}
