/* eslint-disable react/prop-types */
import Common from '../assets/Common.avif'

const SideCard = ({ index, article, handleClick }) => {
    return (
        <article
            className="relative block rounded-lg border border-gray-300 p-6 shadow-xl bg-white mb-3 sticky cursor-pointer zoomIn"
            style={{ top: `calc(0px + ${index * 15}px)` }}
            onClick={() => handleClick(article)}
        >
            <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600" ></span>
            <div className="sm:flex sm:justify-between sm:gap-4">
                <div className="hidden sm:block sm:shrink-0">
                    <img
                        alt={article?.title}
                        src={article?.urlToImage || Common}
                        className="size-24 rounded-lg object-cover shadow-sm"
                    />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-gray-900 sm:text-xl line-clamp-2 break-all">
                        {article?.title}
                    </h3>
                    {article?.author && <p className="mt-1 text-xs font-medium text-gray-600 break-all">By {article?.author}</p>}
                </div>
            </div>
            <div className="mt-4">
                <p className="text-justify line-clamp-3 text-sm text-gray-500">
                    {article?.description || article?.content}
                </p>
            </div>
        </article>
    )
}

export default SideCard