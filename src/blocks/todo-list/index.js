import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";

import Edit from "./Edit";

registerBlockType("firsttheme-blocks/todo-list", {
	title: __("Redux Todo List", "firsttheme-blocks"),

	description: __("Redux Todo List", "firsttheme-blocks"),

	keywords: [__("todo", "firsttheme-blocks")],

	icon: "editor-ul",

	category: "firsttheme-category",

	attributes: {},

	edit: Edit,

	save() {
		return null;
	},
});
