import { registerStore, dispatch } from "@wordpress/data";

const INITIAL_STATE = [];

const reducer = (state = INITIAL_STATE, action) => {
	const { type, payload } = action;
	switch (type) {
		case "POPULATE_TODOS":
			return payload;

		case "TODO_ADDED":
			return [...state, payload];

		case "UPDATE_LOADING":
			return state.map((todo) =>
				todo.id === payload.id ? { ...todo, loading: true } : todo
			);

		case "UPDATE_COMPLETE":
			return state.map((todo) =>
				todo.id === payload.id
					? { ...todo, completed: !todo.completed, loading: undefined }
					: todo
			);

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

	*addTodo(item) {
		const newTodo = yield {
			type: "ADD_TODO",
			payload: item,
		};
		return {
			type: "TODO_ADDED",
			payload: newTodo,
		};
	},

	*toggleTodo(todo) {
		yield {
			type: "UPDATE_LOADING",
			payload: todo,
		};
		// Updates remote data, must use generator fn to trigger controls
		const updatedTodo = yield {
			type: "TOGGLE_TODO",
			payload: todo,
		};
		// Updates redux store
		return {
			type: "UPDATE_COMPLETE",
			payload: updatedTodo,
		};
	},
};

// No side effects in selectors
const selectors = {
	listTodos(state) {
		return state;
	},
	getTodosCount(state) {
		return state.length;
	},
	getIncompleteTodosCount(state) {
		return state.filter((todo) => !todo.completed).length;
	},
	getCompleteTodosCount(state) {
		return state.filter((todo) => !!todo.completed).length;
	},
};

// Side effects in resolvers
const resolvers = {
	// Same name as selectors key, runs whenevery listTodos selector is ran
	async listTodos() {
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
	// For side effects
	controls: {
		async ADD_TODO(action) {
			const todo = action.payload;
			const res = await fetch("https://jsonplaceholder.typicode.com/todos", {
				method: "POST",
				body: JSON.stringify(todo),
				headers: {
					"Content-type": "application/json",
				},
			});
			return await res.json();
		},

		async TOGGLE_TODO(action) {
			const todo = action.payload;
			const res = await fetch(
				`https://jsonplaceholder.typicode.com/todos/${todo.id}`,
				{
					method: "PATCH",
					body: JSON.stringify({
						completed: !todo.completed,
					}),
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			return await res.json(); // updatedTodo
		},
	},
});
