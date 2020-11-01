
import react, { useState, useEffect } from 'react'


import { useRouter } from 'next/router';
import { getCustomColor } from './../../utils/custom-colors';


const SidebarFilter = ({ filterOptions }) => {

    // console.log("filterrrrrrrr", filterOptions.colors)

    const router = useRouter()
    const [urlColors, setUrlColors] = useState([]);




    if (!filterOptions) {
        return <div>Loading</div>
    }

    return (
        <div>

            <div>
                <h3 className="font-bold py-4">Style</h3>
                <div className="flex-wrap py-2 ">

                    <div className="md:flex md:items-center mb-6">
                        <div className=""></div>
                        <label className="block text-gray-500 font-bold">
                            <input className="mr-2 leading-tight" type="checkbox" />
                            <span className="text-sm">
                                Fabrics
                            </span>
                        </label>
                    </div>

                    <div className="md:flex md:items-center mb-6">
                        <div className=""></div>
                        <label className="block text-gray-500 font-bold">
                            <input className="mr-2 leading-tight" type="checkbox" />
                            <span className="text-sm">
                                Uncategorised
                            </span>
                        </label>
                    </div>

                </div>
            </div>


            <div>
                <h3 className="font-bold py-4">Colors</h3>
                <div className="flex flex-wrap py-2 ">
                    {
                        filterOptions.dataFilterOptions.colors.map((item, x) =>

                            <div className="w-1/3 cursor-pointer text-center items-center flex flex-col h-16 text-gray-800 hover:text-gray-600">
                                <div
                                    key={item.slug}
                                    // onClick={() => changeColor(item)}
                                    style={{
                                        backgroundColor: `${getCustomColor(item.slug)}`, border: "1px solid #e0e0e0"
                                    }}
                                    className="h-8 w-8 rounded-full cursor-pointer"

                                >
                                </div>
                                {/* if exist, mark */}
                                {/* {console.log(router.query)} */}

                                {/* {router.query.colors.includes(item.slug) ? "TES" : "no"} */}
                                {/* <span className={`text-xs ${checkBox}`}>{capitalize(item.slug)}</span> */}
                            </div>
                        )
                    }
                </div>

            </div>

        </div >
    )
}

export default SidebarFilter;
