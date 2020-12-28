import { RichText, MediaPlaceholder } from "@wordpress/editor";
import { __ } from "@wordpress/i18n";
import { isBlobURL } from "@wordpress/blob";
import { Spinner, withNotices } from "@wordpress/components";
import { Fragment, useEffect } from "@wordpress/element";

const Edit = ({
	attributes,
	setAttributes,
	className,
	noticeOperations,
	noticeUI,
}) => {
	const { title, info, url, alt, id } = attributes;

	useEffect(() => {
		if (url && isBlobURL(url) && !id) {
			setAttributes({ url: "", alt: "" });
			return;
		}
	}, []);

	const handleChange = (key) => (value) => setAttributes({ [key]: value });

	const handleSelectImage = ({ id, url, alt }) => {
		setAttributes({ id, url, alt });
	};

	const handleUploadError = (errorMessage) => {
		noticeOperations.createErrorNotice(errorMessage);
	};

	const handleSelectUrl = (url) => {
		setAttributes({ url, id: null, alt: "" });
	};

	return (
		<div className={className}>
			{url ? (
				<Fragment>
					<img src={url} alt={alt ?? ""} />
					{isBlobURL(url) && <Spinner />}
				</Fragment>
			) : (
				<MediaPlaceholder
					onSelect={handleSelectImage}
					onSelectURL={handleSelectUrl}
					onError={handleUploadError}
					accept="image/*"
					allowedTypes={["image"]}
					notices={noticeUI}
				/>
			)}

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

export default withNotices(Edit);
