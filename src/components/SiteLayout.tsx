import Link from "next/link";
import { Header, Footer } from ".";
import Banner from "./Banner/Banner";

const SiteLayout = ({ children }: any) => (
    <div className="bg-white antialiased">
        <Header />
        <Banner />
        {children}
        <Footer />
    </div>
);

export const getLayout = (page: any) => <SiteLayout>{page}</SiteLayout>;

export default SiteLayout;
