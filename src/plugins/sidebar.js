import { Fragment } from "@wordpress/element";
import { useSelect, useDispatch } from "@wordpress/data";
import { PanelBody, TextControl } from "@wordpress/components";
import { registerPlugin } from "@wordpress/plugins";
import {
	PluginSidebar,
	PluginSidebarMoreMenuItem,
	// PluginPostStatusInfo,
	// PluginPrePublishPanel,
	// PluginPostPublishPanel,
	// PluginBlockSettingsMenuItem,
	// PluginMoreMenuItem,
} from "@wordpress/edit-post";

import { __ } from "@wordpress/i18n";

const PluginMetaFields = () => {
	const dispatch = useDispatch();
	const { _firsttheme_blocks_post_subtitle: subtitle } = useSelect(
		(select) => select("core/editor").getEditedPostAttribute("meta"),
		[]
	);

	return (
		<Fragment>
			<PanelBody
				title={__("Meta Field Panel", "firsttheme-blocks")}
				initialOpen>
				<TextControl
					label={__("Post Subtitle", "firsttheme-blocks")}
					value={subtitle}
					onChange={(val) =>
						dispatch("core/editor").editPost({
							meta: { _firsttheme_blocks_post_subtitle: val },
						})
					}
				/>
			</PanelBody>
		</Fragment>
	);
};

// Use `@wordpress/edit-post` to modify existing Gutenberg UI
registerPlugin("firsttheme-blocks-sideber", {
	icon: "smiley",
	render() {
		return (
			<Fragment>
				{/* Show Sidebar in `more options dropdown` */}
				<PluginSidebarMoreMenuItem target="firsttheme-blocks-sideber">
					{__("Meta Options", "firsttheme-blocks")}
				</PluginSidebarMoreMenuItem>

				{/* Sidebar */}
				<PluginSidebar
					name="firsttheme-blocks-sideber"
					icon="admin-post"
					title={__("Meta Options", "firsttheme-blocks")}>
					<PluginMetaFields />
				</PluginSidebar>

				{/* Add to Existing sidebar */}
				{/* <PluginPostStatusInfo>Another Status Info</PluginPostStatusInfo>
				<PluginPrePublishPanel title="Pre Publish 😎" initialOpen>
					Pre Publish 😎
				</PluginPrePublishPanel>
				<PluginPostPublishPanel title="Post Publish 🔥" initialOpen>
					Post Publish 🔥
				</PluginPostPublishPanel> */}

				{/* Add to Existing Block Settings */}
				{/* <PluginBlockSettingsMenuItem
					icon="twitter"
					label="Another Block Setting Item"
					onClick={alert.bind(this, "Hi")}
				/>
				<PluginMoreMenuItem onClick={alert.bind(this, "Hi")}>
					Another More Menu Item
				</PluginMoreMenuItem> */}
			</Fragment>
		);
	},
});
