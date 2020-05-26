import Link from "next/link";
import { Header, Footer } from ".";

const SiteLayout = ({ children }: any) => (
    <div className="bg-white antialiased">
        <Header />
        {children}
        <Footer />
    </div>
);

export const getLayout = (page: any) => <SiteLayout>{page}</SiteLayout>;

export default SiteLayout;
