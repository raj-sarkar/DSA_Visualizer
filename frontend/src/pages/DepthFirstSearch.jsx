import { useEffect, useState } from "react";
import Graph from "../components/Graph";
import GraphNavbar from "../components/GraphNavbar";

const DepthFirstSearch = () => {
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

    const dfs = async () => {
        if (startId === -1) return;
        setTraversing(true)

        const visited = new Set();
        const path = [];

        const dfsHelper = async (node) => {
            if (visited.has(node)) return;

            setCurrent(node);
            await sleep(500);
            visited.add(node);
            path.push(node);
            setVisitedNodes([...visited]);
            await sleep(500);

            const neighbors = edges
                .filter(e => e.from === node)
                .map(e => e.to);

            for (const neighbor of neighbors) {
                if (!visited.has(neighbor)) {
                    setSeen(s=>[...s,neighbor])
                    await sleep(500)
                    await dfsHelper(neighbor);
                }
            }
        };

        await dfsHelper(startId);
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
                        onClick={dfs}
                        disabled={traversing}
                    >
                        Start Depth-First Search
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

export default DepthFirstSearch;
