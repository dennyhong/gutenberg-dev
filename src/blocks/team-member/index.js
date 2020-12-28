import { registerBlockType } from "@wordpress/blocks";
import { RichText } from "@wordpress/editor";
import { Dashicon } from "@wordpress/components";
import { __ } from "@wordpress/i18n";

import Edit from "./Edit";
import "./parent";
import "./style.editor.scss";

const attributes = {
	title: {
		type: "string",
		source: "html",
		selector: "h4",
	},
	info: {
		type: "string",
		source: "html",
		selector: "p",
	},

	id: {
		type: "number",
	},
	url: {
		type: "string",
		source: "attribute",
		selector: "img",
		attribute: "src",
	},
	alt: {
		type: "string",
		source: "attribute",
		selector: "img",
		attribute: "alt",
		defatul: "",
	},

	// Avoid saving social icons array data into DB, source data from HTML
	social: {
		type: "array",
		default: [
			{ link: "http://facebook.com", icon: "facebook" },
			{ link: "http://twitter.com", icon: "twitter" },
		],
		source: "query",
		selector: ".wp-block-firsttheme-blocks-team-member__social ul li",
		query: {
			icon: {
				source: "attribute",
				attribute: "data-icon",
			},
			link: {
				source: "attribute",
				selector: "a",
				attribute: "href",
			},
		},
	},
};

registerBlockType("firsttheme-blocks/team-member", {
	title: __("Team Member", "firsttheme-blocks"),

	description: __("Block showing a Team Member", "firsttheme-blocks"),

	keywords: [
		__("team", "firsttheme-blocks"),
		__("member", "firsttheme-blocks"),
		__("person", "firsttheme-blocks"),
	],

	icon: "admin-users",

	supports: {
		reusable: false,
		html: false, // Disable edit as html
	},

	attributes,

	// Prevent using this block outsite of parents
	parent: ["firsttheme-blocks/team-members"],

	edit: Edit,

	save({ attributes }) {
		const { title, info, url, alt, id, social } = attributes;

		return (
			<div>
				{url && (
					<img
						className={id ? `wp-image-${id}` : ""} // Responsive image class
						src={url}
						alt={alt}
					/>
				)}
				{title && (
					<RichText.Content
						className={`wp-block-firsttheme-blocks-team-member__title`}
						tagName="h4"
						value={title}
					/>
				)}
				{info && (
					<RichText.Content
						className={`wp-block-firsttheme-blocks-team-member__info`}
						tagName="p"
						value={info}
					/>
				)}
				{social.length && (
					<div className={`wp-block-firsttheme-blocks-team-member__social`}>
						<ul>
							{social.map((link, idx) => (
								<li key={idx} data-icon={link.icon}>
									<a href={link.link} target="_blank" rel="noopner noreferrer">
										<Dashicon icon={link.icon} size={16} />
									</a>
								</li>
							))}
						</ul>
					</div>
				)}
			</div>
		);
	},
});
