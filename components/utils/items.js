import { v4 as uuidv4 } from "uuid";

export function hasChildren(item) {
  return item.children ? item.children.length : false;
}

export function sumAmounts(items) {
  if (!items) return;
  const amounts = items.map((x) => x.amount);
  if (amounts.length > 0) {
    const sumOfAmounts = amounts.reduce((a, b) => a + b);
    return sumOfAmounts;
  } else return null;
}

export function getTopLevelOnly(tree) {
  const noParents = tree.filter((x) => !x.childOf);
  return noParents;
}

export function getRandomItem(parentAmount = 1000) {
  const names = ["pizza", "sausages", "garlic"];
  const index = Math.floor(Math.random() * names.length);
  const amount = Math.floor(Math.random() * parentAmount);
  return {
    title: names[index],
    amount: amount,
    id: uuidv4(),
  };
}

export const getChildren = (item, allItems) => {
  if (!allItems) return [];

  const children = item.id
    ? allItems.filter((x) => x.childOf === item.id)
    : getTopLevelOnly(allItems);
  return children.sort((a, b) => b.amount - a.amount);
};

export const getRemainder = (item, allItems) => {
  const children = getChildren(item, allItems);
  const childSum = children.length > 0 ? sumAmounts(children) : item.amount;
  const remainder = item.amount - childSum;
  return remainder;
};
