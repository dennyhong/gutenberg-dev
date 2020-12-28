import { registerBlockType } from "@wordpress/blocks";
import { InnerBlocks, InspectorControls } from "@wordpress/editor";
import { PanelBody, RangeControl } from "@wordpress/components";

import { __ } from "@wordpress/i18n";

const attributes = {
	columns: {
		type: "number",
		default: 2,
	},
};

registerBlockType("firsttheme-blocks/team-members", {
	title: __("Team Members", "firsttheme-blocks"),

	description: __("Block showing Team Members", "firsttheme-blocks"),

	keywords: [
		__("team", "firsttheme-blocks"),
		__("member", "firsttheme-blocks"),
		__("person", "firsttheme-blocks"),
	],

	icon: "grid-view",

	supports: {
		html: false, // Disable edit as html
	},

	attributes,

	edit({ className, attributes, setAttributes }) {
		const { columns } = attributes;

		return (
			<div className={`${className} has-${columns}-columns`}>
				{/* Number of columns */}
				<InspectorControls>
					<PanelBody>
						<RangeControl
							label={__("Columns", "firsttheme-blocks")}
							value={columns}
							onChange={(val) => setAttributes({ columns: val })}
							min={1}
							max={6}
							step={1}
						/>
					</PanelBody>
				</InspectorControls>

				{/* Take team-member as inner blocks */}
				<InnerBlocks
					allowedBlocks={["firsttheme-blocks/team-member"]}
					template={[
						["firsttheme-blocks/team-member", { title: "Member Name" }],
						["firsttheme-blocks/team-member"],
					]}
				/>
			</div>
		);
	},

	save({ attributes }) {
		const { columns } = attributes;

		return (
			<div className={`has-${columns}-columns`}>
				<InnerBlocks.Content />
			</div>
		);
	},
});
