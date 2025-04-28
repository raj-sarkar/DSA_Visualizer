import React, { useState } from 'react'

const SpeedBar = ({setSpeed}) => {

    const [current,setCurrent]=useState(1)
    const speeds=[
        {value:0.5,ms:750},
        {value:0.75,ms:625},
        {value:1,ms:500},
        {value:1.25,ms:375},
        {value:1.5,ms:250}
    ]
    return (
        <div className="flex flex-wrap items-center gap-4 ml-2 mt-8 max-w-sm">
            <span className="text-sm font-medium">Speed:</span>

            <div className="flex gap-2 bg-gray-100 p-2 rounded-full shadow-inner">
                {speeds.map((speed) => (
                    <button
                        key={speed.value}
                        className={`px-3 py-1 rounded-full text-sm font-semibold text-gray-700 hover:bg-indigo-400 hover:text-white transition cursor-pointer ${current===speed.value ? 'bg-indigo-400':''} `}
                        onClick={()=>{
                            setCurrent(speed.value)
                            setSpeed(speed.ms)
                        }}
                    >
                        {speed.value}x
                    </button>
                ))}
            </div>
        </div>

    )
}

export default SpeedBar