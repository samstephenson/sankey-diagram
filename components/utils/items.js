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

export function getRandomItem() {
  const names = ["pizza", "sausages", "garlic"];
  const index = Math.floor(Math.random() * names.length);
  const amount = Math.floor(Math.random() * 1000);
  return {
    title: names[index],
    amount: amount,
    id: uuidv4(),
  };
}
