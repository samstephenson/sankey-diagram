import React from 'react';
import { randomColor } from '../components/utils/colors';
import { data } from '../data/data';

export default function IndexPage() {
  return (
    <div className="w-screen flex" style={{ height: '80vh' }}>
      <ColumnContainer>
        {data.income.map((item) => (
          <Block item={item} key={item.name} color={randomColor()} isIncome />
        ))}
      </ColumnContainer>
      <Block
        item={{
          name: 'all income',
          amount: sumAmounts(data.income.map((x) => x.amount)),
          children: data.outgoings,
        }}
        color="LightSkyBlue"
      />
    </div>
  );
}

function Block({
  item,
  className = '',
  color,
  isRemainder = false,
  isIncome = false,
}) {
  let remainder = 0;
  let sortedChildren = [];
  if (item.children) {
    const sumOfChildren = sumAmounts(item.children);
    remainder = item.amount - sumOfChildren;
    sortedChildren = item.children.sort((a, b) => b.amount - a.amount);
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
        color={color}
        isRemainder={isRemainder}
        hasRemainder={remainder > 0}
        isIncome={isIncome}
      />
      <ColumnContainer>
        {sortedChildren &&
          sortedChildren.map((child) => {
            return (
              <Block item={child} key={child.name} color={randomColor()} />
            );
          })}
        {remainder > 0 && (
          <Block
            item={{ name: 'remainder', amount: remainder }}
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
  color,
  isRemainder = false,
  hasRemainder = false,
  isIncome = false,
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
        isRemainder && 'text-gray-500'
      }`}
      style={{
        textAlign: isRemainder ? 'left' : 'right',
        background: color,
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
