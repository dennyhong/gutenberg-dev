import { Fragment, useEffect } from "@wordpress/element";
import {
	RichText,
	MediaPlaceholder,
	MediaUpload,
	MediaUploadCheck,
	BlockControls,
} from "@wordpress/editor";
import {
	Spinner,
	withNotices,
	Toolbar,
	IconButton,
} from "@wordpress/components";
import { isBlobURL } from "@wordpress/blob";
import { __ } from "@wordpress/i18n";

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

	const handleRemoveImage = () => {
		setAttributes({ id: null, url: "", alt: "" });
	};

	return (
		<Fragment>
			<BlockControls>
				{url && (
					<Toolbar>
						{/* Edit Image Button, only show for non-url uploaded images */}
						{id && (
							<MediaUploadCheck>
								<MediaUpload
									allowedTypes={["image"]}
									value={id}
									onSelect={handleSelectImage}
									onSelectURL={handleSelectUrl}
									onError={handleUploadError}
									render={({ open }) => (
										<IconButton
											className="components-icon-button components-toolbar__control"
											icon="edit"
											label={__("Edit Image", "firsttheme-blocks")}
											onClick={open}
										/>
									)}
								/>
							</MediaUploadCheck>
						)}

						{/* Remove image button */}
						<IconButton
							className="components-icon-button components-toolbar__control"
							icon="trash"
							label={__("Remove Image", "firsttheme-blocks")}
							onClick={handleRemoveImage}
						/>
					</Toolbar>
				)}
			</BlockControls>

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
		</Fragment>
	);
};

export default withNotices(Edit);
