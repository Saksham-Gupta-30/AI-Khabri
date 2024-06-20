/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';

const Typewriter = ({ text }) => {
    const [displayText, setDisplayText] = useState('');

    useEffect(() => {
        if (text) { // Check if text is defined
            let currentIndex = 0;
            setDisplayText(text[currentIndex])
            const interval = setInterval(() => {
                if (currentIndex < text.length) {
                    setDisplayText(prevText => prevText + text[currentIndex]);
                    // console.log(text[currentIndex])
                    currentIndex = currentIndex + 1;
                } else {
                    setDisplayText(text);
                    clearInterval(interval);
                }
            }, 30);
            return () => clearInterval(interval);
        }
    }, [text]);

    return <div className='text-justify text-sm/relaxed text-gray-200 p-5 pt-2 font-semibold'>{displayText}</div>;
};

export default Typewriter;
