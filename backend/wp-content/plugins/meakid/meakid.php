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
// Get Products List
//
///////////////////////////////////////////////////
function getProductsList( $args ) {
    global $product;


    $query = new WC_Product_Query( array(
        'limit' => 10,
        'orderby' => 'date',
        'order' => 'DESC',
        'return' => 'ids',
    ) ); 
    $products = $query->get_products();


    $productResults = array(
        "products" => []
    );


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
                        "image"      => $variation['image']['src'],
                    ];
                    $product_variation[] = $var;
                }

            } else {
                $variationPrice = "";
                $custom_variations = [];
                $color = $custom_product->get_attribute('Color');
            }


            array_push( $productResults['products'], [
                'id'                => $custom_product->get_id(),
                'slug'              => $custom_product->get_slug(),
                'name'              => $custom_product->get_name(),
                'featured_image'    => $attachment[0],
                'product_variation' => $product_variation
            ]);


        endforeach;
    endif;


    return $productResults;
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
// Register Routes
//
///////////////////////////////////////////////////

function register_routes() { 
    register_rest_route( 'wc/v3', '/products-list', array(
        'method' => 'GET',
        'callback' => 'getProductsList',
        'args' => getArgs(),
    ));   
}
add_action('rest_api_init', 'register_routes');








// REMOVE ONCE DEPLOYED

add_filter( 'allowed_http_origins', 'add_localhost_origin' );
function add_localhost_origin( $origins ) {
    $origins[] = 'http://localhost:3000';
    return $origins;
}
 
function add_cors_http_header(){
    $method = $_SERVER['REQUEST_METHOD'];
    if ($method == "OPTIONS") {
        header('Access-Control-Allow-Origin: *');
        header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization, OTHER HEADERS YOU WANT");
        header("HTTP/1.1 200 OK");
        die();
    }
}

add_action('init','add_cors_http_header');