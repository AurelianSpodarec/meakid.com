import Head from 'next/head';

import Header from "./Header/Header";
import Footer from "./Footer/Footer";

type Props = {
    title?: string;
};

const Layout: React.FunctionComponent<Props> = ({
    children,
    title = 'Meakid',
}) => (
        <div className="bg-white antialiased">

            <Head>
                <title>{title} | Meakid</title>
                <meta name="description" content="UK Fabrics"></meta>
                <meta name="keywords" content="fabrics, sewing" />

                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>

            <Header />
            <main className="main">{children}</main>
            <Footer />

        </div>
    );

export const getLayout = (page: any) => <Layout>{page}</Layout>;

export default Layout;