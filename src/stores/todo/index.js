import { registerStore, dispatch } from "@wordpress/data";

const INITIAL_STATE = [];

const reducer = (state = INITIAL_STATE, action) => {
	const { type, payload } = action;
	switch (type) {
		case "POPULATE_TODOS":
			return payload;

		case "ADD_TODO":
			return [...state, payload];

		default:
			return state;
	}
};

const actions = {
	populateTodos(todos) {
		return {
			type: "POPULATE_TODOS",
			payload: todos,
		};
	},

	addTodo(item) {
		return {
			type: "ADD_TODO",
			payload: item,
		};
	},
};

// No side effects in selectors
const selectors = {
	getTodos(state) {
		return state;
	},
};

// Side effects in resolvers
const resolvers = {
	// Same name as selectors key, runs whenevery getTodos selector is ran
	async getTodos() {
		const res = await fetch(
			"https://jsonplaceholder.typicode.com/todos?_limit=10"
		);
		const todos = await res.json();
		dispatch("firsttheme-blocks/todo").populateTodos(todos);
	},
};

registerStore("firsttheme-blocks/todo", {
	selectors,
	reducer,
	actions,
	resolvers,
});
