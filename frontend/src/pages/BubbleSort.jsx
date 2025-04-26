import { useState } from "react";
import { motion } from "framer-motion";
import CustomArray from "../components/CustomArray";
import CodeBlock from "../components/CodeBlock";
import SortingNavbar from "../components/SortingNavbar";

const BubbleSort = () => {
  const [step, setStep] = useState('')
  const [highlight, setHighlight] = useState([])
  const [fixed, setFixed] = useState([])
  const [array, setArray] = useState([
    { id: 0, value: 40 },
    { id: 1, value: 32 },
    { id: 2, value: 18 },
    { id: 3, value: 10 },
    { id: 4, value: 25 },
  ]);
  const code = `
const bubbleSort = (arr) => {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
};`

  const bubbleSort = async () => {
    const arr = [...array];
    for (let i = 0; i < arr.length - 1; i++) {
      let j = 0
      for (; j < arr.length - i - 1; j++) {
        setHighlight([arr[j].id, arr[j + 1].id])
        setStep(`Comparing indices ${j} and ${j + 1}`)
        await new Promise((res) => setTimeout(res, 500));
        if (arr[j].value > arr[j + 1].value) {
          setStep(`Swaping indices ${j} and ${j + 1}`);
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
          await new Promise((res) => setTimeout(res, 500));
        }
      }
      setFixed((prev) => [...prev, arr[j].id])
    }
    setHighlight([])
    setFixed([])
    setStep('')
  };

  return (
    <div>
      <SortingNavbar/>
      <div className="flex flex-col items-center mt-10">
        <span>{step}</span>
        <div className="flex gap-2 h-64 items-end">
          {array.map((bar) => (
            <motion.div
              key={bar.id}
              layout
              transition={{ duration: '0.4', ease: 'easeInOut' }}
              className={`w-10 text-black text-md font-bold flex justify-center items-end 
              ${highlight.includes(bar.id) ? 'bg-green-700' : 'bg-indigo-200'}
              ${fixed.includes(bar.id) && 'bg-orange-400'}`}
              style={{ height: `${bar.value * 5}px` }}
            >
              {bar.value}
            </motion.div>
          ))}
        </div>

        <button
          onClick={bubbleSort}
          className="mt-6 px-4 py-2 bg-yellow-400 rounded hover:bg-yellow-500 transition cursor-pointer"
        >
          Start Bubble Sort
        </button>
      </div>
      <div className="flex flex-col sm:flex-row justify-around">
        <CustomArray setArray={setArray} />
        <CodeBlock code={code}/>
      </div>
    </div>
  );
}

export default BubbleSort