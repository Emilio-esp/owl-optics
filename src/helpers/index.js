export const getTotalAmount = ( items ) => {
  return items.reduce((total, cItem) => (total += parseInt(cItem.price)), 0);
}

export const encodeTimesTamp = () => {
  const date = new Date();
  return date.getTime();
};

export const decodeTimesTamp = ( time ) => {
  if (typeof time !== "number") return
  const date = new Date();
  date.setTime(time);
  return date.toDateString();
}