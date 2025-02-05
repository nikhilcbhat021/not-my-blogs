import AppBar from '../components/AppBar'
import NewBlog from '../components/NewBlog'

const Publish = () => {

    return (
        <div className='h-dvh w-dvw'>
            <AppBar name={localStorage.getItem('name')} />
            <NewBlog />
        </div>
    )
}

export default Publish