import React from 'react'

const Home = () => {
  return (
    <div className=''>
        <div className='p-4 bg-gray-200'>
            <h1 className='text-6xl text-center text-indigo-700 font-bold'>DSA Visualizer</h1>
            <p className='p-2 text-xl sm:text-3xl'>
              <span className='font-bold'>Welcome to the Data Structure & Algorithm Visualizer — a powerful learning companion built for curious minds.</span>
              <span className='hidden sm:block'>This interactive platform helps you understand complex algorithms and data structures through clear animations, intuitive controls, and hands-on experimentation. From basic sorting techniques like Bubble and Insertion Sort, to graph traversal algorithms like BFS and DFS, this tool brings theoretical concepts into motion. Whether you're preparing for coding interviews, strengthening your CS fundamentals, or simply exploring how algorithms work behind the scenes — this is your go-to visual guide.
              Customize arrays, graphs, and speeds. Pause, play, and learn at your pace.</span>
            </p>
        </div>
    </div>
  )
}

export default Home