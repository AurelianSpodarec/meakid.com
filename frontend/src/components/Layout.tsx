const Layout = ({ children, headerPosition }: any) => (
    <div className="bg-white antialiased">

        <main className="main">{children}</main>

    </div>
);

export const getLayout = (page: any) => <Layout>{page}</Layout>;

export default Layout;