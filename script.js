// updateTime = () => {
//     time_now = new Date();
//     hours = time_now.getHours();
//     minutes = time_now.getMinutes();
//     seconds = time_now.getSeconds();
//     if (hours < 10) {
//         hours = "0" + hours;
//     }
//     if (minutes < 10) {
//         minutes = "0" + minutes;
//     }
//     if (seconds < 10) {
//         seconds = "0" + seconds;
//     }
//     document.querySelector("#time").textContent= hours + ":" + minutes + ":" + seconds;
// }
// setInterval(updateTime, 1000);

// Todos //

// Get Todos Function
function getTodos() {
	let data = JSON.parse(localStorage.getItem("todos")) || [];
	return data;
}

// Show Todos Function
let showTodos = () => {
	let todoList = document.querySelector("#todos");
	todoList.innerHTML = "";

	todos.forEach(todo => {
		todoList.innerHTML += `
		<div class="todo" id="${todo.id}">
			<h3>${todo.title}</h3>
			<p>${todo.description}</p>
			<p>${todo.due_date}</p>
			<p>${todo.due_time}</p>
			<p>Status: ${todo.status}</p>
			<button onclick={deleteTodo(this)}>🗑️</button>
		</div>
		`;
	});
}

// Save Todos Function
function saveTodos(todos) {
	localStorage.removeItem("todos");
	localStorage.setItem("todos", JSON.stringify(todos));
	showTodos();
}

// Show Todos
let todos = getTodos();
showTodos();

// Add Todo Function
let addTodo = () => {
	let Title = document.querySelector("#Title").value.trim();
	let Description = document.querySelector("#Description").value.trim();
	let Status = 'pending';
	let due_time = Date().split(" ")[4];
	let due_date = Date().split(" ")[2] + " " + Date().split(" ")[1] + ", " + Date().split(" ")[3];

	if (Title !== "") {
		let todo = {
			'id': new Date(),
			'title': Title,
			'description': Description,
			'status': Status,
			'due_time': due_time,
			'due_date': due_date
		};

		todos.push(todo);
		saveTodos(todos);
		document.querySelector("#Title").value = "";
		document.querySelector("#Description").value = "";
		showTodos();

	}
}

// Delete Todo Function
let deleteTodo = (button) => {
	let id = button.parentElement.id;
	todos = todos.filter(todo => todo.id != id);
	saveTodos(todos);
};

// Add Todo
document.querySelector("#addTodo").addEventListener("click", addTodo);

// Open/Close Modal
document.getElementById("addModal").addEventListener("click", () => {
	document.getElementById("modal").classList.toggle("modalDispNone");
});
// Close model after adding a todo
document.getElementById("addTodo").addEventListener("click", () => {
	document.getElementById("modal").classList.toggle("modalDispNone");
});

// Disable add button if title is empty
setInterval(() => {
	if (document.getElementById("Title").value.trim() === "") {
		document.getElementById("addTodo").disabled = true;
	} else {
		document.getElementById("addTodo").disabled = false;
	}
}, 10);

// Title placeholder to Red when focused
document.getElementById("Title").addEventListener("focus", () => {
	document.getElementById("Title").classList.add("toggleRedOnFocus");
});
document.getElementById("Title").addEventListener("blur", () => {
	document.getElementById("Title").classList.remove("toggleRedOnFocus");
});

