import { FormEvent, useCallback, useEffect, useState } from 'react'
import reactImg from '/react.svg';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import configs from '../../config.json';
// import sha256 from 'crypto-js/sha256';
import { LabelledInput } from './Utils';
import { SignUpType, signupInput } from '@nikhilcbhat021/medium-common';
import { AuthInputType } from './Constants';

// const useError = () => {
//     const [error, setError] = useState<Array<string>>([]);
//     useEffect(() => {
//         setError(e => ([...e, error]));
//     }, [error])
//     return [error, setError];
// }

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cnfPassword, setCnfPassword] = useState("");
    const [error, setError] = useState<Array<string>>([]);
    const widthClassnames = 'sm:mx-auto sm:w-full sm:max-w-lg';

    const [finalObj, setFinalObj] = useState<SignUpType>({
        email: "",
        password: "",
        name: "",
        // cnfPassword: ""
    })

    useEffect(() => {
        console.log('rendering');
    }, [])

    useEffect(() => {
        console.log(`Signup re-rendered`);
        console.log(finalObj)
    })

    const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = new FormData(e.currentTarget);

        const password = form.get(AuthInputType.password);
        const cnfPassword = form.get(AuthInputType.cnfPassword);

        // console.log({ email, password });
        const body: SignUpType = { email:"", password:"", name:"" };

        for (const [key, value] of form.entries()) {
            if (key !== AuthInputType.cnfPassword) {
                body[key as keyof SignUpType] = value as string;
                console.log(key, value);
            }
        }

        const result = signupInput.safeParse(body);
        console.log(result.error?.issues[0].message);


        const errMsg:string[] = [];
        if (cnfPassword !== password) {
            errMsg.push("password and confirm password do not match");
        }
        if (result.error) {
            result.error?.issues.forEach(issue => {
                errMsg.push(issue.message)
            });
            // errMsg = result.error?.issues[0].message
        }

        if (errMsg.length) {
            setError(errMsg);
        }
    }

    return (
        <main className='flex flex-col items-center justify-start min-h-full px-6 py-12 lg:px-8'>
            <div className={`${widthClassnames}`}>
                <img src={reactImg} alt="react img" className='text-2xl font-bold h-20 mx-auto w-auto' />
                <h2 className="my-12 text-center text-4xl tracking-wide font-bold tracking-tight text-gray-900">Sign up to RandomBlogs.com</h2>
            </div>
            <div className={` w-full mt-10 ${widthClassnames}`}>
                <form action="" method='POST' onSubmit={(e) => handleOnSubmit(e)}
                    className='space-y-6 text-xl flex flex-col'
                >
                    <LabelledInput label='Email address'
                        onChange={useCallback(e => {
                            const name = e.target.name;
                            console.log("set the state here - " + e.target.value);
                            // setFinalObj(f => ({...f, [name]: e.target.value}));
                        }, [])}
                        name={AuthInputType.email}
                        placeholder='jestchest@yippee.com'
                        type='text'
                    />
                    <LabelledInput label='Name'
                        onChange={useCallback(e => {
                            const name = e.target.name;
                            console.log("set the state here - " + e.target.value);
                            // setFinalObj(f => ({...f, [name]: e.target.value}));
                        }, [])}
                        name={AuthInputType.name}
                        placeholder='Jester Chester'
                        type='text'
                    />
                    <LabelledInput label='Password'
                        onChange={useCallback(e => console.log("set the state here - " + e.target.value), [])}
                        placeholder="I'm a Strong PWD"
                        name={AuthInputType.password}
                        type='password'
                    />
                    <LabelledInput label='Confirm Password'
                        onChange={useCallback(e => console.log("set the state here - " + e.target.value), [])}
                        placeholder="I'm a Strong PWD"
                        name={AuthInputType.cnfPassword}
                        type='password'
                    />
                    {
                        (error.length>0) && (<div className='text flex flex-col align-center justify-center text-center'>
                            {
                                error.map(e => (<div className='text-red-500 text-center'>* {e} *</div>))
                            }
                        </div>)
                    }
                    <div>
                        <button className={`w-full py-2 text-center px-auto rounded-md bg-blue-600 text-white py-3 mt-4`} type='submit'>Sign-up</button>
                    </div>
                </form>
            </div>
            <p className='mt-6 text-2xl font-light'>Already have an account? <NavLink to={'/signin'} className='font-bold cursor-pointer text-blue-600'>Sign-In</NavLink></p>
        </main>
    )
}

export default Signup