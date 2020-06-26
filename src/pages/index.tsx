import * as React from 'react'
import { NextPage } from 'next'
import { Header, Footer, Hero } from './../components/'


const IndexPage: NextPage = () => {





    return (

        <>
            <Hero
                image="https://cdn.pixabay.com/photo/2016/11/19/08/00/towel-1838210_960_720.jpg"
                title="
                New Adapt 
                OMBRE SEAMLESS"
                subTitle="Confidence that never fades."
                buttonName="Shop"
            />


            {/* In future make it all new releases combined */}
            <div className="py-8 px-8">
                <div className="flex flex-row  justify-between ">
                    <div>
                        <h5 className="uppercase font-bold text-sm">Fabrics</h5>
                        <h4 className="uppercase font-bold text-2xl">New Releases</h4>
                    </div>

                    <div className="font-bold underline justify-end">View All</div>
                </div>

                List of new products

            </div>

        </>

    )
}

export default IndexPage