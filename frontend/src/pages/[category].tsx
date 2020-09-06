import Head from 'next/head'
import { Layout } from '../components'



function Category() {
    return (
        <Layout>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>



            <section>

                <h1 className="text-5xl text-center text-accent-1">
                    Category
                </h1>
            </section>



        </Layout>
    )
}

export default Category;

// get the category name, and fetch it for the productss