/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import { GoogleGenerativeAI } from '@google/generative-ai';
import Lottie from "lottie-react";

import { Link } from "../assets";
import Common from '../assets/Common.avif'
import { Typewriter } from ".";
import circleLoader from "../assets/circleLoader.json";
import dotLoader from '../assets/dotLoader.json'

const Popup = ({ article, setModalOpen }) => {
    const [text, setText] = useState('')
    const [summary, setSummary] = useState('')
    const [loading, setLoading] = useState(true)
    const [summaryLoading, setSummaryLoading] = useState(true)
    const genAI = new GoogleGenerativeAI(`${import.meta.env.VITE_GEMINI_API}`)
    // console.log(article)

    useEffect(() => {
        const getData = async () => {
            const options = {
                method: 'GET',
                url: 'https://extract-news.p.rapidapi.com/v0/article',
                params: {
                    url: article.url
                },
                headers: {
                    'X-RapidAPI-Key': `${import.meta.env.VITE_EXTRACT_NEWS_API}`,
                    'X-RapidAPI-Host': 'extract-news.p.rapidapi.com'
                }
            };

            try {
                const res = await axios.request(options);
                setText(res.data.article.text);
                // setText(`Benchmark indices the Nifty and the Sensex trimmed opening gains to close marginally higher on March 4 on buying in energy and infra names. Tracking gains in the US and Asian markets, the Sensex closed 66.14 points or 0.09 percent up at 73,872, and the Nifty ended 27.20 points or 0.12 percent higher at 22,405.

                // About 1,350 shares advanced, 2,462 declined, and 120 were unchanged. In the broader market, indices closed mixed. The BSE midcap index ended marginally higher and the BSE smallcap closed in the red.
                
                // In the absence of any major event, market participants will continue to take cues from the global indices, Federal Reserve boss Jerome Powell's congressional testimony and China's National People's Congress.
                
                // The US' tech-heavy index Nasdaq Composite touched a fresh record high on March 1 after over two years and that may provide the needed trigger for an up move in IT counters in India as well, said analysts.`)
                setLoading(false)
            } catch (error) {
                console.error(error);
                setSummary('Error fetching summary')
            }
        }
        getData()
    }, [])

    useEffect(() => {
        const generateSummary = async () => {
            if (text !== '') {
                try {
                    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
                    const prompt = `${text} -> Summary in 60 to 70 words and start directly with the first word of the sentence.`;
                    const result = await model.generateContent(prompt);
                    const response = result.response;
                    const summaryText = response.text();
                    // console.log(summaryText);
                    setSummary(summaryText);
                    // setSummary(`Despite initial gains, the Sensex and Nifty ended the day higher on March 4 due to buying in energy and infrastructure stocks. The broader market witnessed mixed performance, with midcaps rising slightly while smallcaps declined. In the absence of significant events, investors will monitor global indices, Jerome Powell's testimony, and China's National People's Congress for cues. Nasdaq's record high may trigger gains in Indian IT stocks.`)
                    setSummaryLoading(false);
                } catch (error) {
                    console.error(error);
                    setSummary('Error generating summary');
                    setSummaryLoading(false);
                }
            }
        };

        generateSummary();
    }, [text]);

    return (
        <>
            <div className="left-0 right-0 bottom-0 top-0 bg-[#11111199] fixed"></div>
            <div className="border-2 border-gray-900 bg-[#000000AA] absolute inset-0 mt-10 mb-10 m-20 rounded-md flex" style={{
                animation: 'dropBottom 0.2s linear',
            }}>
                <button onClick={() => {
                    setModalOpen(false)
                    setText('')
                }} className="absolute right-[-15px] top-[-15px] flex">
                    <div className="bg-red-500 w-8 h-8 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                </button>
                <div className="flex flex-col p-5 w-[80%]">
                    <div className="tilt-box-wrap">
                        <span className="t_over"></span>
                        <span className="t_over"></span>
                        <span className="t_over"></span>
                        <span className="t_over"></span>
                        <span className="t_over"></span>
                        <span className="t_over"></span>
                        <span className="t_over"></span>
                        <span className="t_over"></span>
                        <span className="t_over"></span>
                        <img
                            alt={article?.title}
                            src={article?.urlToImage || Common}
                            className="rounded-t-md w-full h-96 object-cover tilt-box"
                        />
                    </div>
                    <div className="h-full border-t-0 border rounded-bl-md rounded-br-md mt-0 m-3 flex flex-col overflow-auto overflow-x-none scrollBar">
                        <p className="bg-gradient-to-r from-red-600 via-blue-500 to-red-400 inline-block text-transparent bg-clip-text poppins ml-5 mt-4 font-bold">Summary By AI</p>
                        {
                            summaryLoading ? <div className="flex justify-center">
                                <Lottie animationData={dotLoader} className="w-24" />
                            </div>
                                : <Typewriter text={summary} />
                        }
                    </div>
                </div>
                <div className="w-full p-3 overflow-auto overflow-x-none scrollBar border-2 m-3 rounded-md border-white-300">
                    <h1 className="text-wrap text-justify text-gray-400 text-lg/relaxed font-bold">{article.title}</h1>
                    <a className="bg-gradient-to-r from-red-600 via-blue-500 to-red-400 inline-block text-transparent bg-clip-text poppins ml-5 mt-2 font-bold flex gap-3 flex justify-between" href={article.url} target="_blank">
                        <div className="flex">
                            Full Article
                            <img src={Link} alt="link" className="bg-transparent w-3 ml-3" />
                        </div>
                        <div>
                            <p className="text-gray-300 mr-5">{article.author ? `By ${article.author}` : ''}</p>
                        </div>
                    </a>
                    {loading ? <div className="flex justify-center">
                        <Lottie animationData={circleLoader} className="w-24" />
                    </div>
                        : <pre className="text-justify text-wrap text-sm/relaxed text-gray-300 p-5 pt-2">{text}</pre>
                    }
                </div>
            </div>
        </>
    )
}

export default Popup