import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import { RichText, getColorClassName } from "@wordpress/editor";
import classNames from "classnames";

import Edit from "./Edit";
import "./styles.editor.scss";

export const attributes = {
	content: {
		type: "string",
		source: "html", // Get content from html directly, don't save as JSON in DB
		selector: "h4",
	},

	textAlignment: { type: "string" },

	color: { type: "string" },
	backgroundColor: { type: "string" },
	customColor: { type: "string" },
	customBackgroundColor: { type: "string" },

	boxShadow: {
		type: "boolean",
		default: false,
	},
	shadowOpacity: {
		type: "number",
		default: 0.3,
	},
};

registerBlockType("firsttheme-blocks/secondblock", {
	title: __("Second Block", "firsttheme-blocks"), // Block name, domain
	description: __("My second block", "firsttheme-blocks"),
	category: "firsttheme-category",
	icon: (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			height="24"
			viewBox="0 0 24 24"
			width="24">
			<path d="M0 0h24v24H0z" fill="none" />
			<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
		</svg>
	),
	keywords: [
		__("photo", "firsttheme-blocks"),
		__("image", "firsttheme-blocks"),
	],

	styles: [
		{
			name: "rounded",
			label: __("Rounded", "firsttheme-blocks"),
			isDefault: true,
		},
		{
			name: "outline",
			label: __("Outline", "firsttheme-blocks"),
		},
		{
			name: "squared",
			label: __("Squared", "firsttheme-blocks"),
		},
	],

	// States
	attributes,

	deprecated: [
		// Changed "alignment" to "textAlignment"
		{
			// How `attributes` looked like before changes
			attributes: {
				...Object.entries(attributes).reduce(
					(acc, [key, val]) =>
						key === "textAlignment" ? acc : { ...acc, [key]: val },
					{}
				),
			},
			// How to transform old `attributes` to new `attributes`
			migrate(attributes) {
				return {
					...Object.entries(attributes).reduce(
						(acc, [key, val]) =>
							key === "alignment" ? acc : { ...acc, [key]: val },
						{ textAlignment: attributes.alignment }
					),
				};
			},
			save({ attributes }) {
				const {
					content,
					alignment,
					backgroundColor,
					color,
					customColor, // From withColor HOC
					customBackgroundColor,
					boxShadow,
					shadowOpacity,
				} = attributes;

				const backgroundClass = getColorClassName(
					"background-color",
					backgroundColor
				);
				const textClass = getColorClassName("color", color);

				return (
					<RichText.Content
						className={classNames({
							[textClass]: !!textClass,
							[backgroundClass]: !!backgroundClass,
							["has-shadow"]: boxShadow,
							[`shadow-opacity-${shadowOpacity * 100}`]: shadowOpacity,
						})}
						tagName="h4"
						value={content}
						style={{
							textAlign: alignment,
							backgroundColor: !backgroundClass
								? customBackgroundColor
								: undefined,
							color: !textClass ? customColor : undefined,
						}}
					/>
				);
			},
		},

		// Changed "p" to "h4"
		{
			// supports
			attributes: {
				...Object.entries(attributes).reduce(
					(acc, [key, val]) =>
						key === "textAlignment"
							? acc
							: key === "content"
							? {
									...acc,
									content: {
										...attributes.content,
										selector: "p",
									},
							  }
							: { ...acc, [key]: val },
					{}
				),
			},
			migrate(attributes) {
				return {
					...Object.entries(attributes).reduce(
						(acc, [key, val]) =>
							key === "alignment" ? acc : { ...acc, [key]: val },
						{ textAlignment: attributes.alignment }
					),
				};
			},
			save({ attributes }) {
				const {
					content,
					textAlignment,
					backgroundColor,
					color,
					customColor, // From withColor HOC
					customBackgroundColor,
					boxShadow,
					shadowOpacity,
				} = attributes;

				const backgroundClass = getColorClassName(
					"background-color",
					backgroundColor
				);
				const textClass = getColorClassName("color", color);

				return (
					<RichText.Content
						className={classNames({
							[textClass]: !!textClass,
							[backgroundClass]: !!backgroundClass,
							["has-shadow"]: boxShadow,
							[`shadow-opacity-${shadowOpacity * 100}`]: shadowOpacity,
						})}
						tagName="p"
						value={content}
						style={{
							textAlign: textAlignment,
							backgroundColor: !backgroundClass
								? customBackgroundColor
								: undefined,
							color: !textClass ? customColor : undefined,
						}}
					/>
				);
			},
		},
	],

	edit: Edit,

	save({ attributes }) {
		const {
			content,
			textAlignment,
			backgroundColor,
			color,
			customColor, // From withColor HOC
			customBackgroundColor,
			boxShadow,
			shadowOpacity,
		} = attributes;

		const backgroundClass = getColorClassName(
			"background-color",
			backgroundColor
		);
		const textClass = getColorClassName("color", color);

		return (
			<RichText.Content
				className={classNames({
					[textClass]: !!textClass,
					[backgroundClass]: !!backgroundClass,
					["has-shadow"]: boxShadow,
					[`shadow-opacity-${shadowOpacity * 100}`]: shadowOpacity,
				})}
				tagName="h4"
				value={content}
				style={{
					textAlign: textAlignment,
					backgroundColor: !backgroundClass ? customBackgroundColor : undefined,
					color: !textClass ? customColor : undefined,
				}}
			/>
		);
	},
});
