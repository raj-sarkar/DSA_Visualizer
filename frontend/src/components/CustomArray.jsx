import React, { useState } from 'react'

const CustomArray = ({ setArray, withId = true, disabled, withKey = false, setKey }) => {

    const [n, setN] = useState(5)
    const [error, setError] = useState("")
    const [customArrayInput, setCustomArrayInput] = useState([])

    const generateArray = () => {
        const a = []
        for (let i = 0; i < n; i++) {
            if (withId)
                a.push({ id: i, value: Math.floor(Math.random() * 50) })
            else
                a.push(Math.floor(Math.random() * 50))
        }
        setArray([])
        setArray([...a])
    }

    const handleCustomInput = () => {
        const values = customArrayInput.split(',').map((val) => Number(val)).filter((val) => !isNaN(val))
        if (values.length > 15) {
            setError('please provide array with length less than equal to 15')
            return
        }

        const arr = values.map((value, idx) => (withId ? { id: idx, value } : value))
        setArray(arr)
    }
    return (
        <div className="p-4 px-10">
            {withKey &&
                <div className="flex flex-col w-[250px] max-w-md m-auto sm:m-0">
                    <label className=" font-medium block text-slate-600">Enter key</label>
                    <input
                        className="focus:outline-none rounded p-2 shadow-sm focus:shadow-slate-400 "
                        placeholder="eg. 10"
                        onChange={(e) => {
                            if(!e.target.value)setKey(0)
                            else setKey(e.target.value)
                        }}
                    />
                </div>}
            <div className="flex flex-col sm:flex-row gap-4 items-center">
                <div className="w-[250px] max-w-sm relative mt-4">
                    <label className="block mb-1  text-slate-600 font-medium">Enter number of elements</label>
                    <div className="relative">
                        <button
                            id="decreaseButton"
                            className="absolute right-9 top-1 rounded bg-indigo-800 p-1.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-indigo-700 focus:shadow-none active:bg-indigo-700 hover:bg-indigo-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none cursor-pointer"
                            type="button"
                            disabled={n <= 0}
                            onClick={() => setN(n - 1)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="w-4 h-4"
                            >
                                <path d="M3.75 7.25a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Z" />
                            </svg>
                        </button>
                        <input
                            id="amountInput"
                            type="number"
                            value={n}
                            readOnly
                            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-20 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                        <button
                            id="increaseButton"
                            className="absolute right-1 top-1 rounded bg-indigo-800 p-1.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-indigo-700 focus:shadow-none active:bg-indigo-700 hover:bg-indigo-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none cursor-pointer"
                            type="button"
                            onClick={() => setN(n + 1)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="w-4 h-4"
                            >
                                <path
                                    d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z"
                                />
                            </svg>
                        </button>
                    </div>
                    <p className="flex items-center mt-2 text-xs text-slate-400">
                        Adjust the number using the + and - controls.
                    </p>
                </div>
                <button
                    className={` hover:bg-indigo-500 rounded h-fit p-2 mt-4 cursor-pointer ${disabled ? 'bg-slate-300 pointer-events-none' : 'bg-indigo-400'}`}
                    onClick={generateArray}
                    disabled={disabled}
                >
                    Random
                </button>
            </div>
            <div className="mt-5 flex flex-row items-center gap-4">
                <div className="flex flex-col ">
                    <label className=" font-medium block text-slate-600">Enter custom array</label>
                    <input
                        className="max-w-md focus:outline-none rounded p-2 shadow-sm focus:shadow-slate-400 "
                        placeholder="eg. 2,5,1,3,4"
                        onChange={(e) => setCustomArrayInput(e.target.value)}
                    />
                    <span className="text-red-500 text-xs mt-2">{error}</span>
                </div>
                <button
                    className="btn rounded bg-indigo-400 p-2 px-4 h-fit cursor-pointer hover:bg-indigo-500 mt-4"
                    onClick={handleCustomInput}
                >Go</button>
            </div>
        </div>
    )
}

export default CustomArray