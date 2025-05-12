import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {

  const sortings=[
    {label:'Bubble Sort', to:'/sorting/bubblesort' , cl:'bg-green-700'},
    {label:'Selection Sort', to:'/sorting/selectionsort' , cl:'bg-yellow-700'},
    {label:'Insertion Sort', to:'/sorting/insertionsort' , cl:'bg-indigo-700'}
  ]

  const searchings=[
    {label:'Linear Search', to:'/searching/linearsearch' , cl:'bg-green-700'},
    {label:'Binary Search', to:'/searching/binarysearch' , cl:'bg-yellow-700'}
  ]

  const graphs=[
    {label:'Breadth-first Search', to:'/graph/bfs' , cl:'bg-green-700'},
    {label:'Depth-first Search', to:'/graph/dfs' , cl:'bg-yellow-700'}
  ]

  return (
    <div className=''>
        <div className='p-4 bg-gray-200'>
            <h1 className='text-6xl text-center text-indigo-700 font-bold'>DSA Visualizer</h1>
            <p className='p-2 text-xl sm:text-3xl'>
              <span className='font-bold'>Welcome to the Data Structure & Algorithm Visualizer — a powerful learning companion built for curious minds.</span>
              <span className='hidden sm:block'>This interactive platform helps you understand complex algorithms and data structures through clear animations, intuitive controls, and hands-on experimentation. From basic sorting techniques like Bubble and Insertion Sort, to graph traversal algorithms like BFS and DFS, this tool brings theoretical concepts into motion. Whether you're preparing for coding interviews, strengthening your CS fundamentals, or simply exploring how algorithms work behind the scenes — this is your go-to visual guide.
                <br/>
              Customize arrays, graphs, and speeds. Play and learn at your pace.</span>
            </p>
        </div>
        <h1 className='text-4xl px-4 font-bold'>Sorting Algorithms</h1>
        <div className='flex flex-wrap gap-2 m-4'>
          {sortings.map((sorting)=>(
            <Link 
            to={sorting.to}
            className={`${sorting.cl} rounded p-2 text-white text-2xl cursor-pointer`}
            >{sorting.label}</Link>
          ))}
        </div>
        <h1 className='text-4xl px-4 font-bold'>Searching algorithms</h1>
        <div className='flex flex-wrap gap-2 m-4'>
          {searchings.map((searching)=>(
            <Link 
            to={searching.to}
            className={`${searching.cl} rounded p-2 text-white text-2xl cursor-pointer`}
            >{searching.label}</Link>
          ))}
        </div>
        <h1 className='text-4xl px-4 font-bold'>Graph Traversings</h1>
        <div className='flex flex-wrap gap-2 m-4'>
          {graphs.map((graph)=>(
            <Link 
            to={graph.to}
            className={`${graph.cl} rounded p-2 text-white text-2xl cursor-pointer`}
            >{graph.label}</Link>
          ))}
        </div>
    </div>
  )
}

export default Home