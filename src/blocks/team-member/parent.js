import { registerBlockType, createBlock } from "@wordpress/blocks";
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
		align: ["wide", "full"],
	},

	transforms: {
		from: [
			{
				type: "block",
				blocks: ["core/gallery"],
				transform({ columns, images }) {
					const innerBlocks = images.map(({ alt, id, url }) =>
						createBlock("firsttheme-blocks/team-member", { alt, id, url })
					);
					return createBlock(
						"firsttheme-blocks/team-members",
						{ columns },
						innerBlocks
					);
				},
			},
			{
				type: "block",
				blocks: ["core/image"],
				isMultiBlock: true, // Allow transform is multiple images are selected
				transform(attributes) {
					console.log(attributes);
					const innerBlocks = attributes.map(({ alt, id, url }) =>
						createBlock("firsttheme-blocks/team-member", { alt, id, url })
					);
					return createBlock("firsttheme-blocks/team-members", {}, innerBlocks);
				},
			},
		],
	},

	attributes,

	edit({ className, attributes, setAttributes }) {
		const { columns } = attributes;

		return (
			<div className={`${className} has-${columns}-columns`}>
				{/* Controls number of columns */}
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

				{/* Only takes team-member as inner blocks */}
				<InnerBlocks
					allowedBlocks={["firsttheme-blocks/team-member"]}
					// Defaults
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
