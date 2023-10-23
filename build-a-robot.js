const ROADS = [
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


const buildGraph = (roads) => {
  let graph = Object.create(null); // Initializes empty object.  Creates object with no properties.
  const modifiedRoads = ROADS.map((road) => road.split("-"));// Split the ROADS array into new array of [start, end] pairs.
    for (const road of modifiedRoads) {
        const [start, end] = road;
        graph[start] ? graph[start].push(end) : (graph[start] = [end])
        graph[end] ? graph[end].push(start) : (graph[end] = [start])

    }
    return graph;
}

const roadGraph = buildGraph(ROADS);
console.log(roadGraph);