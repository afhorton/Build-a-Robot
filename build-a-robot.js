const roads = [
  "Alice's House-Bob's House",
  "Alice's House-Cabin",
  "Alice's House-Post Office",
  "Bob's House-Town Hall",
  "Daria's House-Ernie's House",
  "Daria's House-Town Hall",
  "Ernie's House-Grete's House",
  "Grete's House-Farm",
  "Grete's House-Shop",
  "Marketplace-Farm",
  "Marketplace-Post Office",
  "Marketplace-Shop",
  "Marketplace-Town Hall",
  "Shop-Town Hall",
];

// const ROADS = [
//   "Alice's House-Bob's House",
//   "Alice's House-Cabin",
//   "Alice's House-Post Office",
//   "Bob's House-Town Hall",
//   "Daria's House-Ernie's House",
//   "Daria's House-Town Hall",
//   "Ernie's House-Grete's House",
//   "Grete's House-Farm",
//   "Grete's House-Shop",
//   "Marketplace-Farm",
//   "Marketplace-Post Office",
//   "Marketplace-Shop",
//   "Marketplace-Town Hall",
//   "Shop-Town Hall",
// ];

// const buildGraph = (roads) => {
//   let graph = Object.create(null); // Initializes empty object.  Creates object with no properties.
//   const modifiedRoads = ROADS.map((road) => road.split("-"));// Split the ROADS array into new array of [start, end] pairs.
//     for (const road of modifiedRoads) {
//         const [start, end] = road;
//         graph[start] ? graph[start].push(end) : (graph[start] = [end])
//         graph[end] ? graph[end].push(start) : (graph[end] = [start])

//     }
//     return graph;
// }

// const roadGraph = buildGraph(ROADS);
// console.log(roadGraph);

function buildGraph(edges) {
  let graph = Object.create(null);
  function addEdge(from, to) {
    if (graph[from] == null) {
      graph[from] = [to];
    } else {
      graph[from].push(to);
    }
  }
  for (let [from, to] of edges.map((r) => r.split("-"))) {
    addEdge(from, to);
    addEdge(to, from);
  }
  return graph;
}

const roadGraph = buildGraph(roads);

console.log(roadGraph); // to check to see how the graph looks.

class VillageState {
  constructor(place, parcels) {
    this.place = place;
    this.parcels = parcels;
  }

  move(destination) {
    if (!roadGraph[this.place].includes(destination)) {
      return this;
    } else {
      let parcels = this.parcels.map(p => {
        if (p.place != this.place) return p;
        return {place: destination, address: p.address};
      }).filter(p => p.place != p.address );
      return new VillageState(destination, parcels);
    }
  }
}

let first = new VillageState("Post Office", [{place: "Post Office", address:"Alice's House"}]);
let next = first.move("Alice's House");

console.log(next.place);
console.log(next.parcels);
console.log(first.place);

function runRobot(state, robot, memory) {
  for (let turn = 0; ; turn++) {
    if(state.parcels.length == 0) {
      console.log('Done in ${turn} turns');
      break;
    }
    let action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
    console.log('Moved to ${action.direction}');
  }
}

//If robot moves in random directions 

function randomPick(array){
  let choice = Math.floor(Math.random() * array.length);
  return array[choice];
}

function randomRobot(state){
  return {direction: randomPick(roadGraph[state.place])};
}
