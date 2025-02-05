import { ChangeEvent, memo, useEffect } from "react";

interface LabelledInput {
    label: string;
    name: string;
    // onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    type?: string;
    disabled?:boolean;
}

interface ControlledLabelledInput extends LabelledInput {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const random3digNum = () => {
    let rand = '', d = 0;
    while (d < 3) {
        rand += Math.floor(Math.random() * 10);
        d++;
    }

    return rand;
}

/**
 * This is an uncontrolled input type, since its not efficient to create a component
 * that re-renders for every input.
 * 
 * We use FormData to get all the values in onSubmitHandler.
 * If you want to check strength of password as the user types, we have to use a controlled component.
 */
export const LabelledInput = memo(({label, name, type="text", placeholder="", disabled=false}: LabelledInput) => {
    const randomid = random3digNum();
    // const [input, setInput] = useState("");

    useEffect(() => {
        // console.log('LabelledInput re-rendered');
    })

    return (
        <div className="w-full">
            <label htmlFor={label} className={`flex flex-row justify-between ${disabled ? 'text-gray-400' : 'text-gray-900'}`}>
                {label}
            </label>
            <input 
                // value={input} 
                onChange={() => {
                        // setInput(e.target.value);
                        console.log("previously was calling the onchange function passed as arg, now using a diff component for that.");
                    }
                }
                disabled={disabled}
                id={`${name}_${randomid}`}
                name={name}
                type={type}
                required
                placeholder={placeholder}
                className={`block w-full rounded-md bg-white px-3 py-2 mt-2
                                outline outline-1 -outline-offset-1 outline-gray-300 
                                focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 
                                placeholder:text-gray-400 text-lg
                                ${disabled && 'border-gray-200 bg-gray-50 text-gray-400 shadow-none'}
                                text-gray-900
                            `}
            />
        </div>
    )
})

export const ControlledLabelledInput = memo(({label, onChange, value, name, type="text", placeholder="", disabled=false}: ControlledLabelledInput) => {
    const randomid = random3digNum();
    // const [input, setInput] = useState("");

    useEffect(() => {
        // console.log('LabelledInput re-rendered');
    })

    return (
        <div className="w-full">
            <label htmlFor={label} className={`flex flex-row justify-between ${disabled ? 'text-gray-400' : 'text-gray-900'}`}>
                {label}
            </label>
            <input 
                value={value}
                onChange={e => {
                        // setInput(e.target.value);
                        onChange(e);
                    }
                }
                disabled={disabled}
                id={`${name}_${randomid}`}
                name={name}
                type={type}
                required
                placeholder={placeholder}
                className={`block w-full rounded-md bg-white px-3 py-2 mt-2
                                outline outline-1 -outline-offset-1 outline-gray-300 
                                focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 
                                placeholder:text-gray-400 text-lg
                                ${disabled && 'border-gray-200 bg-gray-50 text-gray-400 shadow-none'}
                                text-gray-900
                            `}
            />
        </div>
    )
})

export const Loading = memo(({status}:{status:boolean}) => {
    return (
        status && (
            <div>
                <svg aria-hidden="true" role="status" className="inline self-center w-6 h-6 me-3 animate-spin text-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                </svg>
            </div>
        )
    )
})

export const Circle = memo(() => {
    return (
        <div className="h-1 w-1 bg-gray-400 rounded-full self-center"></div>
    )
})

export const Avatar = memo(({
    name, 
    size="small"
}:{
    name:string|null,
    size?:"small"|"big"
}) => {
    return <div className={`
        ${size === "small" ? 'w-8 h-8 p-5 text-xl' : 'w-12 h-12 p-6 text-2xl'}
        bg-green-700 text-white rounded-full flex items-center justify-center
    `}>
        <span className="leading-none flex items-center justify-center h-full align-baseline">{(name||"A").charAt(0).toUpperCase()}</span>
    </div>
})


export const Pill = ({ children }: { children: string }) => {
    return (
        <span className='bg-gray-200 text-gray-900 rounded-full px-4 py-2 text-xl text-center'>{children}</span>
    )
}