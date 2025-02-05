import { useLocation } from 'react-router-dom'

const ErrorPage = () => {

    const location = useLocation();
    const error = location.state.error;

    return (
        <div className='h-dvh w-dvw flex flex-col justify-center items-center gap-8 text-6xl font-semibold text-red-800'>{error}</div>
    )
}

export default ErrorPage