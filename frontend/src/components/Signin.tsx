import { FormEvent, useState } from 'react'
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import { SignInType, signinInput } from '@nikhilcbhat021/medium-common';


import reactImg from '/react.svg';
import { AuthInputType } from './Constants';
import { LabelledInput, Loading } from './Utils';
import * as configs from '../../config.json';

const Signin = () => {

    const [error, setError] = useState<Array<string>>([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const widthClassnames = 'sm:mx-auto sm:w-full sm:max-w-lg';

    const validations = (body:SignInType) => {
        const result = signinInput.safeParse(body);
        const errMsg: string[] = [];
        if (result.error) {
            result.error?.issues.forEach(issue => {
                errMsg.push(issue.message)
            });
        }

        if (errMsg.length) {
            setError(errMsg);
        }
    }

    const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = new FormData(e.currentTarget);
        const body:SignInType = { email: "", password: "" };

        for (const [key, value] of form.entries()) {
            body[key as keyof SignInType] = value as string;
            console.log(key, value);
        }
        
        validations(body);
        
        try {
            setLoading(true);
            const signinRes = await axios.post(`${configs.backend_url}/auth/signin`, body)
            console.log(signinRes);

            localStorage.setItem('authToken', signinRes.data.token);
            localStorage.setItem('name', signinRes.data.name);

            navigate('/blogs');
        } catch (error) {
            console.error(error);
            const errMsg: string[] = [];
            if (axios.isAxiosError(error)) {
                if (String(error.response?.status).charAt(0) === '4') {
                    errMsg.push(error.response?.data?.error);
                    setError(errMsg);
                } else {
                    console.error("Internal Server Error!!! We are fixing it as we speak.");
                }
            } else {
                console.error("Unexpected error", error);
            }
        } finally {
            setLoading(false);
        }
    }


    return (
        <main className='flex flex-col items-center justify-start min-h-full px-6 py-12 lg:px-8'>
            <div className={`${widthClassnames}`}>
                <img src={reactImg} alt="react img" className='text-2xl font-bold h-20 mx-auto w-auto' />
                <h2 className="my-12 text-center text-4xl font-bold tracking-tight text-gray-900 ">Sign in to your account</h2>
            </div>
            <div className={` w-full mt-10 ${widthClassnames}`}>
                <form action="" method='POST' onSubmit={(e) => handleOnSubmit(e)}
                    className='space-y-6 text-xl flex flex-col'
                >
                    <LabelledInput label='Email address'
                        disabled={loading}
                        // onChange={() => true}
                        name={AuthInputType.email}
                        placeholder='jestchest@yippee.com'
                        type='text'
                    />
                    <LabelledInput label='Password'
                        disabled={loading}
                        // onChange={() => true}
                        placeholder="I'm a Strong PWD"
                        name={AuthInputType.password}
                        type='password'
                    />
                    {
                        (error.length > 0) && (<div className='text flex flex-col align-center justify-center text-center'>
                            {
                                error.map(e => (<div className='text-red-500 text-center'>* {e} *</div>))
                            }
                        </div>)
                    }
                    <div>
                        <button disabled={loading} 
                            className='w-full py-2 text-center px-auto rounded-md bg-blue-600 text-white mt-8 py-3 inline-flex justify-center
                                    disabled:border-gray-200 disabled:bg-blue-300 disabled:text-gray-700 disabled:shadow-none' 
                            type='submit'>
                                <Loading status={loading} />
                                Sign-In
                        </button>
                    </div>
                </form>
            </div>
            <p className='mt-6 text-2xl font-light'>Don't have an account? <NavLink to={`${loading ? '#' : '/signup'}`} 
                className={`font-bold cursor-pointer text-blue-600
                    ${loading && 'cursor-default text-blue-300'} 
                    `
                }
            >Sign-Up</NavLink></p>
        </main>
    )
}

export default Signin