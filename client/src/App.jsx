// Import from node_modules
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// User Defined Imports
import { Navbar, Main } from './components';

// Style Imports
import './App.css';

const App = () => {
    const [countryCode, setCountryCode] = useState('in')
    // const navigate = useNavigate()

    useEffect(() => {
        console.log('Country Code:', countryCode)
        // navigate(`/${countryCode}`)
    }, [countryCode])

    return (
        <BrowserRouter>
            <div className='bg-white p-7 h-[100vh] w-[100vw]'>
                <div className='bg-[#FFFFED77] h-full w-full shadow-2xl rounded-md flex flex-col'>
                    <Navbar countryCode={countryCode} setCountryCode={setCountryCode} />
                    <Routes>
                        <Route path='/' element={<Main countryCode={countryCode} category='general' />} />
                        <Route path='/Sports' element={<Main countryCode={countryCode} category='sports' />} />
                        <Route path='/Entertainment' element={<Main countryCode={countryCode} category='entertainment' />} />
                        <Route path='/Science' element={<Main countryCode={countryCode} category='science' />} />
                        <Route path='/Technology' element={<Main countryCode={countryCode} category='technology' />} />
                        <Route path='/Business' element={<Main countryCode={countryCode} category='business' />} />
                        <Route path='*' element={<Navigate to='/' />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    )
}

export default App