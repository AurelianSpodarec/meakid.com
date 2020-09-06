import Head from 'next/head'
import { Layout } from '../components'



function Index() {
    return (
        <Layout>
            <Head>
                <title>Create Next App</title>
            </Head>

            <section>
                <h1 className="text-5xl text-center text-accent-1">
                    Next.js + Tailwind CSS
                </h1>
            </section>


        </Layout>
    )
}

export default Index;