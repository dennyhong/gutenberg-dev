import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import Edit from "./Edit";

registerBlockType("firsttheme-blocks/latest-posts", {
	title: __("Latest Posts", "firsttheme-blocks"),

	description: __("Block showing the latest posts", "firsttheme-blocks"),

	icon: "admin-post",

	category: "firsttheme-category",

	edit: Edit,

	save() {
		// Dynamic block must return null
		return null;
	},
});
