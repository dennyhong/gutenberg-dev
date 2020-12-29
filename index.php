<?php
/**
 * Plugin Name: firsttheme-blocks
 * Description: blocks for firsttheme
 * Author: Denny Hong
 */

//  Prevent access to this file directly
if (!defined('ABSPATH')) {
  exit;
}

// Add block categories
function firsttheme_blocks_categories( $categories, $post ) {
  // $post is used to add category for specific post types
  return array_merge(
    $categories,
    array(
      array(
        'slug' => 'firsttheme-category',
        'title' => __('First theme Category', 'firsttheme-blocks'),
        'icon' => 'wordpress'
      )
    )
  );
}
add_filter( 'block_categories', 'firsttheme_blocks_categories', 10, 2);

// Regsiter block helper
function firsttheme_blocks_register_block_type($block, $options = array()) {
  register_block_type(
    'firsttheme-blocks/'.$block,
    array_merge(
      array(
        'editor_script' => 'firsttheme-blocks-editor-script', // editor only
        'script' => 'firsttheme-blocks-script', // frontend + editor
        'editor_style' => 'firsttheme-blocks-editor-style', // editor only
        'style' => 'firsttheme-blocks-style' // frontend + editor
      ),
      $options
    )
  );
}

// Register blocks
function firsttheme_blocks_register() {

  // Register editor script
  wp_register_script(
    'firsttheme-blocks-editor-script', // Script handle
    plugins_url('dist/editor.js', __FILE__), // File Url
    array( 'wp-blocks', 'wp-block-editor', 'wp-i18n','wp-element', 'wp-editor', 'wp-components', 'wp-blob', 'wp-data' , 'wp-html-entities' , 'lodash' ) // Deps
  );
  // Register frontend script
  wp_register_script(
    'firsttheme-blocks-script', // Script handle
    plugins_url('dist/script.js', __FILE__), // File Url
    array('jquery')
  );

  // Register editor styles
  wp_register_style(
    'firsttheme-blocks-editor-style',
    plugins_url('dist/editor.css', __FILE__),
    array('wp-edit-blocks') // Depends on default stylesheet
  );
  // Register frontend styles
  wp_register_style(
    'firsttheme-blocks-style',
    plugins_url('dist/style.css', __FILE__)
  );

  // Register blocks
  firsttheme_blocks_register_block_type('firstblock');
  firsttheme_blocks_register_block_type('secondblock');
  firsttheme_blocks_register_block_type('team-member');
  firsttheme_blocks_register_block_type('team-members');
  firsttheme_blocks_register_block_type('redux');
  firsttheme_blocks_register_block_type('todo-list');
  firsttheme_blocks_register_block_type('todo-info');
  firsttheme_blocks_register_block_type('meta');

  // Dynamic Block
  // Attributes of dynamic blocks need to be declared in php arrays
  firsttheme_blocks_register_block_type('latest-posts', array(
    'render_callback' => 'firsttheme_blocks_render_latest_posts_block',
    'attributes' => array(
      'numberOfPosts' => array(
        'type' => 'number',
        'default' => 5
      ),
      'postCategories' => array(
        'type' => "string"
      )
    )
  ));
}
add_action('init', 'firsttheme_blocks_register');

function firsttheme_blocks_render_latest_posts_block( $attributes ) {
  // HTML returned here gets displayed client side
  $args = array(
    'posts_per_page' => $attributes['numberOfPosts']
  );

  // If there are categories selected
  if ( $attributes['postCategories'] ) {
    $args['cat'] = $attributes['postCategories'];
  };

  $query = new WP_Query($args);
  $posts = '';

  if ($query->have_posts()) {
    $posts .= '<ul class="wp-block-firsttheme-blocks-latest-posts">';

    while ($query->have_posts()) {
      $query->the_post();
      $posts .= '<li><a href="'. esc_url(get_the_permalink()) . '">'
      . get_the_title() . '</a></li>';
    }

    $posts .= '</ul>';
    wp_reset_postdata(); // Required after each custom loop
    return $posts;
  } else {
    return '<div' . __('No Posts Found','firsttheme-blocks') . '</div>';
  }
}

// Enqueue redux store script
function firsttheme_blocks_enqueue_assets() {
  wp_enqueue_script(
    'firsttheme-blocks-editor-js',
    plugins_url('dist/editor_script.js',__FILE__),
    array( 'wp-data' )
  );
}
add_action( "enqueue_block_editor_assets", "firsttheme_blocks_enqueue_assets" );

// Register metadata
function firsttheme_blocks_register_meta() {
  register_meta( 'post', '_firsttheme_blocks_post_subtitle', array(
    'show_in_rest' => true,
    'type' => 'string',
    'single' => true,
    'sanitize_callback' => 'sanitize_text_field',
    'auth_callback' => function() {
      return current_user_can( 'edit_posts');
    }
  ));
}
add_action( 'init', 'firsttheme_blocks_register_meta' );
?>
