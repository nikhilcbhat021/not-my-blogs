import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
// import Home from './pages/Home';
import AuthPage from './pages/AuthPage';
import Signin from './components/Signin';
import Signup from './components/Signup';
import About from './pages/About';
import ErrorPage from './pages/Error';
import Blogs from './pages/Blogs';
import Blog from './pages/Blog';
import Publish from './pages/Publish';

function App() {

    return <div className='h-screen bg-white'>
        <BrowserRouter>
            <Routes>
                <Route index element={<Blogs />} />  // '/'
                {/* <Route index element={<Home />} />  // '/' */}
                <Route path="about" element={<About />} /> //   '/about'

                <Route element={<AuthPage />}>
                    <Route path="signin" element={<Signin />} />  //  '/signin'
                    <Route path="signup" element={<Signup />} />    '/signup'
                </Route>

                <Route path="blogs">
                    <Route index element={<Blogs />} />  //  '/blogs'
                    <Route path="bulk" element={<Blogs />} />    //  '/blogs/bulk'
                    <Route path=":id" element={<Blog />} />   //  '/blogs/:city'
                    <Route path="new-story" element={<Publish />} />    //  '/blogs/new-story'
                </Route>
                <Route path="error" element={<ErrorPage />} />  //  '/error'
            </Routes>
        </BrowserRouter>
    </div>
}

export default App
