/*
A Thief has a knapsack that can hold X lbs of stolen goods
Each stolen good is worth a certain amount of cash, but
the stolen good also weighs a certain weight. This means that
the thief has to pick an optimal combination of items!
The Thief can't pick the same item twice.

What is the maximum worth of goods that the thief can steal?
*/

/*
  constant capacity = x lbs
  stolen good = x lb/good, x dollar/good

  general strategy:
  Decision tree:
  - look for the highest worth, see if that fits into the capacity
  - look for the second highest worth, see if that fits into the capacity
  -  look for ...nth highest worth,
  - if doesnt fit at any point, look for the one rank lower than the   current highest, and see if that fits

  - terminate when capacity is reached or if there're no more possible choices to add that will not exceed capacity.

  Example:
  capacity = 30 lbs

  goods = [{weight: 10, worth: 10}, {weight: 11, worth: 12}, {weight:2,worth: 4}, {weight: 19, worth: 25}]

  Optimal worth of goods = 25 + 10 = 37

*/

/*

  keep an array of worths = [26]
  keep track of total weight = 40
  keep track of worth = 47

  Base case:
  if current weight is reached
    record the worth
    return
  if the current weight exceeded the capacity
    return


  Recursive
  1. iterate the array of goods
  2. add the weight to the capacity, add the worth to the total worth
  3. recursively pass the rest of the array excluding the current good
  4. Backtrack
      - subtract current weight from total weight
      - subtract current worth from total worth
  4. if loop exits, record the worth at the point where there's no choices


  outer:
  return the max of the worths

*/


const thieftSnapsack = (goods, capacity) => {
  const worths = [];
  let totalWeight = 0;
  let totalWorth = 0;

  const inner = (goods) => {
    if (totalWeight === capacity) {
      worths.push(totalWeight);
      return;
    }
    if (totalWeight > capacity) {
      return;
    }

    for (let i = 0; i < goods.length; i++) {
      totalWeight += goods[i].weight;
      totalWorth += goods[i].worth;
      inner(goods.slice(1));
      totalWeight -= goods[i].weight;
      totalWorth -= goods[i].worth;

    }

    worths.push(totalWorth);


  }
  inner(goods);

  return Math.max.apply(null,worths);
};

const goods = [{weight: 10, worth: 10}, {weight: 11, worth: 12}, {weight:2,worth: 4}, {weight: 19, worth: 25}];

// knapsack capacity = 30
// Expected output: 35
console.log(thieftSnapsack(goods,30));
