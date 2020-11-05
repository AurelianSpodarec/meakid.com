<?php


// function add_cors_header() {
//     $method = $_SERVER['REQUEST_METHOD'];
//         if ($method == "OPTIONS") {
//         header("Access-Control-Allow-Origin: http://localhost:3000");
//         header("Access-Control-Allow-Methods","PUT, POST, GET, DELETE, PATCH, OPTIONS"); 
//         header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization, OPTIONS");
//         header("Access-Control-Allow-Headers", "content-type");
//         header("HTTP/1.1 200 OK");
//     }
// }
// add_filter('init', 'add_cors_header');


// function add_cors_header() {
//     header("Access-Control-Allow-Origin: http://localhost:3000");
// }
// add_filter('init', 'add_cors_header');

// function add_cors_http_header(){
//     header("Access-Control-Allow-Origin: *");
// }
// add_action('init','add_cors_http_header');





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



// add_action('init','add_cors_http_header');
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

// add_action('init', 'handle_preflight');
// function handle_preflight() {
//     $origin = get_http_origin();
//     if ($origin === 'http://localhost:3000') {
//         header("Access-Control-Allow-Orign: http://localhost:3000");
//         header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
//         header("Access-Control-Allow-Credentials: true");
//         header('Access-Control-Allow-Headers: Origin, X-Requested-With, X-WP-Nonce, Content-Type, Accept, Authorization');
//         if ('OPTIONS' == $_SERVER['REQUEST_METHOD']) {
//             status_header(200);
//             exit();
//         }
//     }
// }
// add_filter('rest_authentication_errors', 'rest_filter_incoming_connections');
// function rest_filter_incoming_connections($errors) {
//     $request_server = $_SERVER['REMOTE_ADDR'];
//     $origin = get_http_origin();
//     if ($origin !== 'http://localhost:3000') return new WP_Error('forbidden_access', $origin, array(
//         'status' => 403
//     ));
//     return $errors;
// }



 
// add_filter( 'allowed_http_origins', 'add_localhost_origin' );
// function add_localhost_origin( $origins ) {
//     $origins[] = 'http://localhost:3000';
//     return $origins;
// }
 








// function add_cors_http_header(){
//     header("Access-Control-Allow-Origin: http://localhost:3000");
//     header("HTTP/1.1 200 OK");



//     // $method = $_SERVER['REQUEST_METHOD'];
//     // if ($method == "OPTIONS" ) {
      
//         // header("Access-Control-Allow-Methods","PUT, POST, GET, DELETE, PATCH, OPTIONS"); 
//         // header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization");
//         // header("HTTP/1.1 200 OK");
//         // die();
//     // }
// }

// add_action('init','add_cors_http_header');
 
// function add_cors_http_header(){
//     $method = $_SERVER['REQUEST_METHOD'];
//     if ($method == "OPTIONS") {
//         header('Access-Control-Allow-Origin: *');
//         header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization");
//         // header("Access-Control-Allow-Headers: true");
//         header("HTTP/1.1 200 OK");
//         die();
//     }
// }

// add_action('init','add_cors_http_header');

function add_cors_http_header(){

   

    $method = $_SERVER['REQUEST_METHOD'];

    if ($method == "OPTIONS") {

        if (!($_SERVER['HTTP_ORIGIN'] == "https://meakid.co.uk")){
                header('Access-Control-Allow-Origin: http://localhost:3000');
        } else {
                header('Access-Control-Allow-Origin: https://meakid.co.uk');        
        }
       
        // header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization");
        // header("Access-Control-Allow-Headers: true");
        header( 'Access-Control-Allow-Credentials: true' );
        header( 'Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE' );
        header( 'Access-Control-Allow-Headers: Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers' );
        header("HTTP/1.1 200 OK");
        die();
    }
}

add_action('init','add_cors_http_header');