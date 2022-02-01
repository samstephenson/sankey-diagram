export const randomColor = () => {
  const randomNumber = Math.floor(Math.random() * colors.length);
  return colors[randomNumber];
};

export const shiftHue = (parentAmount, index, depth) => {
  // Figure out share of hue to shift
  const multiplier = 20 / (depth + 1);
  const newHue = parentAmount + index * multiplier;
  return newHue;
};
