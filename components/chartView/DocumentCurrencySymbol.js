import React from "react";
import { DocumentContext } from "./documentContext";

export default function DoucmentCurrencySymbol() {
  const doc = React.useContext(DocumentContext);
  const symbol = doc.symbol ?? "£";

  return symbol;
}
