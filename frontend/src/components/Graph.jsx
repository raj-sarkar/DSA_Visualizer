import React, { useRef, useState } from 'react'
import Draggable from 'react-draggable';

const Graph = ({ nodes, setNodes, edges, setEdges, visitedNodes, seen, current }) => {

    const [selected, setSelected] = useState({ from: "", to: "" });
    const nodeRef = useRef(null)

    const addNode = () => {
        const newId = nodes.length;
        const newNode = {
            id: newId,
            x: Math.floor(Math.random() * window.innerWidth * 0.8),
            y: Math.floor(Math.random() * window.innerHeight * 0.6),
        };
        setNodes([...nodes, newNode]);
    };

    const addEdge = () => {
        if (selected.from !== "" && selected.to !== "") {
            if(selected.from===selected.to)return
            setEdges([...edges, { from: Number(selected.from), to: Number(selected.to) }]);
        }
    };

    return (
        <div className="flex flex-col items-center w-full h-screen p-4">
            <div className="mb-4 space-x-2 flex flex-col sm:flex-row gap-2 items-center">
                <button onClick={addNode} className="px-4 py-2 bg-indigo-500 text-white rounded cursor-pointer ">
                    Add Node
                </button>
                <div className='flex flex-row gap-2 '>
                    <select
                        value={selected.from}
                        onChange={(e) => setSelected({ ...selected, from: e.target.value })}
                        className="px-2 py-1 border rounded"
                    >
                        <option value="">From</option>
                        {nodes.map((node) => (
                            <option key={node.id} value={node.id}>{node.id}</option>
                        ))}
                    </select>
                    <select
                        value={selected.to}
                        onChange={(e) => setSelected({ ...selected, to: e.target.value })}
                        className="px-2 py-1 border rounded"
                    >
                        <option value="">To</option>
                        {nodes.map((node) => (
                            <option key={node.id} value={node.id}>{node.id}</option>
                        ))}
                    </select>
                    <button onClick={addEdge} className="px-4 py-2 bg-green-600 text-white rounded cursor-pointer">
                        Add Edge
                    </button>
                </div>
            </div>

            <div className='flex flex-wrap gap-2'>
                <div className='flex flex-row w-fit items-center gap-1'>
                        <span className='w-[20px] h-[20px] bg-indigo-400 rounded-full'></span>
                        <span>Node</span>
                </div>
                <div className='flex flex-row w-fit items-center gap-1'>
                        <span className='w-[20px] h-[20px] bg-red-700 rounded-full'></span>
                        <span>Current Node</span>
                </div>
                <div className='flex flex-row w-fit items-center gap-1'>
                        <span className='w-[20px] h-[20px] bg-green-700 rounded-full'></span>
                        <span>Adjacent Node</span>
                </div>
                <div className='flex flex-row w-fit items-center gap-1'>
                        <span className='w-[20px] h-[20px] bg-orange-400 rounded-full'></span>
                        <span>Traversed Node</span>
                </div>

            </div>

            <div className="relative w-full h-full rounded bg-gray-100 overflow-hidden border-2 border-slate-300">
                {edges.map((edge, i) => {
                    const fromNode = nodes.find((n) => n.id === edge.from);
                    const toNode = nodes.find((n) => n.id === edge.to);
                    if (!fromNode || !toNode) return null;

                    const x1 = fromNode.x + 20;
                    const y1 = fromNode.y + 20;
                    const x2 = toNode.x + 20;
                    const y2 = toNode.y + 20;
                    const dx = x2 - x1;
                    const dy = y2 - y1;
                    const length = Math.sqrt(dx * dx + dy * dy);
                    const offset = 20;

                    const newX2 = x2 - (dx / length) * offset;
                    const newY2 = y2 - (dy / length) * offset;

                    return (
                        <svg key={i} className="absolute top-0 left-0 w-full h-full pointer-events-none">
                            <defs>
                                <marker
                                    id="arrowhead"
                                    markerWidth="10"
                                    markerHeight="7"
                                    refX="10"
                                    refY="3.5"
                                    orient="auto"
                                    markerUnits="strokeWidth"
                                >
                                    <polygon points="0 0, 10 3.5, 0 7" fill="black" />
                                </marker>
                            </defs>
                            <line
                                x1={x1}
                                y1={y1}
                                x2={newX2}
                                y2={newY2}
                                stroke="black"
                                strokeWidth="2"
                                markerEnd="url(#arrowhead)"
                            />
                        </svg>

                    );
                })}

                {nodes.map((node) => (
                    <Draggable
                        key={node.id}
                        nodeRef={nodeRef}
                        defaultPosition={{ x: node.x, y: node.y }}
                        onDrag={(_, data) => {
                            const newNodes = nodes.map(n =>
                                n.id === node.id ? { ...n, x: data.x, y: data.y } : n
                            );
                            setNodes(newNodes);
                        }}
                    >
                        <div
                            ref={nodeRef}
                            className={`absolute w-10 h-10 flex items-center justify-center text-white rounded-full shadow      cursor-move
                            ${seen.includes(node.id) ? 'bg-green-700' : ' bg-indigo-400'}
                            ${current == node.id ? 'bg-red-700' : ''}
                            ${visitedNodes.includes(node.id) ? 'bg-orange-400' : ''}

                            `}
                        >
                            {node.id}
                        </div>
                    </Draggable>
                ))}
            </div>
        </div>
    )
}

export default Graph