import { Fragment, useEffect } from "@wordpress/element";
import {
	RichText,
	MediaPlaceholder,
	MediaUpload,
	MediaUploadCheck,
	BlockControls,
	InspectorControls,
} from "@wordpress/editor";
import {
	Spinner,
	withNotices,
	Toolbar,
	IconButton,
	PanelBody,
	TextareaControl,
	SelectControl,
} from "@wordpress/components";
import { useSelect } from "@wordpress/data";
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

	// Select from redux store
	const { image, imageSizes } = useSelect(
		(select) => {
			const image = select("core").getMedia(id);
			const imageSizes = select("core/editor").getEditorSettings().imageSizes;
			return { image, imageSizes };
		},
		[id]
	);

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

	const handleSetAlt = (val) => setAttributes({ alt: val });

	const handleImageSizeChange = (url) => setAttributes({ url });

	const getImageSizes = () => {
		return image
			? Object.entries(image.media_details.sizes)
					.filter(([key]) => imageSizes.some((size) => size.slug === key))
					.map(([key, val]) => ({
						label: imageSizes.find((size) => size.slug === key).name,
						value: val.source_url,
					}))
			: [];
	};

	return (
		<Fragment>
			{/* Content Area Controls */}
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

			{/* Sidebar Controls */}
			<InspectorControls>
				<PanelBody title={__("Image Settings", "firsttheme-blocks")}>
					{url && !isBlobURL(url) && (
						<TextareaControl
							label={__("Alt Text (Alternative Text)", "firsttheme-blocks")}
							value={alt}
							onChange={handleSetAlt}
							help={__(
								"Alt text helps screen-reading tools describe images to visually impaired readers and allows search engines to better crawl and rank your website.",
								"firsttheme-blocks"
							)}
						/>
					)}

					{/* If image is in library, it has different sizes */}
					{id && (
						<SelectControl
							label={__("Image Sizes", "firsttheme-blocks")}
							options={getImageSizes()}
							onChange={handleImageSizeChange}
						/>
					)}
				</PanelBody>
			</InspectorControls>

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
