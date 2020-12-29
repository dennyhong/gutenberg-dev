import { useDispatch, useSelect } from "@wordpress/data";
import { registerBlockType } from "@wordpress/blocks";
import { TextControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";

registerBlockType("firsttheme-blocks/meta", {
	title: __("Meta", "firsttheme-blocks"),

	description: __("Meta", "firsttheme-blocks"),

	keywords: [__("meta", "firsttheme-blocks")],

	icon: "admin-tools",

	category: "firsttheme-category",

	attributes: {
		postSubtitle: {
			type: "string",
			source: "meta", // Automatically gets and sets metafield data via redux
			meta: "_firsttheme_blocks_post_subtitle", // Which meta field to get/set
		},
	},

	edit({ attributes, setAttributes }) {
		const { postSubtitle } = attributes;
		const dispatch = useDispatch();
		const notices = useSelect((select) => select("core/notices").getNotices());

		return (
			<div>
				<TextControl
					label={__("Post Subtitle", "firsttheme-blocks")}
					value={postSubtitle}
					onChange={async (val) => {
						setAttributes({ postSubtitle: val });
						await Promise.all(
							notices.map((notice) =>
								dispatch("core/notices").removeNotice(notice.id)
							)
						);
						dispatch("core/notices").createSuccessNotice(
							`Meta data successfully updated!`
						);
					}}
				/>
			</div>
		);
	},

	save() {
		return null;
	},
});
