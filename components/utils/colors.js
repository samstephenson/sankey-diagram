export const colors = [
  'LightSalmon',
  'LemonChiffon',
  'Moccasin',
  'Khaki',
  'DarkKhaki',
  'Thistle',
  'Plum',
  'PaleGreen',
  'MediumAquamarine',
  'PaleTurqoise',
  'Aquamarine',
];

export const randomColor = () => {
  const randomNumber = Math.floor(Math.random() * colors.length);
  return colors[randomNumber];
};

export const shiftHue = (previousHue, parentAmount, amount, index) => {
  // Figure out share of hue to shift
  const shareOfTotal = amount / parentAmount;
  const hueToShift = 360 * shareOfTotal * (index + 1);
  return previousHue + hueToShift;
};
