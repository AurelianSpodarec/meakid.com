import react, { useState, useEffect } from 'react';

import Head from 'next/head'
import { useRouter } from 'next/router'

import { Layout } from '../../../components';
import WooCommerce from '../../../services/meakid-wordpress/config_meakid_woocommerce';


// import WooCommerce from '../services/meakid-wordpress/config_meakid_woocommerce';

function ProductSlug({ data }) {

    console.log("product", data)
    let product = data;

    return (
        <Layout title={"d"}>
            <section style={{ maxWidth: '1440px' }} className="mx-auto lg:px-12 lg:py-16">
                <div className="block lg:flex">
                    s
                </div>


            </section>


        </Layout>
    )
}


export async function getServerSideProps(context) {
    const res = await WooCommerce.get(`product/slug=${context.query.productSlug}`)
    const data = await res.data;
    return { props: { data } }
}

export default ProductSlug;



// export async function getStaticPaths() {
//     const posts = await getPosts();

//     const paths = posts.map(post => ({
//         params: {
//             category: post.category_name,
//             post: post.slug
//         }
//     }));

//     return {
//         paths,
//         fallback: true
//     }

// }

// export async function getStaticProps({ params }) {
//     const postData = await getPostBySlug(params.post);
//     return { props: { postData } }
// }

// export default Insight;