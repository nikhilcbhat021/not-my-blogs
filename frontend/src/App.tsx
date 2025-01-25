import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import Home from './pages/Home';
import AuthPage from './pages/AuthPage';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Blog from './pages/Blog';
import About from './pages/About';

function App() {
    const [count, setCount] = useState(0);


    return <div className='h-screen bg-white'>
        <BrowserRouter>
            <Routes>
                <Route index element={<Home />} />  // '/'
                <Route path="about" element={<About />} /> //   '/about'

                <Route element={<AuthPage />}>
                    <Route path="signin" element={<Signin />} />  //  '/signin'
                    <Route path="signup" element={<Signup />} />    '/signup'
                </Route>

                <Route path="blog">
                    {/* <Route index element={<Blog />} />  //  '/blog' */}
                    <Route path=":id" element={<Blog />} />   //  '/blog/:city'
                    <Route path="bulk" element={<Blog all={true} />} />    //  '/blog/bulk'
                </Route>
            </Routes>
        </BrowserRouter>
    </div>
}

export default App
