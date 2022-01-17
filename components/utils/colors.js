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
