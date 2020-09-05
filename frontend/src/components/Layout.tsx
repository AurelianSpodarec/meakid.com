import Header from "./Header/Header";
import Footer from "./Footer/Footer";

const Layout = ({ children, headerPosition }: any) => (
    <div className="bg-white antialiased">

        <Header />
        <main className="main">{children}</main>
        <Footer />

    </div>
);

export const getLayout = (page: any) => <Layout>{page}</Layout>;

export default Layout;