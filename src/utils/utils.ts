export const renderGraphNumber = (result: number) => {
  // The specific decimal value
  const maxValue = 10; // The constant value for multipliers after reaching the result
  const dataLength = 11; // Assuming you want x values from 0 to 10

  const data = Array.from({ length: dataLength }, (_, x) => {
    // For x values less than the whole part of the result, increment multiplier by 1
    if (x < Math.floor(result)) {
      return { x, multiplier: x };
    }
    // For the x value equal to the whole part of the result, use the decimal result
    else if (x === Math.floor(result)) {
      return { x, multiplier: result };
    }
    // For x values greater than the whole part of the result, use the maxValue
    else {
      return { x, multiplier: maxValue };
    }
  });

  return data;
};
