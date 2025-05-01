import React, { useEffect, useState } from 'react'
import SortingNavbar from '../components/SortingNavbar'
import CustomArray from '../components/CustomArray'
import CodeBlock from '../components/CodeBlock'
import { motion } from 'framer-motion'
import SpeedBar from '../components/SpeedBar'

const InsertionSort = () => {
  const [speed, setSpeed] = useState(500)
  const [step, setStep] = useState('Step')
  const [highlight, setHighlight] = useState([])
  const [fixed, setFixed] = useState([])
  const [keyBar, setKeyBar] = useState(-1)
  const [sorting,setSorting]=useState(false)
  const [array, setArray] = useState([
    { id: 0, value: 40 },
    { id: 1, value: 32 },
    { id: 2, value: 18 },
    { id: 3, value: 10 },
    { id: 4, value: 25 },
  ]);
  useEffect(()=>{
      setStep('Step')
    },[array])
  const code = `
    function insertionSort(arr) {
      let n = arr.length;
      for (let i = 1; i < n; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
          arr[j + 1] = arr[j];
          j--;
        }
        arr[j + 1] = key;
      }
      return arr;
    }
  `

  const insertionSort = async () => {
    setSorting(true)
    const arr = [...array];
    setFixed((prev) => [...prev, arr[0].id])
    await new Promise((res) => setTimeout(res, speed));
    for (let i = 1; i < arr.length; i++) {
      setKeyBar(arr[i].id)
      setStep(`index ${i} is key`)
      await new Promise((res) => setTimeout(res, speed));
      let key = arr[i]
      let j = i - 1;
      while (j >= 0) {
        setStep(`Comparing indices ${j} and ${i}`)
        setHighlight([arr[j].id])
        await new Promise((res) => setTimeout(res, speed));
        if(arr[j].value <= key.value)break;
        arr[j + 1] = arr[j]
        j--
      }
      setStep(`Inserting index ${i} at ${j+1}`)
      setHighlight([])
      arr[j + 1] = key
      setArray([...arr])
      await new Promise((res) => setTimeout(res, speed));
      setFixed((prev) => [...prev, arr[j + 1].id])
    }
    setHighlight([])
    setFixed([])
    setKeyBar(-1)
    setStep('Sorted😎')
    setSorting(false)
  };
  return (
    <div>
      <SortingNavbar />
      <div className="flex flex-col items-center mt-5 ">
        <span className='border-b border-indigo-400 p-2 text-2xl text-indigo-700'>{step}</span>
        <div className="flex gap-2 h-64 items-end">
          {array.map((bar,idx) => (
            <motion.div
              key={bar.id}
              layout
              transition={{ duration: '0.4', ease: 'easeInOut' }}
              className={`w-10 text-black text-md font-bold flex justify-center items-end 
                ${highlight.includes(bar.id) ? 'bg-green-700' : 'bg-indigo-200'}
                ${fixed.includes(bar.id) && !highlight.includes(bar.id) ? 'bg-orange-500' : ''}
                            ${keyBar == bar.id ? ' bg-red-500 -translate-y-10' : ''} 
                            `}
              style={{ height: `${bar.value * 5}px` }}
            >
              {bar.value}
              <span className='translate-y-6  absolute'>{idx}</span>
            </motion.div>
          ))}
        </div>

        <button
          onClick={insertionSort}
          className={`mt-8 px-4 py-2 rounded transition cursor-pointer 
            ${sorting ? 'bg-slate-300':'bg-yellow-400 hover:bg-yellow-500'}`}          
          disabled={sorting}
        >
          Start Insertion Sort
        </button>
        <SpeedBar setSpeed={setSpeed} />
      </div>
      <div className="flex flex-col sm:flex-row justify-around">
        <CustomArray setArray={setArray} disabled={sorting}/>
        <CodeBlock code={code} />
      </div>
    </div>
  )
}

export default InsertionSort