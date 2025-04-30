import React from 'react'
import React, { useState } from 'react'

const BinarySearch = () => {

    const [speed,setSpeed]=useState(500)
    const [step,setStep]=useState('Step')
    const [highlight,setHighlight]=useState([])
    const [key,setKey]=useState(10)
    const [answer,setAnswer]=useState([])
    const [disabled,setDisabled]=useState(false)
    const [array, setArray] = useState([40,32,18,10,25])

    const binarySearch=()=>{

    }

  return (
    <div>
            <SearchingNavbar />
            <div className="flex flex-col items-center mt-5 ">
                <span className='border-b border-indigo-400 p-2 text-2xl text-indigo-700'>{step}</span>
                <div className="flex gap-2 h-64 items-end">
                    {array.map((value, idx) => (
                        <motion.div
                            key={idx}
                            layout
                            transition={{ duration: '0.4', ease: 'easeInOut' }}
                            className={`w-10 text-black text-md font-bold flex justify-center items-end 
                            ${highlight==idx ? 'bg-green-700' : 'bg-indigo-200'}
                            ${fixed.includes==idx ? 'bg-orange-400' :''}`}
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
                    Start Linear Search
                </button>
                <SpeedBar setSpeed={setSpeed} />
            </div>
            {/* <div className="flex flex-col sm:flex-row justify-around">
                <CustomArray setArray={setArray} disabled={disabled}/>
                <CodeBlock code={code} />
            </div> */}
        </div>
  )
}

export default BinarySearch