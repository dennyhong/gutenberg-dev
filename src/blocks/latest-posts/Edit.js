import { Fragment } from "@wordpress/element";
import { useSelect } from "@wordpress/data";
import { InspectorControls } from "@wordpress/editor";
import {
	Spinner,
	PanelBody,
	RangeControl,
	SelectControl,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { decodeEntities } from "@wordpress/html-entities"; // In order to render html entities as characters instead of code

const Edit = ({ attributes, setAttributes }) => {
	const { numberOfPosts, postCategories } = attributes;

	const posts = useSelect(
		(select) =>
			select("core").getEntityRecords("postType", "post", {
				per_page: numberOfPosts,
				...(postCategories && { categories: postCategories }),
			}),
		[numberOfPosts, postCategories]
	);

	const categories = useSelect(
		(select) =>
			select("core")
				.getEntityRecords("taxonomy", "category", { per_page: -1 })
				?.map((cat) => ({
					label: cat.name,
					value: cat.id,
				})),
		[]
	);

	const handleNumberOfPostsChange = (val) =>
		setAttributes({ numberOfPosts: val });

	const handleCategoriesChange = (categories) =>
		setAttributes({ postCategories: categories.join(",") });

	return (
		<Fragment>
			{/* Sidebar */}
			<InspectorControls>
				<PanelBody title={__("Posts settings", "firsttheme-blocks")}>
					<RangeControl
						label={__("Number of posts to display", "firsttheme-blocks")}
						value={numberOfPosts}
						onChange={handleNumberOfPostsChange}
						min={1}
						max={10}
					/>

					<SelectControl
						label={__("Categories", "firsttheme-blocks")}
						options={categories}
						multiple
						onChange={handleCategoriesChange}
						value={postCategories?.split(",")}
					/>
				</PanelBody>
			</InspectorControls>

			{/* Content */}
			{!posts ? (
				<Spinner />
			) : posts.length ? (
				posts.map((post) => (
					<li key={post.id}>
						<a href={`${post.link}`} target="_blank" rel="noopener noreferrer">
							{decodeEntities(post.title.rendered)}
						</a>
					</li>
				))
			) : (
				<p>{__("No posts found", "firsttheme-blocks")}</p>
			)}
		</Fragment>
	);
};

export default Edit;
