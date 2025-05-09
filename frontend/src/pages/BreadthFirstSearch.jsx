import { useEffect, useState } from "react";
import Graph from "../components/Graph";
import GraphNavbar from "../components/GraphNavbar";

const BreadthFirstSearch = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [visitedNodes, setVisitedNodes] = useState([])
  const [seen, setSeen] = useState([])
  const [startId, setStartId] = useState(-1)
  const [current, setCurrent] = useState(-1)
  const [traversing, setTraversing] = useState(false)

  useEffect(() => {
    setVisitedNodes([])
    setSeen([])
  }, [nodes, edges, startId])

  const sleep = (speed) => new Promise(res => setTimeout(res, speed));

  const bfs = async () => {
    if (startId == -1) return;
    setTraversing(true)
    const visited = new Set();
    const queue = [startId];
    const path = [];
    while (queue.length > 0) {
      const current = queue.shift();
      setCurrent(current);
      await sleep(500)
      if (visited.has(current)) continue;
      visited.add(current);
      path.push(current);
      const neighbors = edges.filter(e => e.from == current).map(e => e.to);
      for (let i = 0; i < neighbors.length; i++) {
        const n = neighbors[i]
        if (!visited.has(n)) {
          setSeen(s => [...s, n]);
          await sleep(500)
          queue.push(n);
        }
      }
      setVisitedNodes([...visited]);
      await sleep(500);
    }
    setCurrent(-1)
    setTraversing(false)
  };

  return (
    <div>
      <GraphNavbar />
      <div className="flex flex-col">
        <div className="flex flex-row gap-2 justify-center mt-2 text-white">
          <button
            className={`p-2 rounded cursor-pointer ${traversing ? 'bg-gray-400 pointer-events-none' : 'bg-indigo-500'}`}
            onClick={bfs}
            disabled={traversing}
          >
            Start Breadth-First Search
          </button>
          <select
            className="text-black border rounded "
            onChange={(e) => setStartId(Number(e.target.value))}
          >
            <option value={-1}>From</option>
            {nodes.map(n => (
              <option key={n.id} value={n.id} >{n.id}</option>
            ))}
          </select>
        </div>
        <Graph nodes={nodes} edges={edges} setNodes={setNodes} setEdges={setEdges} visitedNodes={visitedNodes} seen={seen} current={current} />
      </div>
    </div>
  );
};

export default BreadthFirstSearch;
