import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'

const ErrorPage = () => {

    const location = useLocation();
    const error = location.state.error;
    const redirect = location.state.redirect;
    const navigate = useNavigate();

    useEffect(() => {
        let timeoutId=0;
        if (redirect) {
            timeoutId = setTimeout(() => {
                navigate(redirect);
            }, 1000);
        }
        return () => {
            clearTimeout(timeoutId);
        }
    }, [])

    return (
        <>
            <div className='h-dvh w-dvw flex flex-col justify-center items-center gap-8 text-6xl font-semibold text-red-800'>
                {error}
                {
                    redirect && <div>Redirecting...</div>
                }
            </div>
        </>
    )
}

export default ErrorPage