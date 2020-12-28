import { Fragment } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import {
	RichText,
	BlockControls,
	AlignmentToolbar,
	InspectorControls,
	PanelColorSettings,
	withColors,
	ContrastChecker,
} from "@wordpress/editor";
import classNames from "classnames";
import { PanelBody, RangeControl } from "@wordpress/components";

import "./styles.editor.scss";

const Edit = ({
	attributes,
	setAttributes,
	className,
	color,
	backgroundColor,
	setColor,
	setBackgroundColor,
}) => {
	const { content, textAlignment, boxShadow, shadowOpacity } = attributes;

	const handleContentChange = (value) => setAttributes({ content: value });

	const handleAlignmentChange = (value) =>
		setAttributes({ textAlignment: value });

	const handleToggleShadow = () => setAttributes({ boxShadow: !boxShadow });

	const handleShadowOpacityChange = (value) =>
		setAttributes({ shadowOpacity: value });

	return (
		<Fragment>
			{/* BlockControls: Floating toolbar */}
			<BlockControls>
				<AlignmentToolbar
					onChange={handleAlignmentChange}
					value={textAlignment}
				/>
			</BlockControls>

			<BlockControls
				controls={[
					{
						icon: "wordpress",
						title: __("Shadow", "firsttheme-blocks"),
						onClick: handleToggleShadow,
						isActive: boxShadow,
					},
				]}
			/>

			{/* InspectorControls: Sidebar */}
			<InspectorControls>
				<PanelColorSettings
					title={__("Color Settings", "firsttheme_blocks")}
					colorSettings={[
						{
							value: backgroundColor.color,
							onChange: setBackgroundColor,
							label: __("Backgorund Color", "firsttheme_blocks"),
						},
						{
							value: color.color,
							onChange: setColor,
							label: __("Text Color", "firsttheme_blocks"),
						},
					]}>
					<ContrastChecker
						textColor={color.color}
						backgroundColor={backgroundColor.color}
					/>
				</PanelColorSettings>

				{boxShadow && (
					<PanelBody title={__("Settings", "firsttheme-blocks")}>
						<RangeControl
							label={__("Shadow Opacity", "firsttheme-blocks")}
							value={shadowOpacity}
							onChange={handleShadowOpacityChange}
							min={0.1}
							max={0.4}
							step={0.1}
						/>
					</PanelBody>
				)}
			</InspectorControls>

			{/* RichText */}
			<RichText
				className={classNames(className, {
					["has-shadow"]: boxShadow,
					[`shadow-opacity-${shadowOpacity * 100}`]: shadowOpacity,
				})}
				style={{
					textAlign: textAlignment,
					backgroundColor: backgroundColor.color,
					color: color.color,
				}}
				onChange={handleContentChange}
				value={content}
				formattingControls={["bold"]}
			/>
		</Fragment>
	);
};

export default withColors(
	{ backgroundColor: "backgroundColor" },
	{ color: "color" }
)(Edit);
