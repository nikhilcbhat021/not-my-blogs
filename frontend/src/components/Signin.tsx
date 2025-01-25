import { FormEvent, useCallback, useState } from 'react'
import reactImg from '/react.svg';
import { NavLink } from 'react-router-dom';
import { SignInType, signinInput } from '@nikhilcbhat021/medium-common';
import { AuthInputType } from './Constants';
import { LabelledInput } from './Utils';

const Signin = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<Array<string>>([]);

    const widthClassnames = 'sm:mx-auto sm:w-full sm:max-w-lg';


    const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = new FormData(e.currentTarget);

        const password = form.get(AuthInputType.password);

        // console.log({ email, password });
        const body: SignInType = { email: "", password: "" };

        for (const [key, value] of form.entries()) {
            body[key as keyof SignInType] = value as string;
            console.log(key, value);
        }

        const result = signinInput.safeParse(body);
        console.log(result.error?.issues[0].message);


        const errMsg: string[] = [];
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
                <h2 className="my-12 text-center text-4xl font-bold tracking-tight text-gray-900 ">Sign in to your account</h2>
            </div>
            <div className={` w-full mt-10 ${widthClassnames}`}>
                <form action="" method='POST' onSubmit={(e) => handleOnSubmit(e)}
                    className='space-y-6 text-xl flex flex-col'
                >
                    <LabelledInput label='Email address'
                        onChange={() => true}
                        name={AuthInputType.email}
                        placeholder='jestchest@yippee.com'
                        type='text'
                    />
                    <LabelledInput label='Password'
                        onChange={() => true}
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
                        <button className='w-full py-2 text-center px-auto rounded-md bg-blue-600 text-white mt-8 py-3' type='submit'>Sign-In</button>
                    </div>
                </form>
            </div>
            <p className='mt-6 text-2xl font-light'>Don't have an account? <NavLink to={'/signup'} className='font-bold cursor-pointer text-blue-600'>Sign-Up</NavLink></p>
        </main>
    )
}

export default Signin