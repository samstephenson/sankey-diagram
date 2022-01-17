import React, { useState } from 'react';

const data = [
  {
    id: 1,
    parent: 0,
    name: 'Income',
    amount: 100,
  },
  {
    id: 2,
    parent: 1,
    name: 'Spending',
    amount: 50,
  },
  {
    id: 3,
    parent: 1,
    name: 'Savings',
    amount: 40,
  },
];

const colors = ['red', 'blue', 'green', 'yellow', 'indigo', 'purple', 'pink'];
const randomColor = () => {
  const randomNumber = Math.floor(Math.random() * colors.length);
  return colors[randomNumber];
};

export default function IndexPage() {
  return (
    <div className="flex-auto flex items-center w-full">
      <Column parent={0} />
      <Column parent={1} />
    </div>
  );
}

function Column({ parent }) {
  const children = data.filter((item) => item.parent === parent);
  const sum = children.map((x) => x.amount).reduce((a, b) => a + b);
  const leftover = {
    id: null,
    parent: parent,
    name: 'left over',
    amount: parent.amount - sum,
  };
  return (
    <div className="w-full flex-auto">
      {children.map((item) => (
        <Block
          item={item}
          parent={data.find((x) => x.id === parent) || {}}
          color={randomColor()}
        />
      ))}
      {sum > 0 && parent !== 0 && (
        <Block
          item={leftover}
          parent={data.find((x) => x.id === parent) || {}}
          color={randomColor()}
        />
      )}
    </div>
  );
}

function Block({ item, parent, color }) {
  const [amount, setAmount] = useState(item.amount);
  const [locked, setLocked] = useState(item.false);

  const baseHeight = 640;
  const height = parent.amount
    ? (amount / parent.amount) * baseHeight
    : baseHeight;

  return (
    <div
      key={item.id}
      className={`border-white border-2 w-full bg-${color}-${
        locked ? 100 : 200
      } flex flex-col justify-center items-end text-right p-2`}
      style={{
        height: height + 'px',
      }}
    >
      <p className="cursor-pointer" onClick={() => setLocked(!locked)}>
        {item.name}
      </p>
      <input
        className="w-full text-right bg-transparent"
        type="number"
        value={amount}
        onChange={(e) => !locked && setAmount(e.target.value)}
      />
    </div>
  );
}
