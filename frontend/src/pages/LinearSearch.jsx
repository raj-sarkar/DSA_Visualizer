import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import SearchingNavbar from '../components/SearchingNavbar'
import SpeedBar from '../components/SpeedBar'
import CustomArray from '../components/CustomArray'
import CodeBlock from '../components/CodeBlock'

const LinearSearch = () => {

    const [speed, setSpeed] = useState(500)
    const [step, setStep] = useState('Step')
    const [highlight, setHighlight] = useState(-1)
    const [key, setKey] = useState(10)
    const [answer, setAnswer] = useState(-1)
    const [disabled, setDisabled] = useState(false)
    const [array, setArray] = useState([40, 32, 18, 10, 25])

    useEffect(() => {
        setHighlight(-1)
        setAnswer(-1)
        setStep('Step')
    }, [array,key])

    const code =
        `
function linearSearch(array,key){
    const n=array.length;
    for(let i=0;i<n;i++){
        if(array[i]==key)
            return i;
    }
    return -1;
}
`
    const linearSearch = async () => {
        setDisabled(true)
        const n = array.length;
        for (let i = 0; i < n; i++) {
            setStep(`Comparing key(${key}) with index ${i}`)
            setHighlight(i)
            await new Promise((res) => setTimeout(res, speed))
            if (array[i] == key) {
                setAnswer(i)
                await new Promise((res) => setTimeout(res, speed))
                setStep(`Key(${key}) is present at index ${i}`)
                setDisabled(false)
                return
            }
        }
        setStep(`key(${key}) is not present in the array`)
        setHighlight(-1)
        setDisabled(false)
        return -1;
    }

    return (
        <div>
            <SearchingNavbar />
            <div className="flex flex-col items-center mt-5 ">
                <span className='border-b border-indigo-400 p-2 text-2xl text-indigo-700'>{step}</span>
                <div className='flex flex-row items-center gap-2 m-2 p-2'>
                    <span className='font-medium block text-slate-600'>Key : </span>
                    <div className='bg-indigo-300 p-2 px-4 font-bold text-md'>{key}</div>
                </div>
                <div className="flex gap-2 h-30 items-end">
                    {array.map((value, idx) => (
                        <motion.div
                            key={idx}
                            layout
                            transition={{ duration: '0.4', ease: 'easeInOut' }}
                            className={`w-10 text-black text-md font-bold flex justify-center items-end 
                            ${highlight == idx ? 'bg-green-700' : 'bg-indigo-200'}
                            ${answer == idx ? 'bg-orange-400' : ''}`}
                            style={{ height: `30px` }}
                        >
                            {value}
                            <span className='translate-y-6  absolute'>{idx}</span>
                        </motion.div>
                    ))}
                </div>

                <button
                    onClick={linearSearch}
                    className={`mt-8 px-4 py-2 rounded transition cursor-pointer 
                    ${disabled ? 'bg-slate-300' : 'bg-yellow-400 hover:bg-yellow-500'}`}
                    disabled={disabled}
                >
                    Start Linear Search
                </button>
                <SpeedBar setSpeed={setSpeed} />
            </div>
            <div className="flex flex-col sm:flex-row justify-around">
                <CustomArray setArray={setArray} withId={false} disabled={disabled} withKey={true} setKey={setKey} />
                <CodeBlock code={code} />
            </div>
        </div>
    )
}

export default LinearSearch