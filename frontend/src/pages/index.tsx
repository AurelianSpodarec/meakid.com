import Head from 'next/head'
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
        </Layout>
    )
}

export default Index;