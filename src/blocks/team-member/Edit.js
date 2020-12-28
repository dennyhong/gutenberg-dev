import { RichText } from "@wordpress/editor";
import { __ } from "@wordpress/i18n";

const Edit = ({ attributes, setAttributes, className }) => {
	const { title, info } = attributes;

	const handleChange = (key) => (value) => setAttributes({ [key]: value });

	return (
		<div className={className}>
			{/* Member Name */}
			<RichText
				className={`wp-block-firsttheme-blocks-team-member__title`}
				tagName="h4"
				value={title}
				onChange={handleChange("title")}
				placeholder={__("Member Name", "firsttheme-blocks")}
				formattingControls={[]} // Disable user formatting
			/>

			{/* Member Info */}
			<RichText
				className={`wp-block-firsttheme-blocks-team-member__info`}
				tagName="p"
				value={info}
				onChange={handleChange("info")}
				placeholder={__("Member Info", "firsttheme-blocks")}
				formattingControls={[]} // Disable user formatting
			/>
		</div>
	);
};

export default Edit;
