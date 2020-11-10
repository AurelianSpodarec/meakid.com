import Link from "next/link";
import ProductItem from "./sub-components/ProductItem/ProductItem";

import { useRouter } from 'next/router'
import Router from 'next/router'

const ProductListing = ({ data, productListStatus, pagination = true, container = true, row }: any) => {


    const router = useRouter()

    let currentPage = router.query.page ? Number(router.query.page) : 1;
    const lastPage = Math.ceil(data.totalProducts / 9);


    function renderProductList() {
        if (productListStatus === 'fetching') {
            return [...Array(9)].map((x, i) => {
                return <ProductItem key={i} row={row} productListStatus={productListStatus} />
            })
        } else if (productListStatus === 'success') {
            return data && data.products.map(product => {
                return <ProductItem key={product.slug} row={row} product={product} productListStatus={productListStatus} />
            })
        } else if (productListStatus === 'failure') {
            return <h1>No Products found ;-(</h1>
        }
    }

    function renderPrevPageNumber() {
        let prevPageNumber = currentPage - 1;

        if (currentPage !== 1) {
            console.log("swewewewe")
            return (
                <div onClick={() => goToPage(prevPageNumber)}>
                    {currentPage - 1}
                </div>
            )
        }
    }

    function renderNextPageNumber() {
        let nextPageNumber = currentPage + 1
        if (currentPage !== lastPage) {
            return (
                <div onClick={() => goToPage(nextPageNumber)}>
                    {currentPage + 1}
                </div>
            )
        }
    }

    function goToNextPage() {
        console.log(currentPage + 1, currentPage)
        Router.push({
            pathname: '/fabrics',
            query: { ...Router.query, page: currentPage + 1 }
        })
    }

    function goToPrevPage() {
        console.log(currentPage - 1, currentPage)
        Router.push({
            pathname: '/fabrics',
            query: { ...Router.query, page: currentPage - 1 }
        })
    }

    function goToPage(pageNumber) {
        Router.push({
            pathname: '/fabrics',
            query: { ...Router.query, page: parseInt(pageNumber) }
        })
    }

    console.log(router)

    return (

        <div className={`${container ? 'container mx-auto' : ""} px-5 `}>
            <div className="flex flex-wrap">
                {renderProductList()}
            </div>
            {/* pagination */}

            {pagination ?
                <div className="flex justify-between">
                    {/* if page is non existent or page = 1, don't display this */}

                    <div onClick={() => goToPrevPage()}>
                        {currentPage == 1 ? "" : "Prev"}
                    </div>

                    <div onClick={() => goToPage(1)}>
                        1
                </div>
                    <div>
                        ...
                </div>
                    <div className="flex">
                        <div className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150">
                            {renderPrevPageNumber()}
                        </div>
                        <div className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150">
                            {currentPage}
                        </div>
                        <div className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150">
                            {renderNextPageNumber()}
                        </div>
                    </div>
                    <div>
                        ...
                </div>
                    <div onClick={() => goToPage(lastPage)}>
                        {lastPage}
                    </div>

                    <div onClick={() => goToNextPage()}>
                        {currentPage == lastPage ? "" : "Next"}
                    </div>
                </div>
                : ""}
        </div>
    )
};

export default ProductListing;