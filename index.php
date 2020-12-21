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

function firsttheme_blocks_register_block_type($block, $options = array()) {
  register_block_type(
    'firsttheme-blocks/'.$block,
    array_merge(
      array(
        'editor_script' => 'firsttheme-blocks-editor-script',
        // 'script',
        // 'editor_style',
        // 'style',
      ),
      $options
    )
  );
}

// Register block
function firsttheme_blocks_register() {
  wp_register_script(
    'firsttheme-blocks-editor-script', // Script handle
    plugins_url('dist/editor.js', __FILE__), // File Url
    array('wp-blocks','wp-i18n','wp-element') // Deps
  );

  firsttheme_blocks_register_block_type('firstblock');
  firsttheme_blocks_register_block_type('secondblock');
}
add_action('init', 'firsttheme_blocks_register');

?>
