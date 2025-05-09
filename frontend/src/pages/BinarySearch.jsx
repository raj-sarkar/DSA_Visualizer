import React, { useState, useEffect } from 'react'
import SpeedBar from '../components/SpeedBar'
import SearchingNavbar from '../components/SearchingNavbar'
import { motion } from 'framer-motion'
import CustomArray from '../components/CustomArray'
import CodeBlock from '../components/CodeBlock'

const BinarySearch = () => {

    const [speed, setSpeed] = useState(500)
    const [step, setStep] = useState('Step')
    const [highlight, setHighlight] = useState(-1)
    const [key, setKey] = useState(10)
    const [answer, setAnswer] = useState(-1)
    const [range, setRange] = useState([-1, -1])
    const [disabled, setDisabled] = useState(false)
    const [array, setArray] = useState([10, 18, 25, 32, 40])
    const [sortedArray, setSortedArray] = useState([])
    useEffect(() => {
        setHighlight(-1)
        setAnswer(-1)
        setRange([-1, -1])
        setStep('Step')
        const sorted = [...array].sort((a, b) => a - b);
        setSortedArray(sorted);
    }, [array,key])

    const code =
        `
function binarySearch(array,key){
    let low=0,high=array.length-1,mid;
    while(low<=high){
        mid=low+(high-low)/2;
        if(array[mid]==key)
            return mid;
        else if(array[mid]>key)
            high=mid-1;
        else
            low=mid+1;
    }
    return -1;
}
    `
    const sleep = () => new Promise((res) => setTimeout(res, speed))

    const binarySearch = async () => {
        setDisabled(true)
        let low = 0, high = sortedArray.length - 1, mid
        setStep(`low is index ${low} and high is ${high}`)
        await sleep()
        while (low <= high) {
            mid = low + Math.floor((high - low) / 2)
            setRange([low, high])
            await sleep()
            setStep(`middle index is ${mid}`)
            setHighlight(mid)
            await sleep()
            setStep(`Comparing key(${key}) with index${mid}`)
            await sleep()
            if (sortedArray[mid] == key) {
                setAnswer(mid)
                setRange([-1, -1])
                setStep(`key(${key} is present at index ${mid})`)
                setDisabled(false)
                return
            }
            else if (sortedArray[mid] > key) {
                high = mid - 1
                setStep(`mid(${sortedArray[mid]}) is greater than key(${key})`)
                await sleep()
                setStep(`high is index ${high}`)
                await sleep()
            }
            else {
                low = mid + 1
                setStep(`mid(${sortedArray[mid]}) is less than key(${key})`)
                await sleep()
                setStep(`low is index ${low}`)
                await sleep()
            }
        }
        setHighlight(-1)
        setAnswer(-1)
        setRange([-1, -1])
        setStep(`Key(${key}) is not present in the sortedArray`)
        setDisabled(false)
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
                <div className="flex gap-2 h-40 items-end">
                    {sortedArray.map((value, idx) => (
                        <motion.div
                            key={idx}
                            layout
                            transition={{ duration: '0.4', ease: 'easeInOut' }}
                            className={`w-10 text-black text-md font-bold flex justify-center items-end 
                            ${highlight == idx ? 'bg-green-700' : 'bg-indigo-200'}
                            ${answer == idx ? 'bg-orange-400' : ''}
                            ${idx >= range[0] && idx <= range[1] ? '-translate-y-7' : ''}
                            `}
                            style={{ height: `30px` }}
                        >
                            {value}
                            <span className='translate-y-6  absolute'>{idx}</span>
                        </motion.div>
                    ))}
                </div>

                <button
                    onClick={binarySearch}
                    className={`mt-8 px-4 py-2 rounded transition cursor-pointer 
                    ${disabled ? 'bg-slate-300' : 'bg-yellow-400 hover:bg-yellow-500'}`}
                    disabled={disabled}
                >
                    Start Binary Search
                </button>
                <SpeedBar setSpeed={setSpeed} />
            </div>
            <div className="flex flex-col sm:flex-row justify-around">
                <CustomArray setArray={setArray} disabled={disabled} withKey={true} withId={false} setKey={setKey} />
                <CodeBlock code={code} />
            </div>
        </div>
    )
}

export default BinarySearch