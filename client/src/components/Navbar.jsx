/* eslint-disable react/prop-types */
import { useState } from 'react';
import Lottie from 'lottie-react';

import { getDate, getDay } from "../utils";
import { SelectCountry } from './';
import Newspaper from '../assets/Newspaper.json'
import { Link } from 'react-router-dom';

const Navbar = ({ countryCode, setCountryCode }) => {
    const [active, setActive] = useState('Home')

    return (
        <nav className="bg-[#C4A48433] flex justify-between items-center rounded-tr-md rounded-tl-md relative">
            <div className="dancing-script font-bold text-4xl pl-3 flex items-center">
                <Link className='mt-2' to='/' onClick={() => setActive('Home')}>AI Khabri</Link>
                <Lottie animationData={Newspaper} />
            </div>
            <div className='flex gap-3 ojuju font-medium text-xl'>
                <Link to='/' className={`hover:font-bold ${active === 'Home' && 'font-bold'}`} onClick={() => setActive('Home')}>Home</Link>
                <Link to='/Sports' className={`hover:font-bold ${active === 'Sports' && 'font-bold'}`} onClick={() => setActive('Sports')}>Sports</Link>
                <Link to='/Entertainment' className={`hover:font-bold ${active === 'Entertainment' && 'font-bold'}`} onClick={() => setActive('Entertainment')}>Entertainment</Link>
                <Link to='/Science' className={`hover:font-bold ${active === 'Science' && 'font-bold'}`} onClick={() => setActive('Science')}>Science</Link>
                <Link to='/Technology' className={`hover:font-bold ${active === 'Technology' && 'font-bold'}`} onClick={() => setActive('Technology')}>Technology</Link>
                <Link to='/Business' className={`hover:font-bold ${active === 'Business' && 'font-bold'}`} onClick={() => setActive('Business')}>Business</Link>
            </div>
            <div className='flex items-center gap-2'>
                <SelectCountry countryCode={countryCode} setCountryCode={setCountryCode} />
                <div className="p-2 pr-3 flex flex-col text-sm poppins font-[500] items-center">
                    <p>{getDate()}</p>
                    <p>{getDay()}</p>
                </div>
            </div>
        </nav>
    )
}

export default Navbar