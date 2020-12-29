import { useEffect } from "@wordpress/element";
import { registerBlockType } from "@wordpress/blocks";
import { useSelect } from "@wordpress/data";
import { __ } from "@wordpress/i18n";

registerBlockType("firsttheme-blocks/todo-info", {
	title: __("Redux Todo List Info", "firsttheme-blocks"),

	description: __("Redux Todo List Info", "firsttheme-blocks"),

	keywords: [__("todo", "firsttheme-blocks")],

	icon: "editor-ul",

	category: "firsttheme-category",

	attributes: {
		todoCount: {
			type: "string",
			source: "html",
			selector: "p",
		},
		incompletedTodoCount: {
			type: "string",
			source: "html",
			selector: "p",
		},
		completeTodosCount: {
			type: "string",
			source: "html",
			selector: "p",
		},
	},

	edit({ setAttributes }) {
		const { todoCount, incompletedTodoCount, completeTodosCount } = useSelect(
			(select) => ({
				todoCount: select("firsttheme-blocks/todo").getTodosCount(),
				incompletedTodoCount: select(
					"firsttheme-blocks/todo"
				).getIncompleteTodosCount(),
				completeTodosCount: select(
					"firsttheme-blocks/todo"
				).getCompleteTodosCount(),
			}),
			[]
		);

		useEffect(() => {
			if (
				typeof todoCount !== "undefined" &&
				typeof incompletedTodoCount !== "undefined" &&
				typeof completeTodosCount !== "undefined"
			) {
				setAttributes({ todoCount, incompletedTodoCount, completeTodosCount });
			}
		}, [todoCount, incompletedTodoCount, completeTodosCount]);

		return (
			<div>
				<p>Total todos: {todoCount}</p>
				<p>Completed todos: {completeTodosCount}</p>
				<p>Incomplete todos: {incompletedTodoCount}</p>
			</div>
		);
	},

	save({
		attributes: { todoCount, incompletedTodoCount, completeTodosCount },
	}) {
		return (
			<div>
				<p>Total todos: {todoCount}</p>
				<p>Completed todos: {completeTodosCount}</p>
				<p>Incomplete todos: {incompletedTodoCount}</p>
			</div>
		);
	},
});
