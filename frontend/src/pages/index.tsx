import Head from 'next/head'
import Link from 'next/link'
import { Layout, Hero } from '../components'



function Index() {
    return (
        <Layout title="Meakid">

            <section>
                <Hero
                    image="/images/towels.jpg"
                    title="
                New Adapt  
                OMBRE SEAMLESS"
                    subTitle="Confidence that never fades."
                    buttonName="Shop"
                    buttonLink="/fabrics"
                />
            </section>

            {/* <section className="container mx-auto px-4 my-8">
                <div>
                    <div>
                        <p>All</p>
                        <h3>New Releases</h3>
                    </div>

                    products
                </div>

                <button>View More</button>
            </section> */}


            {/* <section className="flex container mx-auto my-8">
                <div style={{ backgroundImage: "url('/images/towels.jpg')", minHeight: "250px", maxHeight: "650px" }} className="w-full top-1/2">

                    <h3>Shop Fabrics</h3>
                    <Link href="/fabrics">
                        <a title="Fabrics" className="text-xs md:text-base bg-white hover:bg-gray-100 text-gray-800 font-semibold py-3 px-8 text-xs border border-gray-400 rounded-full shadow">
                            Shop
                        </a>
                    </Link>

                </div>

                <div style={{ backgroundImage: "url('/images/towels.jpg')", minHeight: "250px", maxHeight: "650px" }} className="w-full top-1/2">

                    <h3>Shop Jersey</h3>
                    <Link href="/fabrics">
                        <a title="Fabrics" className="text-xs md:text-base bg-white hover:bg-gray-100 text-gray-800 font-semibold py-3 px-8 text-xs border border-gray-400 rounded-full shadow">
                            Shop
                        </a>
                    </Link>

                </div>
            </section> */}
        </Layout>
    )
}

export default Index;