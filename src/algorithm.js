const colors = ["Red", "Yellow", "Green"];
const colorWeight = [2, 3, 1, 4]; //weight of each element above
const totalWeight = eval(colorWeight.join("+")); //get total weight (in this case, 10)
const weighedColors = new Array(); //new array to hold "weighted" fruits
var currentColor = 0;

export const nextStudent = () => {
  while (currentColor < colors.length) {
    //step through each fruit[] element
    for (let i = 0; i < colorWeight[currentColor]; i++)
      weighedColors[weighedColors.length] = colors[currentColor];
    currentColor++;
  }

  const randomStudent = Math.floor(Math.random() * totalWeight);
  console.log(weighedColors[randomStudent]);
  return (weighedColors[randomStudent])
};
