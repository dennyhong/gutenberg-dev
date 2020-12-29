import { useRef } from "@wordpress/element";
import { useSelect, useDispatch } from "@wordpress/data";
import { Spinner } from "@wordpress/components";

const Edit = () => {
	const dispatch = useDispatch();

	const inputRef = useRef(null);

	const todos = useSelect(
		(select) => select("firsttheme-blocks/todo").listTodos(),
		[]
	);

	const handleAddTodo = (evt) => {
		evt.preventDefault();
		dispatch("firsttheme-blocks/todo").addTodo({
			userId: 1,
			title: inputRef.current.value,
			completed: false,
		});
		inputRef.current.value = "";
	};

	const handleToggleTodo = (todo) => () => {
		dispatch("firsttheme-blocks/todo").toggleTodo(todo);
	};

	return (
		<div>
			{/* Items */}
			{todos.map((todo) => (
				<div
					style={
						todo.completed
							? { textDecoration: "line-through", opacity: 0.5 }
							: undefined
					}
					key={todo.id}>
					<input
						id={`todo-${todo.id}`}
						type="checkbox"
						checked={!!todo.completed}
						onChange={handleToggleTodo(todo)}
						disabled={todo.loading}
					/>
					<label htmlFor={`todo-${todo.id}`}>{todo.title}</label>
					{todo.loading && <Spinner />}
				</div>
			))}

			{/* Input */}
			<form onSubmit={handleAddTodo}>
				<input ref={inputRef} type="text" placeholder="Add an item..." />
				<button type="submit">Add</button>
			</form>
		</div>
	);
};

export default Edit;
