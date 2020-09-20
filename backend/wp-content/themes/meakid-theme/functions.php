<?php
// header("Access-Control-Allow-Origin: *");
// // Add Menus.
// // require_once 'inc/menus.php';

// function add_cors_http_header(){
    // header("Access-Control-Allow-Origin: *");
// }
// add_action('init','add_cors_http_header');


// add_filter( 'allowed_http_origins', 'add_localhost_origin' );
// function add_localhost_origin( $origins ) {
//     $origins[] = 'http://localhost:3000/';
//     return $origins;
// };
 
// function add_cors_http_header(){
//     $method = $_SERVER['REQUEST_METHOD'];
//     if ($method == "OPTIONS") {
//         header('Access-Control-Allow-Origin: *');
//         header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization, OTHER HEADERS YOU WANT");
//         header("HTTP/1.1 200 OK");
//         die();
//     }
// }

add_filter('init', 'add_cors_header');
function add_cors_header() {
    header("Access-Control-Allow-Origin: http://localhost:3000");
}

// // add_action('init','add_cors_http_header');
// header( 'Access-Control-Allow-Headers: X-Requested-With' );
// function my_customize_rest_cors() {
//     remove_filter( 'rest_pre_serve_request', 'rest_send_cors_headers' );
//     add_filter( 'rest_pre_serve_request', function( $value ) {
//     // header( 'Access-Control-Allow-Origin: http://localhost:3000/' );
//     header( 'Access-Control-Allow-Methods: GET' );
//     header( 'Access-Control-Allow-Credentials: true' );
//     header( 'Access-Control-Expose-Headers: Link', false );
//     return $value;
//     } );
//     }
//     add_action( 'rest_api_init', 'my_customize_rest_cors', 15 );