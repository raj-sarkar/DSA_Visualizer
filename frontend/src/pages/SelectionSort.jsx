import React, { useEffect, useState } from 'react'
import SortingNavbar from '../components/SortingNavbar'
import CustomArray from '../components/CustomArray'
import CodeBlock from '../components/CodeBlock'
import { motion } from 'framer-motion'
import SpeedBar from '../components/SpeedBar'

const SelectionSort = () => {
    const [speed, setSpeed] = useState(500)
    const [step, setStep] = useState('Step')
    const [highlight, setHighlight] = useState([])
    const [fixed, setFixed] = useState([])
    const [minimum, setMinimum] = useState(-1)
    const [sorting, setSorting] = useState(false)
    const [array, setArray] = useState([
        { id: 0, value: 40 },
        { id: 1, value: 32 },
        { id: 2, value: 18 },
        { id: 3, value: 10 },
        { id: 4, value: 25 },
    ]);

    useEffect(() => {
        setStep('Step')
    }, [array])

    const code = `
    function selectionSort(arr) {
        let n = arr.length;
        for (let i = 0; i < n - 1; i++) {
            let minIndex = i;
            for (let j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIndex]) {
                    minIndex = j;
                }
            }
            if (minIndex !== i) {
                [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
            }
        }
        return arr;
    }
    `

    const selectionSort = async () => {
        setSorting(true)
        const arr = [...array];
        for (let i = 0; i < arr.length - 1; i++) {
            let minIndex = i
            setMinimum(arr[minIndex].id)
            for (let j = i + 1; j < arr.length; j++) {
                setHighlight([arr[j].id, arr[minIndex].id])
                setStep(`Comparing indices ${j} and ${minIndex} `)
                await new Promise((res) => setTimeout(res, speed));
                if (arr[j].value < arr[minIndex].value) {
                    minIndex = j
                    setMinimum(arr[minIndex].id)
                    setStep(`minimum value is at index ${minIndex}`)
                    await new Promise((res) => setTimeout(res, speed));
                }
            }
            if (minIndex !== i) {
                setStep(`Swaping indices ${i} and ${minIndex} `);
                [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
                setArray([...arr]);
                await new Promise((res) => setTimeout(res, speed));
            }
            setFixed((prev) => [...prev, arr[i].id])
        }
        setHighlight([])
        setMinimum(-1)
        setFixed([])
        setStep('Sorted😎')
        setSorting(false)
    };
    return (
        <div>
            <SortingNavbar />
            <div className="flex flex-col items-center mt-5 ">
                <span className='border-b border-indigo-400 p-2 text-2xl text-indigo-700'>{step}</span>
                <div className="flex gap-2 h-64 items-end overflow-hidden">
                    {array.map((bar, idx) => (
                        <motion.div
                            key={bar.id}
                            layout
                            transition={{ duration: '0.4', ease: 'easeInOut' }}
                            className={`w-10 text-black text-md font-bold flex justify-center items-end 
                            ${highlight.includes(bar.id) ? 'bg-green-700' : 'bg-indigo-200'}
                            ${minimum == bar.id ? 'bg-red-600' : ''}
                            ${fixed.includes(bar.id) ? 'bg-orange-400' : ''} `}
                            style={{ height: `${bar.value * 5}px` }}
                        >
                            {bar.value}
                            <span className='translate-y-6  absolute'>{idx}</span>
                        </motion.div>
                    ))}
                </div>

                <button
                    onClick={selectionSort}
                    className={`mt-8 px-4 py-2 rounded transition cursor-pointer 
                        ${sorting ? 'bg-slate-300' : 'bg-yellow-400 hover:bg-yellow-500'}`}
                    disabled={sorting}
                >
                    Start Selection Sort
                </button>
                <SpeedBar setSpeed={setSpeed} />
            </div>
            <div className="flex flex-col sm:flex-row justify-around">
                <CustomArray setArray={setArray} disabled={sorting} />
                <CodeBlock code={code} />
            </div>
        </div>
    )
}

export default SelectionSort