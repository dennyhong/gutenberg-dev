var registerBlockType = wp.blocks.registerBlockType;
var __ = wp.i18n.__; // Translation functions
var el = wp.element.createElement;

registerBlockType("firsttheme-blocks/secondblock", {
  title: __("Second Block", "firsttheme-blocks"), // Block name, domain
  description: __("My second block", "firsttheme-blocks"),
  category: "layout",
  icon: "admin-network",
  keywords: [__("photo", "firsttheme-blocks"), __("image", "firsttheme-blocks")],
  edit() {
    return el("p", null, "Editor");
  },
  save() {
    return el("p", null, "Saved Content");
  },
});
