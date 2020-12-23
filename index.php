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
    array('wp-blocks','wp-i18n','wp-element', 'wp-editor', 'wp-components') // Deps
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
}
add_action('init', 'firsttheme_blocks_register');

?>
