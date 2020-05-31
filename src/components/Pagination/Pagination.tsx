import react, { useState, useEffect } from 'react'

import Link from 'next/link';
import { useRouter } from 'next/router';
import Router from 'next/router'

function Pagination({ pages }) {
    const router = useRouter()
    const [currentPage, setPage] = useState(parseInt(router.query.custom_page));

    let pagesArr = [];


    for (let i = 0; i < pages; i++) {
        pagesArr.push(i + 1)
    }


    function nextPage() {
        console.log("next")
        setPage(currentPage + 1)
        Router.push({
            pathname: '/shop',
            query: { ...Router.query, custom_page: currentPage }
        })
    }

    function prevPage() {
        console.log("prev")
        setPage(currentPage - 1)
        Router.push({
            pathname: '/shop',
            query: { ...Router.query, custom_page: currentPage }
        })
    }

    // Show max of 10 pages, last item show to be highest

    return (
        <nav className="relative z-0 inline-flex shadow-sm">
            <div className="flex-1 flex justify-between">
                <a onClick={prevPage} className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150">
                    Previous
                </a>

                {pagesArr.slice(0, 10).map((_, item) => {
                    return (

                        <Link key={_} href={{
                            pathname: '/shop',
                            query: { custom_page: _ }
                        }}>
                            <button onClick={() => setPage(_)} type="button" style={{ backgroundColor: currentPage === _ ? 'grey' : "" }} className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150">
                                {_}
                            </button>
                        </Link>
                    )
                })}

                <button type="button" className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150">
                    ...
                </button>

                <Link href={{
                    pathname: '/shop',
                    query: { custom_page: pages }
                }}>
                    <button type="button" style={{ backgroundColor: currentPage === pages ? 'grey' : "" }} className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150">
                        {pages}
                    </button>
                </Link>

                <a onClick={nextPage} className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150">
                    Next
                </a>
            </div>
        </nav>
    )

}

export default Pagination;