import Head from 'next/head'
import { Layout } from '../components'



export default function Home() {
    return (
        <Layout>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <header>
                <nav>

                    {/* 
                    
                        - Home
                        - Shop
                            - [category]
                                -[product]
                        - Contact

                    
                    
                    */}
                </nav>
            </header>

            <section>
                <h1 className="text-5xl text-center text-accent-1">
                    Next.js + Tailwind CSS
                </h1>
            </section>



        </Layout>
    )
}
