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

// Register block
function firsttheme_blocks_register() {
  wp_register_script(
    'firsttheme-blocks-firstblock-editor-script', // Script handle
    plugins_url('blocks/firstblock/index.js', __FILE__), // File Url
    array('wp-blocks','wp-i18n','wp-element') // Deps
  );

  register_block_type(
    'firsttheme-blocks/firstblock', array(
      'editor_script' => 'firsttheme-blocks-firstblock-editor-script',
      // 'script',
      // 'editor_style',
      // 'style',
    )
  );
}
add_action('init', 'firsttheme_blocks_register');
?>
