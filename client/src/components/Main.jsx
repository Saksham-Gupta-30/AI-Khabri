/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import axios from 'axios';
import Lottie from 'lottie-react';

import circleLoader from '../assets/circleLoader.json'
import { SideCard, MainCard, Popup } from './';
// import { sample } from '../api/sample'

const Main = ({ countryCode, category }) => {
    const [articles, setArticles] = useState([])
    const [currentArticle, setCurrentArticle] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/news`, {
                    params: {
                        countryCode: countryCode,
                        category: category
                    }
                });
                setArticles(response.data.articles);
            } catch (error) {
                alert('Error fetching data');
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [countryCode, category]);

    const handleClick = (article) => {
        setCurrentArticle(article)
        setModalOpen(true)
    }

    return (
        <>
            {
                loading === true ? <div className="flex m-auto h-screen w-24">
                    <Lottie animationData={circleLoader} />
                </div >
                    : <div className="flex flex-1 p-3 overflow-hidden">
                        <div className="w-[60%] pr-3">
                            <MainCard article={articles[0]} handleClick={handleClick} />
                        </div>
                        <div className="border-black border"></div>
                        <div className="pl-3 flex-1 article-container overflow-auto m-4">
                            {articles.slice(1).map((article, index) => (
                                <SideCard key={index} index={index} article={article} handleClick={handleClick} />
                            ))}
                        </div>
                        {modalOpen && <Popup article={currentArticle} setModalOpen={setModalOpen} />}
                    </div>
            }
        </>
    )
}

export default Main