<?php
/**
  * Plugin Name: Meakid
  * Plugin URI:  
  * Description: Custom REST endpoints for Meakid
  * Version: 0.1.0
  * Author: Aurelian Spodarec
  * Author URI: aurelianspodarec.co.uk
  *
  * @package Meakid
  */


  ///////////////////////////////////////////////////
//
// Get Products by Slug
//
///////////////////////////////////////////////////

function getProductBySlug( $slug ) {
    global $product;

    $args = array (
        'post_type' => 'product',
        'name' => $slug['slug']
    );

    $post = get_posts($args);
    $product = wc_get_product( $post[0]->ID );

    $res = [];

    if($product->has_child()) {
        $variations = $product->get_available_variations();
    } else {
        $variations = [];
    }

    $attachment_ids[0] = get_post_thumbnail_id( $product->get_id() );
    $attachment        = wp_get_attachment_image_src($attachment_ids[0], false )[0];

    array_push($res , [
        'id' => $product->get_id(),
        'name' => $product->get_name(),
        'price' => $product->get_price(),
        'featured_image' => $attachment,

        'regular_price' => $product->get_regular_price(),
        'sale_price' => $product->get_sale_price(),
        'sale_from' => $product->get_date_on_sale_from(),
        'sale_to' => $product->get_date_on_sale_to(),

        'stock_quantity' => $product->get_stock_quantity(),
        
        'colors' => array($product->get_attribute( 'colors' )),
        'images' => $product->get_image(),
        // 'variations' => $product->get_children(),
        "variations" => $variations,
    ]);
      

    if ( empty( $post ) ) {
        return null;
    }
    return $res;
 
}



///////////////////////////////////////////////////
//
// Get Products List
//
///////////////////////////////////////////////////
function getProductsList( $args ) {
    global $product;


    $offset = 0;
    $limit = 9;
    $orderby = 'date';
    $order = 'DESC';
    

    if ( isset( $args['category'])) {
        $category_slug = $args['category'];
    }

    if ( isset( $args['page'])) {
        $custom_page = $args['page'];
    } else {
        $custom_page = 1;
    }

    if ( isset( $args['colors']) && !empty( $args['colors'])) {
        $custom_colors = explode(',', $args['colors']);
        $custom_operator = "IN"; 
    } else {
        $custom_colors = '';
        $custom_operator = "OUT"; 
    }

    if ( isset( $args['price'])) {
        $min_price = intval($args['price']['min']);
        $max_price = intval($args['price']['max']);
    } else {
        $min_price = 0;
        $max_price = 99999;
    };


    $query = new WC_Product_Query( array(
        'page' => $custom_page,
        'limit' => $limit,
        // 'paginate' => true,
        'orderby' => $orderby,
        'order' => $order,
        'price_between' => array($min_price, $max_price),
        'tax_query' => array( 
            array(
                'taxonomy'      => 'pa_color',
                'field'         => 'slug',
                'terms'         => $custom_colors,
                'operator'      => $custom_operator
            ),
        ),
        'product_cat' => $category_slug,
        'return' => 'ids',
    ) ); 
    $products = $query->get_products();


    $productResults = array(
        "totalProducts"    => $products->total,
        // "totalPages" => floor(($limit / $products->total) * 10),
        "page"     => $custom_page,
        "products" => [],
        "response" => "ok",
        "status" => 200,
      
    );

    // TODO: If there is a variation, set the featured image to be first image of the variation image
    // e.g. featured image, if variation exist, set the first variation image as featured image and send the response


    if ( !empty($products)) :
        foreach($products as $productID) :
            
            $attachment_ids[0] = get_post_thumbnail_id( $productID );
            $attachment        = wp_get_attachment_image_src($attachment_ids[0], false );
            $custom_product    = wc_get_product($productID);
            

            $product_variation = [];


            if($custom_product->has_child()) {   

                $variations = $custom_product->get_available_variations();
                $custom_variations = $product_variation;
                $color = "";

                $variationPrice = [
                    'min' => $custom_product->get_variation_price(),
                    'max' => $custom_product->get_variation_price('max')
                ];
                
                foreach($variations as $variation) {
                    $var = [
                        "attributes" => $variation['attributes'],
                        // "image"      => $variation['image']['src'],
                        "image_id"   => $variation['image_id'],
                    ];
                    $product_variation[] = $var;
                }

            } else {
                $variationPrice = "";
                $custom_variations = [];
                $color = $custom_product->get_attribute('Color');
            }

            $product_category_fetch = get_the_terms($custom_product->get_id(), 'product_cat');
            $product_cat = $product_category_fetch[0]->slug;

            // get total colors

            array_push( $productResults['products'], [
                'id'                => $custom_product->get_id(),
                'slug'              => $custom_product->get_slug(),
                'name'              => $custom_product->get_name(),
                'price'             => $custom_product->get_price(),
                'currency'          => get_woocommerce_currency_symbol(),
                'variation_price'   => $variationPrice,
                'color'             => $color,
                // 'total_colors'      => 1,
                'category'          => $product_cat,
                'featured_image'    => $attachment[0],
                'product_variation' => $product_variation
            ]);


        endforeach;
    endif;


    return $productResults;
}



add_filter( 
    'woocommerce_product_data_store_cpt_get_products_query', 
    function ( $query, $query_vars ) {
        if ( ! empty( $query_vars['price_between'] ) ) {
            $query['meta_query'][] = array(
                'key'     => '_price',
                'value'   => $query_vars['price_between'],
                'type'    => 'NUMERIC',
                'compare' => 'BETWEEN',
            );
        }
        return $query;
    },
    10,
    2
);

function filter_options() {
    global $product;

    $response = [
        "colors" => get_terms("pa_color"),
        // "max-price" => woocommerce_price()
    ];

    return rest_ensure_response($response);
}


///////////////////////////////////////////////////
//
// Get Args
//
///////////////////////////////////////////////////

function getArgs() {
    $response = [];
    $args = array();

    $args['page'] = array(
        'type'   => 'number',
    );

    return $args;
}


///////////////////////////////////////////////////
//
// Get Image
//
///////////////////////////////////////////////////
function getImage( $args ) {
    global $product;

    // $attachment_ids[0] = get_post_thumbnail_id( $productID );
    $img = wp_get_attachment_image_src($args['id'], false );

    return $img;
}



///////////////////////////////////////////////////
//
// Pay with PayPal
//
///////////////////////////////////////////////////

// return paypal token
function proceedOrderWithPayPal( $args ) {
    // User sends order ID
    // Take the order total price, and create a paypal token with that price
    // send it back to the user
    // user opens that in the browser
    // the order gets paid
    // different function: update the order to complete
}

///////////////////////////////////////////////////
//
// Register Routes
//
///////////////////////////////////////////////////

function register_routes() { 
    register_rest_route( 'wc/v3', '/product/slug=(?P<slug>[a-zA-Z0-9-]+)', array(
        'method' => 'GET',
        'callback' => 'getProductBySlug',
    ));   
    register_rest_route( 'wc/v3', '/products-list', array(
        'method' => 'GET',
        'callback' => 'getProductsList',
        'args' => getArgs(),
    ));  
    register_rest_route( 'wc/v3', '/image/(?P<id>[0-9-]+)', array(
        'method' => 'GET',
        'callback' => 'getImage'
    ));   
    register_rest_route( 'wc/v3', '/pay/order/(?P<id>[0-9-]+)/paypal', array(
        'method' => 'GET',
        'callback' => 'proceedOrderWithPayPal'
    ));
    register_rest_route( 'wc/v3', '/filter-options', array(
        'method' => 'GET',
        'callback' => 'filter_options'
    ));
}
add_action('rest_api_init', 'register_routes');