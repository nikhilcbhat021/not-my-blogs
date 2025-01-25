import { ChangeEvent, memo, useEffect, useState } from "react";

interface LabelledInput {
    label: string;
    name: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    type?: string;
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
export const LabelledInput = memo(({label, onChange, name, type="text", placeholder=""}: LabelledInput) => {
    const randomid = random3digNum();
    // const [input, setInput] = useState("");

    useEffect(() => {
        console.log('LabelledInput re-rendered');
    })

    return (
        <div>
            <label htmlFor={label} className="flex flex-row justify-between text-gray-900">
                {label}
            </label>
            <input 
                // value={input} 
                onChange={e => {
                        // setInput(e.target.value);
                        onChange(e);
                    }
                }
                id={`${name}_${randomid}`}
                name={name}
                type={type}
                required
                placeholder={placeholder}
                className="block w-full rounded-md bg-white px-3 py-2 text-gray-900 mt-2
                                outline outline-1 -outline-offset-1 outline-gray-300 
                                focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 
                                placeholder:text-gray-400 text-lg"
            />
        </div>
    )
})