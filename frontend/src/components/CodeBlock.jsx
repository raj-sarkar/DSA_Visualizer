import { useState } from "react";

const CodeBlock = ({code}) => {

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
        } catch (err) {
            console.log(err)
        }
    };

    return (
        <div className="max-w-full sm:max-w-2xl relative bg-gray-900 text-white p-4 rounded-md overflow-x-auto mt-6 pr-10 mx-2">
            <button
                onClick={handleCopy}
                className="sticky  top-2 left-2 bg-indigo-400 px-3 py-1 rounded text-sm hover:bg-indigo-500 cursor-pointer"
            >
                Copy
            </button>
            <pre>
                <code>{code}</code>
            </pre>
        </div>
    );
};

export default CodeBlock;
