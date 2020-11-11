
import react, { useState, useEffect } from 'react'


import { useRouter } from 'next/router';
import { getCustomColor } from './../../utils/custom-colors';
import Router from 'next/router'
import cxs from 'cxs';

const SidebarFilter = ({ filterOptions }) => {

    // console.log("filterrrrrrrr", filterOptions.colors)

    const router = useRouter()

    const [urlColors, setUrlColors] = useState([]);


    const checkBox = cxs({
        width: '13px',
        height: '13px',
        'before': {
            width: '6px',
            borderTopLeftRadius: '1px',
            borderBottomLeftRadius: '1px',
            top: '5px',
            left: '1px',
            transform: 'rotate(49deg) scale(0, 1)',
            content: "",
            height: '2px',
            backgroundColor: 'currentcolor',
            display: 'block',
            position: 'absolute',
            transformOrigin: 'left center',
        },
        ':after': {
            color: 'grey',
            fontSize: '14px'
        }
    })




    const [selectedColorsNumber, setSelectedColorsNumber] = useState("");

    useEffect(() => {
        if (router.query.colors) {
            const activeColors: any = router.query.colors;
            const activeColorsArray = activeColors ? activeColors.split(',') : false;

            setSelectedColorsNumber(activeColorsArray.length)
        }

        if (router.query.category) {
            const activeColors: any = router.query.category;
            // const activeColorsArray = activeColors ? activeColors.split(',') : false;

            // setSelectedColorsNumber(activeColorsArray.length)
        }
    }, [router.query.colors])
    // Get the old url, and replace with new url

    console.log(router.query)

    const changeColor = (clickedColor) => {

        let newQuery;

        const activeColors: any = router.query.colors;
        const activeColorsArray = activeColors ? activeColors.split(',') : false;
        const exist = activeColors ? activeColorsArray.filter(color => color === clickedColor) : false;

        if (exist.length === 0) {
            const b = [...activeColorsArray, clickedColor]
            newQuery = b.join(",")
            Router.push({
                pathname: '/fabrics',
                query: { ...Router.query, colors: newQuery }
            })
        } else if (exist) {
            const newActiveColorsArray = activeColorsArray.filter(colors => colors !== clickedColor)
            newQuery = newActiveColorsArray.join(',')

            Router.push({
                pathname: '/fabrics',
                query: { ...Router.query, colors: newQuery }
            })
        } else {
            Router.push({
                pathname: '/fabrics',
                query: { ...Router.query, colors: clickedColor }
            })
        }

    }

    const onChangeSubCategory = (clickedCategoryName) => {
        let newQuery;
        const activeSubCategories: any = router.query.sub_category;
        const activeSubCategoriesArray = activeSubCategories ? activeSubCategories.split(',') : false;

        const exist = activeSubCategories ? activeSubCategoriesArray.filter(cat => cat === clickedCategoryName) : false;


        console.log("newQuery", router.query.sub_categories)

        // if it exist, take it out
        if (clickedCategoryName === "all") {

            Router.push({
                pathname: '/fabrics',
                query: { ...Router.query, sub_category: "" }
            })
        } else {


            if (exist.length === 0) {
                Router.push({
                    pathname: '/fabrics',
                    query: { ...Router.query, sub_category: clickedCategoryName }
                })
            } else if (exist) {
                const newActiveColorsArray = activeSubCategoriesArray.filter(colors => colors !== clickedCategoryName)
                newQuery = newActiveColorsArray.join(',')

                Router.push({
                    pathname: '/fabrics',
                    query: { ...Router.query, sub_category: newQuery }
                })


            } else {
                Router.push({
                    pathname: '/fabrics',
                    query: { ...Router.query, sub_category: clickedCategoryName }
                })
            }
        }

    }


    if (!filterOptions) {
        return <div>Loading</div>
    }

    return (
        <div>

            <div>
                <h3 className="font-bold py-4">Material Type</h3>
                <div className="flex-wrap py-2 ">

                    <div className="md:flex md:items-center mb-6">
                        <div className=""></div>
                        <label onClick={() => onChangeSubCategory('all')} className="block text-gray-500 font-bold">
                            <input className="mr-2 leading-tight" type="radio" id="sub_category" checked={router.query.sub_category === ""} />
                            <span className="text-sm">
                                All
                            </span>
                        </label>
                    </div>

                    <div className="md:flex md:items-center mb-6">
                        <div className=""></div>
                        <label onClick={() => onChangeSubCategory('cotton')} className="block text-gray-500 font-bold">
                            <input className="mr-2 leading-tight" type="radio" id="sub_category" checked={router.query.sub_category === "cotton"} />
                            <span className="text-sm">
                                Cotton
                            </span>
                        </label>
                    </div>

                    <div className="md:flex md:items-center mb-6">
                        <div className=""></div>
                        <label onClick={() => onChangeSubCategory('jersey')} className="block text-gray-500 font-bold">
                            <input className="mr-2 leading-tight" type="radio" id="sub_category" checked={router.query.sub_category === "jersey"} />
                            <span className="text-sm">
                                Jersey
                            </span>
                        </label>
                    </div>

                </div>
            </div>


            <div>
                <h3 className="py-4">Colors {selectedColorsNumber !== "" ? `(${selectedColorsNumber})` : ""}</h3>

                <div className="flex flex-wrap py-2 ">
                    {
                        filterOptions.dataFilterOptions.colors.map((item, x) =>

                            <div className="w-1/3 cursor-pointer text-center items-center flex flex-col h-16 text-gray-800 hover:text-gray-600">
                                <div
                                    key={item.slug}
                                    onClick={() => changeColor(item.slug)}
                                    style={{
                                        backgroundColor: `${getCustomColor(item.slug)}`, border: "1px solid #e0e0e0"
                                    }}
                                    className="h-8 w-8 relative rounded-full cursor-pointer"

                                >
                                    <div className="checkmark">
                                        <style jsx>{` 
                                            .checkmark {
                                                display: inline-block;
                                                color: rgb(255, 255, 255);
                                                position: absolute;
                                                top: 50%;
                                                left: 50%;
                                                right: unset;
                                                transform: translate3d(-50%, -50%, 0px);
                                                height: 13px;
                                                width: 13px;
                                            }
                                            .checkmark:before,
                                            .checkmark:after {
                                                content: "";
                                                height: 2px;
                                                background-color: ${item.slug === "white" ? 'black' : 'white'};
                                                display: block;
                                                position: absolute;
                                                transform-origin: left center;
                                            }
                                            .checkmark:before {
                                                width: 6px;
                                                border-top-left-radius: 1px;
                                                border-bottom-left-radius: 1px;
                                                top: 5px;
                                                left: 1px;
                                                transform: rotate(49deg) ${router.query.colors && router.query.colors.includes(item.slug) ? "scale(1, 1)" : "scale(0, 1)"};
                                            
                                            }
                                            .checkmark:after {
                                                width: 13px;
                                                border-top-right-radius: 1px;
                                                border-bottom-right-radius: 1px;
                                                top: 10px;
                                                left: 4px;
                                                transform: rotate(-49deg) ${router.query.colors && router.query.colors.includes(item.slug) ? "scale(1, 1)" : "scale(0, 1)"} ;
                                            }       
                                        `}</style>
                                    </div>
                                </div>

                                <span className="text-xs">{item.slug}</span>
                            </div>
                        )
                    }
                </div>


            </div>

        </div>
    )
}

export default SidebarFilter;
