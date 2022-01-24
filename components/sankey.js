import React from "react";
import useSWR from "swr";
import { randomColor } from "@components/utils/colors";
import { addUser } from "../data/firebase";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function useData() {
  return useSWR("/api/sam", fetcher);
}

export default function SankeyChart() {
  const { data, error } = useData();

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const { income, outgoings } = data;

  function fillInBlanks(items) {
    return items.map((item) => {
      if (item.amount) {
        return item;
      }
      // For any item that doesn't have an amount.
      if (!item.amount) {
        // If it has no children, make it zero
        if (!hasChildren(item)) {
          item.amount = 0;
        } else {
          // Figure out child amounts first
          fillInBlanks(item.children);
          // Calculate the amount as the sum of its children.
          item.amount = sumAmounts(children);
        }
        return item;
      }
    });
  }

  return (
    <div className="w-screen flex" style={{ height: "80vh" }}>
      <button onClick={() => addUser()}>Add</button>
      <ColumnContainer>
        {income.map((item) => (
          <Block item={item} key={item.name} color={randomColor()} isIncome />
        ))}
      </ColumnContainer>
      <Block
        item={{
          name: "all income",
          amount: sumAmounts(income.map((x) => x.amount)),
          children: fillInBlanks(outgoings),
        }}
        color="LightSkyBlue"
      />
    </div>
  );
}

function Block({
  item,
  className = "",
  isRemainder = false,
  isIncome = false,
  index = 0,
  hue = 0,
}) {
  let remainder = 0;
  let sortedChildren = [];
  let isOverBudget = false;

  if (item.children) {
    const sumOfChildren = sumAmounts(item.children);
    remainder = item.amount - sumOfChildren;
    sortedChildren = item.children.sort((a, b) => b.amount - a.amount);
    isOverBudget = sumOfChildren > item.amount;
  }
  if (!item.amount) {
    const sumOfChildren = sumAmounts(item.children);
    item.amount = sumOfChildren;
  }

  return (
    <div
      className={`flex space-x-px items-stretch text-sm ${className}`}
      style={{
        flexGrow: item.amount,
      }}
    >
      <BlockContent
        item={item}
        hue={shiftHue(hue, 4000, item.amount, index)}
        isRemainder={isRemainder}
        hasRemainder={remainder > 0}
        isIncome={isIncome}
        index={index}
        isOverBudget={isOverBudget}
      />
      <ColumnContainer>
        {sortedChildren &&
          sortedChildren.map((child, i) => {
            return <Block item={child} key={child.name} hue={hue} index={i} />;
          })}
        {remainder > 0 && (
          <Block
            item={{ name: "remainder", amount: remainder }}
            color="none"
            isRemainder
          />
        )}
      </ColumnContainer>
    </div>
  );
}

function ColumnContainer({ children }) {
  return <div className="flex flex-col space-y-px">{children}</div>;
}

function BlockContent({
  item,
  hue,
  isRemainder = false,
  hasRemainder = false,
  isIncome = false,
  isOverBudget,
}) {
  const content = isRemainder ? (
    <p>+£{Math.round(item.amount)}</p>
  ) : (
    <div className="absolute flex space-x-2 right-2">
      <p className="truncate">{item.name}</p>
      <p>£{Math.round(item.amount)}</p>
    </div>
  );

  return (
    <div
      className={`bg-gray-100 w-56 relative flex flex-col justify-center ${
        isRemainder && "text-gray-400"
      } ${isOverBudget && "text-red-600"}`}
      style={{
        textAlign: isRemainder ? "left" : "right",
        background: isRemainder ? "none" : `hsla(${hue}, 80%, 70%, 1)`,
        borderTopRightRadius: !isIncome && !hasChildren(item) ? 32 : 0,
        borderBottomRightRadius:
          !isIncome && (!hasChildren(item) || hasRemainder) ? 32 : 0,
        borderTopLeftRadius: isIncome && 32,
        borderBottomLeftRadius: isIncome && 32,
      }}
    >
      {content}
    </div>
  );
}

function hasChildren(item) {
  return item.children ? item.children.length : false;
}

function sumAmounts(items) {
  const amounts = items.map((x) => x.amount);
  const sumOfAmounts = amounts.reduce((a, b) => a + b);
  return sumOfAmounts;
}

const shiftHue = (previousHue, parentAmount, amount, index) => {
  // Figure out share of hue to shift
  const shareOfTotal = amount / parentAmount;
  const hueToShift = 360 * shareOfTotal * (index + 1);
  return previousHue + hueToShift;
};
