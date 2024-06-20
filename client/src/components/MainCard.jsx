/* eslint-disable react/prop-types */
import Common from '../assets/Common.avif'

const MainCard = ({ article, handleClick }) => {
    return (
        <article className="group cursor-pointer a-underline" onClick={() => handleClick(article)}>
            <img
                alt={article?.title}
                src={article?.urlToImage || Common}
                className="h-56 w-full rounded-xl object-cover shadow-xl transition group-hover:grayscale-[30%]"
            />

            <div className="p-4">
                <a>
                    <h3 className="text-lg font-medium text-gray-900 line-clamp-2">{article?.title}</h3>
                </a>

                <p className="mt-2 line-clamp-5 text-justify text-sm/relaxed text-gray-500">
                    {article?.description}
                </p>
            </div>
        </article>
    )
}

export default MainCard