import React from "react";
import { useCollection } from "swr-firestore-v9";
import ChartView from "../components/chartView/chartView";

export default function IndexPage() {
  const documentId = "UEXue3UyAZM8SvFyBhZP";

  return (
    <>
      <ChartView documentId={documentId} />
    </>
  );
}
